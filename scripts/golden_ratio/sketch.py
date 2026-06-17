"""Generate atelier-style improvement sketches for non-conforming pieces."""

from __future__ import annotations

import base64
import io
from typing import Any

import cv2
import numpy as np
from PIL import Image, ImageDraw

from .analyzer import PHI, PHI_INV, SegmentationResult

GOLD = (220, 203, 123)
FOREST = (29, 60, 52)
CREAM = (250, 248, 245)
IMPROVE = (118, 109, 66)


def _ideal_bbox(
    bbox: tuple[int, int, int, int],
    primary_axis: str,
    image_shape: tuple[int, int],
) -> tuple[int, int, int, int]:
    x, y, bw, bh = bbox
    cx, cy = x + bw / 2.0, y + bh / 2.0
    ih, iw = image_shape

    if primary_axis == "vertical":
        if bh >= bw:
            new_h = bh
            new_w = int(round(bh / PHI))
        else:
            new_w = bw
            new_h = int(round(bw * PHI))
    else:
        if bw >= bh:
            new_w = bw
            new_h = int(round(bw / PHI))
        else:
            new_h = bh
            new_w = int(round(bh * PHI))

    new_w = max(24, min(new_w, iw - 4))
    new_h = max(24, min(new_h, ih - 4))
    nx = int(round(cx - new_w / 2.0))
    ny = int(round(cy - new_h / 2.0))
    nx = max(0, min(nx, iw - new_w))
    ny = max(0, min(ny, ih - new_h))
    return nx, ny, new_w, new_h


def _draw_dashed_rect(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    color: tuple[int, int, int],
    width: int = 2,
    dash: int = 10,
) -> None:
    x0, y0, x1, y1 = box
    for start, end, horizontal in [
        ((x0, y0), (x1, y0), True),
        ((x1, y0), (x1, y1), False),
        ((x1, y1), (x0, y1), True),
        ((x0, y1), (x0, y0), False),
    ]:
        length = abs(end[0] - start[0]) + abs(end[1] - start[1])
        steps = max(1, length // dash)
        for i in range(0, steps, 2):
            t0 = i / steps
            t1 = min((i + 1) / steps, 1.0)
            if horizontal:
                sx = int(start[0] + (end[0] - start[0]) * t0)
                ex = int(start[0] + (end[0] - start[0]) * t1)
                draw.line([(sx, start[1]), (ex, start[1])], fill=color, width=width)
            else:
                sy = int(start[1] + (end[1] - start[1]) * t0)
                ey = int(start[1] + (end[1] - start[1]) * t1)
                draw.line([(start[0], sy), (start[0], ey)], fill=color, width=width)


def _draw_golden_grid(
    draw: ImageDraw.ImageDraw,
    bbox: tuple[int, int, int, int],
) -> None:
    x, y, bw, bh = bbox
    x1, y1 = x + bw, y + bh
    vx = int(x + bw * PHI_INV)
    hx = int(y + bh * PHI_INV)
    for line_x in (vx, x1 - (vx - x)):
        draw.line([(line_x, y), (line_x, y1)], fill=GOLD + (180,), width=1)
    for line_y in (hx, y1 - (hx - y)):
        draw.line([(x, line_y), (x1, line_y)], fill=GOLD + (180,), width=1)


def generate_improvement_sketch(
    seg: SegmentationResult,
    analysis: dict[str, Any],
) -> str:
    """Return base64 PNG of annotated improvement sketch."""
    rgb = seg.image_rgb.copy()
    h, w = rgb.shape[:2]
    profile = analysis["profile"]
    bbox = (
        analysis["segmentation"]["bbox"]["x"],
        analysis["segmentation"]["bbox"]["y"],
        analysis["segmentation"]["bbox"]["width"],
        analysis["segmentation"]["bbox"]["height"],
    )
    ideal = _ideal_bbox(bbox, profile["primary_axis"], (h, w))

    overlay = rgb.copy()
    mask_rgb = np.zeros_like(rgb)
    mask_rgb[seg.mask > 0] = (29, 60, 52)
    overlay = cv2.addWeighted(overlay, 0.82, mask_rgb, 0.18, 0)

    pil = Image.fromarray(overlay)
    draw = ImageDraw.Draw(pil, "RGBA")

    x, y, bw, bh = bbox
    ix, iy, iw, ih = ideal
    cx = analysis["segmentation"]["centroid"]["x"]
    cy = analysis["segmentation"]["centroid"]["y"]
    ideal_cx = ix + iw * profile["ideal_centroid"]["x"]
    ideal_cy = iy + ih * profile["ideal_centroid"]["y"]

    _draw_golden_grid(draw, ideal)

    draw.rectangle([x, y, x + bw, y + bh], outline=FOREST + (200,), width=2)
    _draw_dashed_rect(draw, (ix, iy, ix + iw, iy + ih), IMPROVE + (230,), width=3)

    draw.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], fill=(200, 60, 60, 220), outline=(255, 255, 255, 200))
    draw.ellipse(
        [ideal_cx - 7, ideal_cy - 7, ideal_cx + 7, ideal_cy + 7],
        fill=GOLD + (220,),
        outline=FOREST + (200,),
    )
    draw.line([(cx, cy), (ideal_cx, ideal_cy)], fill=GOLD + (200,), width=2)

    # Resize arrows on ideal bbox edges
    if profile["primary_axis"] == "vertical":
        if bw < iw:
            mid_y = iy + ih // 2
            draw.line([(x + bw, mid_y), (ix + iw, mid_y)], fill=IMPROVE + (220,), width=2)
            draw.polygon(
                [(ix + iw, mid_y), (ix + iw - 10, mid_y - 6), (ix + iw - 10, mid_y + 6)],
                fill=IMPROVE + (220,),
            )
        if bh < ih:
            mid_x = ix + iw // 2
            draw.line([(mid_x, y + bh), (mid_x, iy + ih)], fill=IMPROVE + (220,), width=2)
            draw.polygon(
                [(mid_x, iy + ih), (mid_x - 6, iy + ih - 10), (mid_x + 6, iy + ih - 10)],
                fill=IMPROVE + (220,),
            )
    else:
        if bh < ih:
            mid_x = ix + iw // 2
            draw.line([(mid_x, y + bh), (mid_x, iy + ih)], fill=IMPROVE + (220,), width=2)
        if bw < iw:
            mid_y = iy + ih // 2
            draw.line([(x + bw, mid_y), (ix + iw, mid_y)], fill=IMPROVE + (220,), width=2)

    label_bg = CREAM + (230,)
    draw.rectangle([12, h - 52, w - 12, h - 12], fill=label_bg, outline=GOLD + (180,))
    draw.text(
        (22, h - 44),
        "Proposed golden-ratio silhouette — dashed frame & arrow show ideal mass centre",
        fill=FOREST,
    )

    buf = io.BytesIO()
    pil.save(buf, format="PNG", optimize=True)
    return base64.b64encode(buf.getvalue()).decode("ascii")
