#!/usr/bin/env python3
"""Standalone runner for Node API subprocess invocation."""

import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "scripts"))

from golden_ratio.agent import assess_piece  # noqa: E402
from golden_ratio.analyzer import analyze_image  # noqa: E402
from golden_ratio.gemini_sketch import generate_gemini_redesign_sketch  # noqa: E402
from golden_ratio.sketch import generate_improvement_sketch  # noqa: E402


def main() -> int:
    if len(sys.argv) < 2:
        print(json.dumps({"ok": False, "error": "missing_args"}))
        return 1

    payload_path = sys.argv[1]
    with open(payload_path, encoding="utf-8") as f:
        payload = json.load(f)

    image_path = payload["imagePath"]
    category = payload.get("category", "rings")
    title = payload.get("title", "Atelier piece")
    product_code = payload.get("productCode", "")

    try:
        analysis = analyze_image(image_path, category)
        seg = analysis.pop("_segmentation")
        report = assess_piece(analysis, title, product_code or "—")

        sketch_b64 = None
        sketch_annotation_b64 = None
        sketch_source = None
        sketch_model = None
        sketch_error = None

        if not analysis["meets_golden_ratio"]:
            sketch_annotation_b64 = generate_improvement_sketch(seg, analysis)

            gemini = generate_gemini_redesign_sketch(
                image_path,
                title,
                product_code or "—",
                category,
                analysis,
                report["recommendations"],
            )
            if gemini.get("ok"):
                sketch_b64 = gemini["sketch_png_base64"]
                sketch_source = "gemini"
                sketch_model = gemini.get("model")
                report["agent_steps"].append(
                    {
                        "step": 5,
                        "action": "Gemini redesign sketch",
                        "result": f"Atelier drawing generated ({sketch_model})",
                    }
                )
            else:
                sketch_b64 = sketch_annotation_b64
                sketch_annotation_b64 = None
                sketch_source = "cv-overlay"
                sketch_error = gemini.get("error", "Gemini unavailable — CV overlay used")
                report["agent_steps"].append(
                    {
                        "step": 5,
                        "action": "Sketch fallback",
                        "result": sketch_error,
                    }
                )

        output = {
            "ok": True,
            "analysis": analysis,
            "report": report,
            "sketch_png_base64": sketch_b64,
            "sketch_annotation_base64": sketch_annotation_b64,
            "sketch_source": sketch_source,
            "sketch_model": sketch_model,
            "engine": "python-cv",
        }
        if sketch_error:
            output["sketch_error"] = sketch_error

        print(json.dumps(output))
        return 0
    except Exception as exc:
        print(json.dumps({"ok": False, "error": str(exc)}))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
