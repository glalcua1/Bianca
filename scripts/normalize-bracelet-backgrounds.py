#!/usr/bin/env python3
"""Replace near-white studio backgrounds with Bianca cream mat (#faf8f5).

WARNING: Destructive to product photography. Do not run unless explicitly requested.
Set ALLOW_CREAM_BG_REWRITE=1 to execute.
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BRACELET_DIR = ROOT / "public" / "Bracelet"
TARGET = (250, 248, 245)  # #faf8f5
EXTENSIONS = {".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"}


def corner_is_light(img: Image.Image, sample: int = 12) -> bool:
    """True for white, cream, or light studio backdrops — not black product wells."""
    w, h = img.size
    pixels = img.convert("RGB").load()
    points = []
    for x in range(sample):
        for y in range(sample):
            points.append(pixels[x, y])
            points.append(pixels[w - 1 - x, y])
            points.append(pixels[x, h - 1 - y])
            points.append(pixels[w - 1 - x, h - 1 - y])
    avg = tuple(sum(c[i] for c in points) // len(points) for i in range(3))
    if max(avg) < 165:
        return False
    if min(avg) < 40:
        return False
    return True


def replace_background(img: Image.Image) -> Image.Image:
    rgb = img.convert("RGB")
    w, h = rgb.size
    px = rgb.load()
    ref = px[0, 0]
    tolerance = 42

    def is_bg(x: int, y: int) -> bool:
        r, g, b = px[x, y]
        if min(r, g, b) < 155:
            return False
        dr = abs(r - ref[0])
        dg = abs(g - ref[1])
        db = abs(b - ref[2])
        if dr + dg + db < tolerance * 2:
            return True
        # Near-white studio sweep
        if r > 228 and g > 228 and b > 228 and max(r, g, b) - min(r, g, b) < 24:
            return True
        # Light neutral fabric / pale beige already in frame
        if min(r, g, b) > 175 and max(r, g, b) - min(r, g, b) < 45:
            return True
        return False

    stack: list[tuple[int, int]] = []
    seen: set[tuple[int, int]] = set()
    for x, y in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
        if is_bg(x, y):
            stack.append((x, y))
            seen.add((x, y))

    while stack:
        x, y = stack.pop()
        px[x, y] = TARGET
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen and is_bg(nx, ny):
                seen.add((nx, ny))
                stack.append((nx, ny))

  # Soft fringe on edge pixels adjacent to replaced backdrop
    for y in range(h):
        for x in range(w):
            if (x, y) in seen:
                continue
            r, g, b = px[x, y]
            if r > 215 and g > 215 and b > 215 and max(r, g, b) - min(r, g, b) < 20:
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if (nx, ny) in seen:
                        blend = 0.55
                        px[x, y] = tuple(
                            int(c * (1 - blend) + t * blend)
                            for c, t in zip((r, g, b), TARGET)
                        )
                        break

    return rgb


def process_file(path: Path) -> bool:
    with Image.open(path) as img:
        if not corner_is_light(img):
            print(f"skip (dark bg): {path.name}")
            return False
        out = replace_background(img)
        if path.suffix.lower() == ".png":
            out.save(path, "PNG", optimize=True)
        else:
            out.save(path, "JPEG", quality=92, optimize=True)
        print(f"updated: {path.name}")
        return True


def main() -> int:
    if os.environ.get("ALLOW_CREAM_BG_REWRITE") != "1":
        print(
            "Refusing to run: this script overwrites image files. "
            "Set ALLOW_CREAM_BG_REWRITE=1 to execute.",
            file=sys.stderr,
        )
        return 1

    if not BRACELET_DIR.is_dir():
        print("Bracelet folder not found", file=sys.stderr)
        return 1
    count = 0
    for path in sorted(BRACELET_DIR.iterdir()):
        if path.suffix not in EXTENSIONS or path.name.startswith("."):
            continue
        if process_file(path):
            count += 1
    print(f"Done — {count} file(s) with cream background.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
