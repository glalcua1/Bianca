"""Computer-vision golden ratio analysis for jewellery silhouettes."""

from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Any

import cv2
import numpy as np
from PIL import Image

PHI = (1.0 + math.sqrt(5.0)) / 2.0
PHI_INV = 1.0 / PHI
PASS_SCORE = 72.0
CRITICAL_FLOOR = 55.0

CATEGORY_PROFILES: dict[str, dict[str, Any]] = {
    "rings": {
        "primary_axis": "vertical",
        "ideal_centroid_y": PHI_INV,
        "ideal_centroid_x": 0.5,
        "weights": {
            "aspect_harmony": 0.2,
            "vertical_section": 0.3,
            "horizontal_section": 0.15,
            "mass_balance": 0.2,
            "focal_compactness": 0.15,
        },
    },
    "earrings": {
        "primary_axis": "vertical",
        "ideal_centroid_y": 0.45,
        "ideal_centroid_x": 0.5,
        "weights": {
            "aspect_harmony": 0.25,
            "vertical_section": 0.25,
            "horizontal_section": 0.2,
            "mass_balance": 0.15,
            "focal_compactness": 0.15,
        },
    },
    "necklaces": {
        "primary_axis": "vertical",
        "ideal_centroid_y": 0.58,
        "ideal_centroid_x": 0.5,
        "weights": {
            "aspect_harmony": 0.3,
            "vertical_section": 0.25,
            "horizontal_section": 0.15,
            "mass_balance": 0.15,
            "focal_compactness": 0.15,
        },
    },
    "pendants": {
        "primary_axis": "vertical",
        "ideal_centroid_y": 0.62,
        "ideal_centroid_x": 0.5,
        "weights": {
            "aspect_harmony": 0.28,
            "vertical_section": 0.27,
            "horizontal_section": 0.15,
            "mass_balance": 0.15,
            "focal_compactness": 0.15,
        },
    },
    "bracelets": {
        "primary_axis": "horizontal",
        "ideal_centroid_y": 0.5,
        "ideal_centroid_x": PHI_INV,
        "weights": {
            "aspect_harmony": 0.3,
            "vertical_section": 0.1,
            "horizontal_section": 0.3,
            "mass_balance": 0.15,
            "focal_compactness": 0.15,
        },
    },
    "for-him": {
        "primary_axis": "horizontal",
        "ideal_centroid_y": 0.5,
        "ideal_centroid_x": 0.5,
        "weights": {
            "aspect_harmony": 0.25,
            "vertical_section": 0.15,
            "horizontal_section": 0.25,
            "mass_balance": 0.2,
            "focal_compactness": 0.15,
        },
    },
}

DEFAULT_PROFILE = CATEGORY_PROFILES["rings"]


@dataclass
class SegmentationResult:
    mask: np.ndarray
    bbox: tuple[int, int, int, int]  # x, y, w, h
    centroid: tuple[float, float]
    image_rgb: np.ndarray


def _score_from_deviation(deviation: float, tolerance: float = 0.12) -> float:
    """Map relative deviation from ideal (0 = perfect) to 0–100 score."""
    if deviation <= tolerance:
        return 100.0 - (deviation / tolerance) * 8.0
    excess = deviation - tolerance
    return max(0.0, 92.0 - excess * 220.0)


def _aspect_deviation(width: int, height: int) -> float:
    if width <= 0 or height <= 0:
        return 1.0
    ratio = max(width, height) / min(width, height)
    candidates = [PHI, PHI**0.5, PHI**2]
    return min(abs(ratio - c) / c for c in candidates)


def _centroid_deviation(value: float, ideal: float) -> float:
    return abs(value - ideal)


def _sample_background_color(image: np.ndarray) -> np.ndarray:
    h, w = image.shape[:2]
    pad = max(2, min(h, w) // 40)
    corners = np.vstack(
        [
            image[:pad, :pad].reshape(-1, 3),
            image[:pad, -pad:].reshape(-1, 3),
            image[-pad:, :pad].reshape(-1, 3),
            image[-pad:, -pad:].reshape(-1, 3),
        ]
    )
    return np.median(corners, axis=0)


def segment_jewellery(image_path: str) -> SegmentationResult:
    pil = Image.open(image_path).convert("RGB")
    rgb = np.array(pil)
    h, w = rgb.shape[:2]

    bg = _sample_background_color(rgb)
    diff = np.linalg.norm(rgb.astype(np.float32) - bg.astype(np.float32), axis=2)
    bg_lum = 0.299 * bg[0] + 0.587 * bg[1] + 0.114 * bg[2]
    threshold = 18.0 if bg_lum > 128 else 28.0

    mask = (diff > threshold).astype(np.uint8) * 255
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel, iterations=1)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel, iterations=2)

    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        mask = (diff > threshold * 0.65).astype(np.uint8) * 255
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel, iterations=2)
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if not contours:
        cx, cy = w / 2.0, h / 2.0
        inset = int(min(w, h) * 0.15)
        return SegmentationResult(
            mask=np.ones((h, w), dtype=np.uint8) * 255,
            bbox=(inset, inset, w - 2 * inset, h - 2 * inset),
            centroid=(cx, cy),
            image_rgb=rgb,
        )

    largest = max(contours, key=cv2.contourArea)
    clean = np.zeros_like(mask)
    cv2.drawContours(clean, [largest], -1, 255, thickness=cv2.FILLED)
    mask = clean

    x, y, bw, bh = cv2.boundingRect(largest)
    moments = cv2.moments(largest)
    if moments["m00"] > 0:
        cx = moments["m10"] / moments["m00"]
        cy = moments["m01"] / moments["m00"]
    else:
        cx, cy = x + bw / 2.0, y + bh / 2.0

    return SegmentationResult(mask=mask, bbox=(x, y, bw, bh), centroid=(cx, cy), image_rgb=rgb)


