"""Agentic assessment layer — plans narrative and recommendations from CV metrics."""

from __future__ import annotations

import os
from typing import Any

PASS_SCORE = 72.0


def _metric_verdict(metric: dict[str, Any]) -> str:
    score = metric["score"]
    if score >= 85:
        return "excellent"
    if score >= 72:
        return "acceptable"
    if score >= 55:
        return "needs_attention"
    return "critical"


def _recommendation_for(metric: dict[str, Any], category: str) -> str | None:
    verdict = _metric_verdict(metric)
    if verdict in ("excellent", "acceptable"):
        return None

    mid = metric["id"]
    if mid == "aspect_harmony":
        if category in ("necklaces", "pendants", "earrings"):
            return "Elongate the vertical drop or tighten the upper cluster so the silhouette approaches φ."
        if category == "bracelets":
            return "Extend the horizontal span or reduce vertical depth so width-to-height aligns with φ."
        return "Adjust overall footprint — widen or lengthen the composition so major dimensions relate by 1.618."

    if mid == "vertical_section":
        return "Reposition the visual mass (stone cluster or drop) toward the 0.382 / 0.618 vertical divide."

    if mid == "horizontal_section":
        return "Balance lateral weight — shift the focal element toward the golden horizontal mean."

    if mid == "mass_balance":
        return "Redistribute visual mass across the golden divide — one zone is carrying disproportionate weight."

    if mid == "focal_compactness":
        return "Tighten or expand the occupied silhouette so density reads as deliberate, not accidental."

    return None


def assess_piece(
    analysis: dict[str, Any],
    title: str,
    product_code: str,
) -> dict[str, Any]:
    """Produce human-readable agent report from structured metrics."""
    metrics = analysis["metrics"]
    category = analysis["category"]
    overall = analysis["overall_score"]
    meets = analysis["meets_golden_ratio"]

    weak = sorted(metrics, key=lambda m: m["score"])
    strong = sorted(metrics, key=lambda m: m["score"], reverse=True)

    recommendations: list[str] = []
    for m in weak:
        rec = _recommendation_for(m, category)
        if rec and rec not in recommendations:
            recommendations.append(rec)

    if meets:
        headline = f"{title} meets Bianca's golden-ratio atelier standard"
        summary = (
            f"At {overall:.0f}/100, {product_code} demonstrates harmonious proportions across "
            f"{strong[0]['label'].lower()} and {strong[1]['label'].lower()}. "
            f"The silhouette, mass balance, and focal placement align with φ (1.618) within atelier tolerance."
        )
        verdict = "meets"
    else:
        headline = f"{title} — proportion refinement recommended"
        summary = (
            f"Scored {overall:.0f}/100. The piece shows strength in {strong[0]['label'].lower()} "
            f"({strong[0]['score']:.0f}/100) but {weak[0]['label'].lower()} "
            f"({weak[0]['score']:.0f}/100) deviates from the golden mean. "
            f"An atelier sketch proposes proportional adjustments."
        )
        verdict = "does_not_meet"

    agent_steps = [
        {"step": 1, "action": "Segment silhouette", "result": "Isolated jewellery mass from studio backdrop"},
        {"step": 2, "action": "Measure φ metrics", "result": f"Evaluated {len(metrics)} proportion dimensions"},
        {
            "step": 3,
            "action": "Category calibration",
            "result": f"Applied {category} profile (primary axis: {analysis['profile']['primary_axis']})",
        },
        {
            "step": 4,
            "action": "Verdict",
            "result": "Meets standard" if meets else "Sketch generated for refinement",
        },
    ]

    optional_ai = _optional_llm_enhancement(title, product_code, analysis, recommendations)
    if optional_ai:
        summary = optional_ai

    return {
        "verdict": verdict,
        "headline": headline,
        "summary": summary,
        "recommendations": recommendations[:4],
        "agent_steps": agent_steps,
        "strongest_metric": strong[0]["label"],
        "weakest_metric": weak[0]["label"],
    }


def _optional_llm_enhancement(
    title: str,
    product_code: str,
    analysis: dict[str, Any],
    recommendations: list[str],
) -> str | None:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return None

    try:
        import json
        import urllib.request

        metrics_text = "\n".join(
            f"- {m['label']}: {m['score']}/100 (value {m['value']}, ideal ~{m['ideal']})"
            for m in analysis["metrics"]
        )
        prompt = (
            f"You are a high-jewellery atelier proportion specialist. "
            f"Piece: {title} ({product_code}). Category: {analysis['category']}. "
            f"Overall score: {analysis['overall_score']}/100. Meets golden ratio: {analysis['meets_golden_ratio']}.\n"
            f"Metrics:\n{metrics_text}\n"
            f"Draft recommendations: {'; '.join(recommendations) or 'none'}\n"
            f"Write 2 elegant sentences for a salon client — precise, not salesy."
        )
        body = json.dumps(
            {
                "model": "gpt-4o-mini",
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 180,
                "temperature": 0.4,
            }
        ).encode()
        req = urllib.request.Request(
            "https://api.openai.com/v1/chat/completions",
            data=body,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode())
        return data["choices"][0]["message"]["content"].strip()
    except Exception:
        return None
