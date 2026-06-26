#!/usr/bin/env bash
# Run on the server (45.91.169.30) as root or with sudo.
# Fixes aura.neostudio.space preview: DNS check → nginx proxy → SSL.

set -euo pipefail

SERVER_IP="45.91.169.30"
AURA_PORT="3323"
DOMAIN="aura.neostudio.space"
CONF_NAME="preview-sites.conf"
AVAILABLE="/etc/nginx/sites-available/${CONF_NAME}"
ENABLED="/etc/nginx/sites-enabled/${CONF_NAME}"
MARKER="# aura.neostudio.space — managed by portfolio deploy"
DEFAULT_SITE="/etc/nginx/sites-enabled/default"

if ! command -v nginx >/dev/null 2>&1; then
  echo "nginx not installed. Run: sudo apt install nginx"
  exit 1
fi

echo "=== 1. DNS (required before HTTPS works in browsers) ==="
DNS_IP=""
if command -v dig >/dev/null 2>&1; then
  DNS_IP="$(dig +short "${DOMAIN}" A @8.8.8.8 2>/dev/null | tail -1 || true)"
elif command -v nslookup >/dev/null 2>&1; then
  DNS_IP="$(nslookup "${DOMAIN}" 8.8.8.8 2>/dev/null | awk '/^Address: / { print $2 }' | tail -1 || true)"
fi

if [ -z "${DNS_IP}" ]; then
  echo "MISSING: no A record for ${DOMAIN}"
  echo ""
  echo "Add at your DNS provider (same place as academy.neostudio.space):"
  echo "  Type:  A"
  echo "  Name:  aura"
  echo "  Value: ${SERVER_IP}"
  echo ""
  echo "Without this, the iframe cannot load — the hostname does not resolve."
else
  echo "OK: ${DOMAIN} → ${DNS_IP}"
  if [ "${DNS_IP}" != "${SERVER_IP}" ]; then
    echo "WARNING: expected ${SERVER_IP}, got ${DNS_IP}"
  fi
fi

echo ""
echo "=== 2. Remove broken aura block from default site (try_files / welcome page) ==="
if [ -f "${DEFAULT_SITE}" ] && grep -q "${DOMAIN}" "${DEFAULT_SITE}"; then
  echo "Found ${DOMAIN} in ${DEFAULT_SITE} — this often serves nginx welcome instead of the app."
  echo "Edit manually and delete the aura server { } block, then re-run this script."
  echo "  sudo nano ${DEFAULT_SITE}"
  grep -n "${DOMAIN}" "${DEFAULT_SITE}" || true
else
  echo "No ${DOMAIN} in default site (good)."
fi

echo ""
echo "=== 3. Ensure proxy block in ${AVAILABLE} ==="
if [ ! -f "${AVAILABLE}" ]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  if [ -f "${SCRIPT_DIR}/nginx/preview-sites.conf" ]; then
    echo "Creating ${AVAILABLE} from repo template..."
    sudo cp "${SCRIPT_DIR}/nginx/preview-sites.conf" "${AVAILABLE}"
    sudo ln -sf "${AVAILABLE}" "${ENABLED}"
  else
    echo "Template not found. Copy deploy/nginx/preview-sites.conf manually."
    exit 1
  fi
fi

if grep -q "${DOMAIN}" "${AVAILABLE}"; then
  echo "Proxy block already in ${AVAILABLE}"
else
  echo "Appending aura block..."
  sudo tee -a "${AVAILABLE}" >/dev/null <<EOF

${MARKER}
server {
    listen 80;
    server_name ${DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:${AURA_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
fi

echo ""
echo "=== 4. Reload nginx ==="
sudo nginx -t
sudo systemctl reload nginx

echo ""
echo "=== 5. Health checks ==="
echo "--- App on port ${AURA_PORT} ---"
curl -sI -m 5 "http://127.0.0.1:${AURA_PORT}/" | head -5 \
  || echo "WARNING: nothing on port ${AURA_PORT} — start AURA first"

echo "--- HTTP via nginx (Host header) ---"
HTTP_HEADERS="$(curl -sI -m 5 -H "Host: ${DOMAIN}" "http://127.0.0.1/")"
echo "${HTTP_HEADERS}" | head -8
if echo "${HTTP_HEADERS}" | grep -qi "x-powered-by: Next.js"; then
  echo "OK: nginx proxies to Next.js on HTTP"
elif echo "${HTTP_HEADERS}" | grep -qi "welcome to nginx"; then
  echo "FAIL: still serving nginx welcome page — remove aura from ${DEFAULT_SITE}"
elif echo "${HTTP_HEADERS}" | grep -qi "301"; then
  echo "HTTP redirects to HTTPS (certbot). Check HTTPS below."
fi

echo ""
echo "=== 6. SSL (run after DNS propagates) ==="
if [ -n "${DNS_IP}" ]; then
  if curl -sI -m 8 "https://${DOMAIN}/" 2>/dev/null | grep -qi "x-powered-by: Next.js"; then
    echo "OK: https://${DOMAIN}/ already serves AURA"
  else
    echo "Run:"
    echo "  sudo certbot --nginx -d ${DOMAIN}"
    echo "Then verify:"
    echo "  curl -I https://${DOMAIN}/ | grep -i next.js"
  fi
else
  echo "Skip certbot until DNS A record exists, then run:"
  echo "  sudo certbot --nginx -d ${DOMAIN}"
fi

echo ""
echo "Done. Portfolio iframe uses: https://${DOMAIN}/"
