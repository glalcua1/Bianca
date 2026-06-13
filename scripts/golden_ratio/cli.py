#!/usr/bin/env python3
"""CLI entry for golden-ratio jewellery analysis (called from Node API)."""

from __future__ import annotations

import argparse
import json
import sys

from .agent import assess_piece
from .analyzer import analyze_image
from .sketch import generate_improvement_sketch


def main() -> int:
    parser = argparse.ArgumentParser(description="Bianca golden ratio analyser")
    parser.add_argument("--image", required=True, help="Absolute path to jewellery image")
    parser.add_argument("--category", default="rings")
    parser.add_argument("--title", default="Atelier piece")
    parser.add_argument("--product-code", default="")
    args = parser.parse_args()

    try:
        analysis = analyze_image(args.image, args.category)
        seg = analysis.pop("_segmentation")

        report = assess_piece(analysis, args.title, args.product_code or "—")

        sketch_b64 = None
        if not analysis["meets_golden_ratio"]:
            sketch_b64 = generate_improvement_sketch(seg, analysis)

        output = {
            "ok": True,
            "analysis": analysis,
            "report": report,
            "sketch_png_base64": sketch_b64,
            "engine": "python-cv",
        }
        json.dump(output, sys.stdout)
        return 0
    except Exception as exc:
        json.dump({"ok": False, "error": str(exc)}, sys.stdout)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
