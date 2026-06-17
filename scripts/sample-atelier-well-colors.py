#!/usr/bin/env python3
"""Sample product-shot backdrops and sync imageWellColor in fineJewelleryCollections.ts."""
from __future__ import annotations

import re
import sys
from pathlib import Path
from typing import Optional

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "src/app/data/fineJewelleryCollections.ts"
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


def sample_background(image_path: Path) -> Optional[str]:
    if image_path.suffix.lower() not in IMAGE_EXT or not image_path.exists():
        return None
    try:
        rgb = np.array(Image.open(image_path).convert("RGB"))
    except OSError:
        return None

    h, w = rgb.shape[:2]
    pad = max(2, min(h, w) // 40)
    corners = np.vstack(
        [
            rgb[:pad, :pad].reshape(-1, 3),
            rgb[:pad, -pad:].reshape(-1, 3),
            rgb[-pad:, :pad].reshape(-1, 3),
            rgb[-pad:, -pad:].reshape(-1, 3),
        ]
    )
    med = np.median(corners, axis=0).astype(int)
    return f"#{med[0]:02x}{med[1]:02x}{med[2]:02x}"


def update_piece_block(block: str) -> tuple[str, bool]:
    id_match = re.search(r'id:\s*"([^"]+)"', block)
    image_match = re.search(r'image:\s*"([^"]+)"', block)
    if not id_match or not image_match:
        return block, False

    image_path = ROOT / "public" / image_match.group(1).lstrip("/")
    sampled = sample_background(image_path)
    if not sampled:
        return block, False

    well_pattern = re.compile(r'(\s*)imageWellColor:\s*"#[0-9a-fA-F]{3,8}",?\n')
    well_match = well_pattern.search(block)
    if well_match:
        new_block = well_pattern.sub(f'{well_match.group(1)}imageWellColor: "{sampled}",\n', block, count=1)
        changed = well_match.group(0) != f'{well_match.group(1)}imageWellColor: "{sampled}",\n'
        return new_block, changed

    insert_after = re.search(r'(image:\s*"[^"]+",\n)', block)
    if not insert_after:
        return block, False

    insertion = f'{insert_after.group(1)}    imageWellColor: "{sampled}",\n'
    new_block = block[: insert_after.start()] + insertion + block[insert_after.end() :]
    return new_block, True


def main() -> int:
    source = DATA_FILE.read_text()
    marker = "export const ATELIER_PIECES"
    start = source.index(marker)
    array_start = source.index("= [", start) + 2
    depth = 0
    array_end = None
    for index, char in enumerate(source[array_start:], start=array_start):
        if char == "[":
            depth += 1
        elif char == "]":
            depth -= 1
            if depth == 0:
                array_end = index
                break
    if array_end is None:
        print("Could not locate ATELIER_PIECES array", file=sys.stderr)
        return 1

    prefix = source[: array_start + 1]
    array_body = source[array_start + 1 : array_end]
    suffix = source[array_end:]

    pieces = re.split(r"\n  \},\n  \{", array_body)
    updated = 0
    for index, piece in enumerate(pieces):
        new_piece, changed = update_piece_block(piece)
        if changed:
            updated += 1
        pieces[index] = new_piece

    DATA_FILE.write_text(prefix + "".join(pieces) + suffix)
    print(f"Updated imageWellColor for {updated} atelier piece(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
