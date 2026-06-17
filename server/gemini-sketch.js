/**
 * Node.js Gemini redesign sketch — used when Python path unavailable (e.g. Vercel).
 */

import fs from "node:fs";

const PHI = (1 + Math.sqrt(5)) / 2;

const GEMINI_IMAGE_MODELS = [
  "gemini-2.5-flash-image",
  "gemini-3.1-flash-image",
  "gemini-3-pro-image",
];

function apiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
}

function buildPrompt(title, productCode, category, analysis, recommendations) {
  const metricsLines = analysis.metrics
    .map(
      (m) =>
        `  • ${m.label}: scored ${m.score}/100 (measured ${m.value}, ideal ≈ ${m.ideal})`,
    )
    .join("\n");
  const recLines =
    recommendations.length > 0
      ? recommendations.map((r) => `  • ${r}`).join("\n")
      : "  • Align silhouette and focal mass to φ (1.618)";

  const profile = analysis.profile;

  return `You are the lead designer at Bianca Diamonds, a high-jewellery house.

Attached is a product photograph of "${title}" (${productCode}) — a ${category.replace("-", " ")} piece.

Our golden-ratio atelier analysis (φ = ${PHI.toFixed(3)}) scored this piece ${analysis.overall_score}/100 — it needs proportional refinement.

CREATE A NEW ATELIER DESIGN SKETCH showing the REDESIGNED piece — how it should look after correction. The sketch must make the new design immediately obvious to a client in a salon.

PROPORTION ISSUES TO FIX:
${recLines}

DETAILED METRICS:
${metricsLines}

DESIGN CONSTRAINTS:
- Preserve the piece's identity: same stones, metal tone, setting style, and Bianca craftsmanship language
- Change ONLY proportions: overall silhouette, focal mass position, drop/span dimensions
- Primary axis for this category: ${profile.primary_axis}
- Ideal visual mass centre: x=${profile.ideal_centroid.x}, y=${profile.ideal_centroid.y}

SKETCH STYLE (mandatory):
- Fine-jewellery couture technical drawing — graphite and sepia ink on warm cream paper (#faf8f5)
- Single clear hero view of the COMPLETE redesigned piece, centred
- Subtle gold φ construction lines lightly visible behind the drawing
- NOT a photo — a fresh design drawing
- Small caption lower right: "φ Refinement — Bianca Atelier"

The viewer must instantly understand what the improved design looks like.`;
}

function mimeForPath(imagePath) {
  const ext = imagePath.toLowerCase().split(".").pop();
  return ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";
}

async function callGemini(model, prompt, imagePath) {
  const key = apiKey();
  const imageB64 = fs.readFileSync(imagePath).toString("base64");
  const mime = mimeForPath(imagePath);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              { inline_data: { mime_type: mime, data: imageB64 } },
            ],
          },
        ],
        generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${model}: ${res.status} ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  for (const candidate of data.candidates ?? []) {
    for (const part of candidate.content?.parts ?? []) {
      const inline = part.inlineData ?? part.inline_data;
      if (inline?.data) {
        return { b64: inline.data, model };
      }
    }
  }
  throw new Error(`${model}_no_image_in_response`);
}

export async function generateGeminiRedesignSketch(
  imagePath,
  title,
  productCode,
  category,
  analysis,
  recommendations,
) {
  if (!apiKey()) {
    return { ok: false, error: "missing_gemini_api_key" };
  }

  const prompt = buildPrompt(title, productCode, category, analysis, recommendations);
  let lastError = "gemini_no_image";

  for (const model of GEMINI_IMAGE_MODELS) {
    try {
      const { b64, model: used } = await callGemini(model, prompt, imagePath);
      return {
        ok: true,
        sketch_png_base64: b64,
        model: used,
        sketch_source: "gemini",
      };
    } catch (err) {
      lastError = err.message;
    }
  }

  return { ok: false, error: lastError };
}
