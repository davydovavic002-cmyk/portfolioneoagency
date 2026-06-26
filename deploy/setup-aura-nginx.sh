#!/usr/bin/env bash
# Run on the server (45.91.169.30) as root or with sudo.
# Adds aura.neostudio.space → localhost:3323 to nginx preview config.

set -euo pipefail

CONF_NAME="preview-sites.conf"
AVAILABLE="/etc/nginx/sites-available/${CONF_NAME}"
ENABLED="/etc/nginx/sites-enabled/${CONF_NAME}"
MARKER="# aura.neostudio.space — managed by portfolio deploy"

if ! command -v nginx >/dev/null 2>&1; then
  echo "nginx not installed. Run: sudo apt install nginx"
  exit 1
fi

echo "=== Current nginx config files ==="
ls -la /etc/nginx/sites-enabled/ 2>/dev/null || true
echo ""
echo "=== Existing server_name entries ==="
sudo nginx -T 2>/dev/null | grep -E "server_name|listen" | head -40 || true
echo ""

if [ -f "${ENABLED}" ] && grep -q "aura.neostudio.space" "${ENABLED}"; then
  echo "aura.neostudio.space block already present in ${ENABLED}"
else
  if [ ! -f "${AVAILABLE}" ]; then
    echo "Creating ${AVAILABLE} from repo template..."
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    if [ -f "${SCRIPT_DIR}/nginx/preview-sites.conf" ]; then
      sudo cp "${SCRIPT_DIR}/nginx/preview-sites.conf" "${AVAILABLE}"
    else
      echo "Template not found. Copy deploy/nginx/preview-sites.conf manually."
      exit 1
    fi
    sudo ln -sf "${AVAILABLE}" "${ENABLED}"
  else
    echo "Appending aura block to ${AVAILABLE}..."
    sudo tee -a "${AVAILABLE}" >/dev/null <<EOF

${MARKER}
server {
    listen 80;
    server_name aura.neostudio.space;

    location / {
        proxy_pass http://127.0.0.1:3323;
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
fi

echo ""
echo "=== Testing nginx config ==="
sudo nginx -t
sudo systemctl reload nginx

echo ""
echo "=== Local health check (port 3323) ==="
curl -sI -m 5 http://127.0.0.1:3323 | head -3 || echo "WARNING: nothing on port 3323 — start AURA first"

echo ""
echo "=== HTTP check via nginx ==="
curl -sI -m 5 -H "Host: aura.neostudio.space" http://127.0.0.1 | head -3 || true

echo ""
echo "Next: sudo certbot --nginx -d aura.neostudio.space"
echo "Then: curl -I https://aura.neostudio.space"
