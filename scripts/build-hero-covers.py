"""Generate 4:3 hero cover webps for portfolio case cards."""
from __future__ import annotations

import io
import subprocess
import textwrap
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "cases"
TMP = ROOT / ".tmp" / "covers"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
SIZE = (1280, 960)


def ensure_dirs() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)


def save_webp(img: Image.Image, name: str) -> None:
    img = img.convert("RGB").resize(SIZE, Image.Resampling.LANCZOS)
    img.save(OUT / name, "WEBP", quality=86, method=6)
    print(f"saved {name}")


def chrome_shot(url: str, png_path: Path, wait_ms: int = 12000) -> None:
    profile = TMP / f"profile-{png_path.stem}"
    profile.mkdir(parents=True, exist_ok=True)
    env = {
        **dict(__import__("os").environ),
        "TEMP": str(TMP),
        "TMP": str(TMP),
    }
    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--no-first-run",
        "--no-default-browser-check",
        f"--user-data-dir={profile}",
        f"--window-size={SIZE[0]},{SIZE[1]}",
        f"--screenshot={png_path}",
        f"--virtual-time-budget={wait_ms}",
        url,
    ]
    subprocess.run(cmd, check=True, env=env, capture_output=True)


def png_to_webp(png_path: Path, webp_name: str) -> None:
    with Image.open(png_path) as img:
        save_webp(img, webp_name)


def crop_cover(img: Image.Image, top_bias: float = 0.0) -> Image.Image:
    """Center-crop to 4:3; top_bias shifts crop upward (0..1)."""
    target_ratio = 4 / 3
    w, h = img.size
    current = w / h
    if current > target_ratio:
        new_w = int(h * target_ratio)
        x0 = (w - new_w) // 2
        box = (x0, 0, x0 + new_w, h)
    else:
        new_h = int(w / target_ratio)
        y0 = int((h - new_h) * top_bias)
        y0 = max(0, min(y0, h - new_h))
        box = (0, y0, w, y0 + new_h)
    return img.crop(box)


def download(url: str) -> Image.Image:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as res:
        data = res.read()
    return Image.open(io.BytesIO(data))


def stretch_cover() -> None:
    png = TMP / "stretch.png"
    chrome_shot("https://pilates.neostudio.space/", png, wait_ms=14000)
    with Image.open(png) as shot:
        # Keep top hero block — slight upward bias
        save_webp(crop_cover(shot, top_bias=0.05), "stretch-and-chill.webp")


def petcare_cover() -> None:
    png = TMP / "petcare.png"
    chrome_shot("https://petcare.neostudio.space/", png, wait_ms=16000)
    with Image.open(png) as shot:
        w, h = shot.size
        trimmed = shot.crop((0, 0, w, int(h * 0.86)))
        save_webp(crop_cover(trimmed, top_bias=0.0), "petcare-ai-cover.webp")


def blessed_cover() -> None:
    png = OUT / "blessed-angel.png"
    if not png.exists():
        chrome_shot("https://blessedangel.store/", png, wait_ms=14000)
    with Image.open(png) as shot:
        save_webp(crop_cover(shot, top_bias=0.02), "blessed-angel.webp")
    png.unlink(missing_ok=True)


def polka_dot_cover() -> None:
    png = TMP / "polkadot.png"
    chrome_shot("https://polkadot.neostudio.space/", png, wait_ms=14000)
    with Image.open(png) as shot:
        save_webp(crop_cover(shot, top_bias=0.06), "polka-dot-bakery.webp")


def main() -> None:
    ensure_dirs()
    stretch_cover()
    petcare_cover()
    blessed_cover()
    polka_dot_cover()


if __name__ == "__main__":
    main()
