"""Generate clear atelier redesign sketches via Google Gemini image models."""

from __future__ import annotations

import base64
import io
import os
from typing import Any

from PIL import Image

PHI = 1.618033988749895

# Prefer stable image model; fall back through known aliases.
GEMINI_IMAGE_MODELS = (
    "gemini-2.5-flash-image",
    "gemini-3.1-flash-image",
    "gemini-3-pro-image",
)


def _api_key() -> str | None:
    return os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")


def _build_prompt(
    title: str,
    product_code: str,
    category: str,
    analysis: dict[str, Any],
    recommendations: list[str],
) -> str:
    metrics_lines = "\n".join(
        f"  • {m['label']}: scored {m['score']}/100 "
        f"(measured {m['value']}, ideal ≈ {m['ideal']})"
        for m in analysis["metrics"]
    )
    rec_lines = "\n".join(f"  • {r}" for r in recommendations) or "  • Align silhouette and focal mass to φ (1.618)"

    profile = analysis["profile"]
    seg = analysis["segmentation"]

    return f"""You are the lead designer at Bianca Diamonds, a high-jewellery house.

Attached is a product photograph of "{title}" ({product_code}) — a {category.replace("-", " ")} piece.

Our golden-ratio atelier analysis (φ = {PHI:.3f}) scored this piece {analysis['overall_score']}/100 — it needs proportional refinement.

CREATE A NEW ATELIER DESIGN SKETCH showing the REDESIGNED piece — how it should look after correction. The sketch must make the new design immediately obvious to a client in a salon.

PROPORTION ISSUES TO FIX:
{rec_lines}

DETAILED METRICS:
{metrics_lines}

DESIGN CONSTRAINTS:
- Preserve the piece's identity: same stones, metal tone, setting style, and Bianca craftsmanship language
- Change ONLY proportions: overall silhouette, focal mass position, drop/span dimensions
- Primary axis for this category: {profile['primary_axis']}
- Ideal visual mass centre: x={profile['ideal_centroid']['x']:.2f}, y={profile['ideal_centroid']['y']:.2f} (normalised in frame)
- Current bbox: {seg['bbox']['width']}×{seg['bbox']['height']}px; centroid at ({seg['centroid_normalized']['x']}, {seg['centroid_normalized']['y']})

SKETCH STYLE (mandatory):
- Fine-jewellery couture technical drawing — graphite and sepia ink on warm cream paper (#faf8f5)
- Single clear hero view of the COMPLETE redesigned piece, centred
- Subtle gold φ construction lines (golden-ratio grid) lightly visible behind the drawing
- Professional salon quality — like a Cannes atelier presentation board
- NOT a photo; NOT an overlay on the original — a fresh design drawing
- Small caption lower right: "φ Refinement — Bianca Atelier"

The viewer must instantly understand what the improved design looks like."""


def _extract_image_bytes(response: Any) -> bytes | None:
    candidates = getattr(response, "candidates", None) or []
    for candidate in candidates:
        content = getattr(candidate, "content", None)
        if not content:
            continue
        parts = getattr(content, "parts", None) or []
        for part in parts:
            inline = getattr(part, "inline_data", None)
            if inline and getattr(inline, "data", None):
                data = inline.data
                return data if isinstance(data, bytes) else base64.b64decode(data)

            if hasattr(part, "as_image"):
                try:
                    img = part.as_image()
                    buf = io.BytesIO()
                    img.save(buf, format="PNG")
                    return buf.getvalue()
                except Exception:
                    pass
    return None


def _generate_with_sdk(image_path: str, prompt: str) -> tuple[bytes | None, str]:
    from google import genai

    api_key = _api_key()
    if not api_key:
        return None, "missing_api_key"

    client = genai.Client(api_key=api_key)
    source = Image.open(image_path).convert("RGB")

    last_error = "no_model_response"
    for model in GEMINI_IMAGE_MODELS:
        try:
            response = client.models.generate_content(
                model=model,
                contents=[prompt, source],
            )
            raw = _extract_image_bytes(response)
            if raw:
                return raw, model
            last_error = f"{model}_no_image_in_response"
        except Exception as exc:
            last_error = f"{model}: {exc}"
            continue

    return None, last_error


def _ssl_context():
    import ssl

    try:
        import certifi

        return ssl.create_default_context(cafile=certifi.where())
    except ImportError:
        return ssl.create_default_context()


def _generate_with_rest(image_path: str, prompt: str) -> tuple[bytes | None, str]:
    import json
    import urllib.request

    api_key = _api_key()
    if not api_key:
        return None, "missing_api_key"

    with open(image_path, "rb") as f:
        image_b64 = base64.b64encode(f.read()).decode("ascii")

    ext = image_path.lower().split(".")[-1]
    mime = "image/jpeg" if ext in ("jpg", "jpeg") else "image/png"

    for model in GEMINI_IMAGE_MODELS:
        body = {
            "contents": [
                {
                    "parts": [
                        {"text": prompt},
                        {"inline_data": {"mime_type": mime, "data": image_b64}},
                    ]
                }
            ],
            "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]},
        }
        url = (
            f"https://generativelanguage.googleapis.com/v1beta/models/{model}"
            f":generateContent?key={api_key}"
        )
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(body).encode(),
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=90, context=_ssl_context()) as resp:
                data = json.loads(resp.read().decode())

            for candidate in data.get("candidates", []):
                for part in candidate.get("content", {}).get("parts", []):
                    inline = part.get("inlineData") or part.get("inline_data")
                    if inline and inline.get("data"):
                        return base64.b64decode(inline["data"]), model
            last = f"{model}_no_image"
        except Exception as exc:
            msg = str(exc)
            if "429" in msg or "quota" in msg.lower():
                return None, "gemini_quota_exceeded (HTTP 429) — enable billing at https://ai.dev/rate-limit"
            last = f"{model}: {exc}"
            continue
    if "429" in last or "quota" in last.lower():
        return None, "gemini_quota_exceeded (HTTP 429) — enable billing at https://ai.dev/rate-limit"
    return None, last


def generate_gemini_redesign_sketch(
    image_path: str,
    title: str,
    product_code: str,
    category: str,
    analysis: dict[str, Any],
    recommendations: list[str],
) -> dict[str, Any]:
    """
    Return { ok, sketch_png_base64?, model?, error? }.
    """
    if not _api_key():
        return {"ok": False, "error": "missing_gemini_api_key"}

    prompt = _build_prompt(title, product_code, category, analysis, recommendations)

    raw: bytes | None = None
    model_used = ""

    try:
        raw, model_used = _generate_with_sdk(image_path, prompt)
    except ImportError:
        raw, model_used = _generate_with_rest(image_path, prompt)
    except Exception as exc:
        raw, model_used = None, str(exc)

    if not raw:
        raw, model_used = _generate_with_rest(image_path, prompt)

    if not raw:
        err = model_used or "gemini_no_image"
        if "quota" in err.lower():
            err = "gemini_quota_exceeded — check billing at https://ai.dev/rate-limit"
        return {"ok": False, "error": err}

    # Normalise to PNG base64
    try:
        img = Image.open(io.BytesIO(raw)).convert("RGB")
        buf = io.BytesIO()
        img.save(buf, format="PNG", optimize=True)
        png_b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    except Exception:
        png_b64 = base64.b64encode(raw).decode("ascii")

    return {"ok": True, "sketch_png_base64": png_b64, "model": model_used}