def _mass_ratio(mask: np.ndarray, bbox: tuple[int, int, int, int], axis: str) -> float:
    x, y, bw, bh = bbox
    region = mask[y : y + bh, x : x + bw]
    if region.size == 0:
        return 1.0

    if axis == "vertical":
        split = int(bh * PHI_INV)
        upper = float(np.count_nonzero(region[:split, :]))
        lower = float(np.count_nonzero(region[split:, :]))
    else:
        split = int(bw * PHI_INV)
        left = float(np.count_nonzero(region[:, :split]))
        right = float(np.count_nonzero(region[:, split:]))

    if axis == "vertical":
        if lower < 1:
            return PHI
        return upper / lower
    if right < 1:
        return PHI
    return left / right


def _focal_compactness(mask: np.ndarray, bbox: tuple[int, int, int, int]) -> float:
    x, y, bw, bh = bbox
    region = mask[y : y + bh, x : x + bw]
    if region.size == 0:
        return 0.5
    fill = np.count_nonzero(region) / region.size
    return float(fill)


def analyze_image(image_path: str, category: str = "rings") -> dict[str, Any]:
    profile = CATEGORY_PROFILES.get(category, DEFAULT_PROFILE)
    seg = segment_jewellery(image_path)
    x, y, bw, bh = seg.bbox
    cx, cy = seg.centroid

    cx_norm = (cx - x) / bw if bw else 0.5
    cy_norm = (cy - y) / bh if bh else 0.5

    aspect_dev = _aspect_deviation(bw, bh)
    vert_dev = _centroid_deviation(cy_norm, profile["ideal_centroid_y"])
    horiz_dev = _centroid_deviation(cx_norm, profile["ideal_centroid_x"])

    primary_axis = profile["primary_axis"]
    mass_ratio = _mass_ratio(seg.mask, seg.bbox, primary_axis)
    mass_dev = abs(mass_ratio - PHI) / PHI

    compactness = _focal_compactness(seg.mask, seg.bbox)
    ideal_compactness = PHI_INV
    compact_dev = abs(compactness - ideal_compactness) / ideal_compactness

    metrics_raw = {
        "aspect_harmony": {
            "id": "aspect_harmony",
            "label": "Silhouette aspect ratio",
            "description": "Overall width-to-height proportion compared to φ (1.618) and related harmonics.",
            "value": round(max(bw, bh) / min(bw, bh) if min(bw, bh) else 0, 3),
            "ideal": round(PHI, 3),
            "deviation": round(aspect_dev, 4),
            "score": round(_score_from_deviation(aspect_dev), 1),
            "unit": "ratio",
        },
        "vertical_section": {
            "id": "vertical_section",
            "label": "Vertical golden section",
            "description": "Whether the visual mass centroid aligns with the ideal vertical golden section for this category.",
            "value": round(cy_norm, 3),
            "ideal": round(profile["ideal_centroid_y"], 3),
            "deviation": round(vert_dev, 4),
            "score": round(_score_from_deviation(vert_dev, 0.1), 1),
            "unit": "normalized",
        },
        "horizontal_section": {
            "id": "horizontal_section",
            "label": "Horizontal golden section",
            "description": "Lateral balance of visual mass relative to the golden mean.",
            "value": round(cx_norm, 3),
            "ideal": round(profile["ideal_centroid_x"], 3),
            "deviation": round(horiz_dev, 4),
            "score": round(_score_from_deviation(horiz_dev, 0.1), 1),
            "unit": "normalized",
        },
        "mass_balance": {
            "id": "mass_balance",
            "label": "Mass distribution",
            "description": f"Ratio of mass across the primary {primary_axis} golden divide.",
            "value": round(mass_ratio, 3),
            "ideal": round(PHI, 3),
            "deviation": round(mass_dev, 4),
            "score": round(_score_from_deviation(mass_dev), 1),
            "unit": "ratio",
        },
        "focal_compactness": {
            "id": "focal_compactness",
            "label": "Focal compactness",
            "description": "How tightly the piece occupies its bounding frame — balanced density reads as intentional proportion.",
            "value": round(compactness, 3),
            "ideal": round(ideal_compactness, 3),
            "deviation": round(compact_dev, 4),
            "score": round(_score_from_deviation(compact_dev, 0.18), 1),
            "unit": "density",
        },
    }

    weights = profile["weights"]
    overall = sum(metrics_raw[k]["score"] * weights[k] for k in weights)
    critical_fail = any(metrics_raw[k]["score"] < CRITICAL_FLOOR for k in weights)
    meets = overall >= PASS_SCORE and not critical_fail

    return {
        "phi": PHI,
        "category": category,
        "overall_score": round(overall, 1),
        "meets_golden_ratio": meets,
        "metrics": [metrics_raw[k] for k in weights],
        "segmentation": {
            "bbox": {"x": x, "y": y, "width": bw, "height": bh},
            "centroid": {"x": round(cx, 1), "y": round(cy, 1)},
            "centroid_normalized": {"x": round(cx_norm, 3), "y": round(cy_norm, 3)},
            "image_width": seg.image_rgb.shape[1],
            "image_height": seg.image_rgb.shape[0],
        },
        "profile": {
            "primary_axis": primary_axis,
            "ideal_centroid": {
                "x": profile["ideal_centroid_x"],
                "y": profile["ideal_centroid_y"],
            },
        },
        "_segmentation": seg,
    }
