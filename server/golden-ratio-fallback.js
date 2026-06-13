/**
 * Lightweight JS fallback when Python/OpenCV is unavailable (e.g. some deploy targets).
 * Uses sharp if installed; otherwise returns a structured error.
 */

import fs from "node:fs";
import { generateGeminiRedesignSketch } from "./gemini-sketch.js";

const PHI = (1 + Math.sqrt(5)) / 2;
const PHI_INV = 1 / PHI;
const PASS_SCORE = 72;

const PROFILES = {
  rings: { idealY: PHI_INV, idealX: 0.5, axis: "vertical" },
  earrings: { idealY: 0.45, idealX: 0.5, axis: "vertical" },
  necklaces: { idealY: 0.58, idealX: 0.5, axis: "vertical" },
  pendants: { idealY: 0.62, idealX: 0.5, axis: "vertical" },
  bracelets: { idealY: 0.5, idealX: PHI_INV, axis: "horizontal" },
  "for-him": { idealY: 0.5, idealX: 0.5, axis: "horizontal" },
};

function scoreFromDeviation(dev, tolerance = 0.12) {
  if (dev <= tolerance) return 100 - (dev / tolerance) * 8;
  return Math.max(0, 92 - (dev - tolerance) * 220);
}

function aspectDeviation(w, h) {
  const ratio = Math.max(w, h) / Math.min(w, h);
  const candidates = [PHI, Math.sqrt(PHI), PHI * PHI];
  return Math.min(...candidates.map((c) => Math.abs(ratio - c) / c));
}

async function loadSharp() {
  try {
    const mod = await import("sharp");
    return mod.default;
  } catch {
    return null;
  }
}

async function analyzeWithSharp(imagePath, category) {
  const sharp = await loadSharp();
  if (!sharp) return null;

  const profile = PROFILES[category] ?? PROFILES.rings;
  const { data, info } = await sharp(imagePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let sumX = 0;
  let sumY = 0;
  let count = 0;

  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];
  let bgR = 0;
  let bgG = 0;
  let bgB = 0;
  for (const [cx, cy] of corners) {
    const i = (cy * width + cx) * channels;
    bgR += data[i];
    bgG += data[i + 1];
    bgB += data[i + 2];
  }
  bgR /= 4;
  bgG /= 4;
  bgB /= 4;
  const bgLum = 0.299 * bgR + 0.587 * bgG + 0.114 * bgB;
  const threshold = bgLum > 128 ? 22 : 32;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const dr = data[i] - bgR;
      const dg = data[i + 1] - bgG;
      const db = data[i + 2] - bgB;
      const dist = Math.sqrt(dr * dr + dg * dg + db * db);
      if (dist > threshold) {
        count++;
        sumX += x;
        sumY += y;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (count < 50) {
    const inset = Math.floor(Math.min(width, height) * 0.15);
    minX = inset;
    minY = inset;
    maxX = width - inset;
    maxY = height - inset;
    sumX = ((minX + maxX) / 2) * (maxX - minX + 1) * (maxY - minY + 1);
    sumY = ((minY + maxY) / 2) * (maxX - minX + 1) * (maxY - minY + 1);
    count = (maxX - minX + 1) * (maxY - minY + 1);
  }

  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  const cx = sumX / count;
  const cy = sumY / count;
  const cxNorm = (cx - minX) / bw;
  const cyNorm = (cy - minY) / bh;

  const metrics = [
    {
      id: "aspect_harmony",
      label: "Silhouette aspect ratio",
      description: "Overall width-to-height proportion compared to φ.",
      value: Math.round((Math.max(bw, bh) / Math.min(bw, bh)) * 1000) / 1000,
      ideal: Math.round(PHI * 1000) / 1000,
      deviation: Math.round(aspectDeviation(bw, bh) * 10000) / 10000,
      score: Math.round(scoreFromDeviation(aspectDeviation(bw, bh)) * 10) / 10,
      unit: "ratio",
    },
    {
      id: "vertical_section",
      label: "Vertical golden section",
      description: "Visual mass centroid vs ideal vertical golden section.",
      value: Math.round(cyNorm * 1000) / 1000,
      ideal: profile.idealY,
      deviation: Math.round(Math.abs(cyNorm - profile.idealY) * 10000) / 10000,
      score: Math.round(scoreFromDeviation(Math.abs(cyNorm - profile.idealY), 0.1) * 10) / 10,
      unit: "normalized",
    },
    {
      id: "horizontal_section",
      label: "Horizontal golden section",
      description: "Lateral balance relative to the golden mean.",
      value: Math.round(cxNorm * 1000) / 1000,
      ideal: profile.idealX,
      deviation: Math.round(Math.abs(cxNorm - profile.idealX) * 10000) / 10000,
      score: Math.round(scoreFromDeviation(Math.abs(cxNorm - profile.idealX), 0.1) * 10) / 10,
      unit: "normalized",
    },
  ];

  const overall = metrics.reduce((s, m) => s + m.score, 0) / metrics.length;
  const meets = overall >= PASS_SCORE;

  return {
    ok: true,
    analysis: {
      phi: PHI,
      category,
      overall_score: Math.round(overall * 10) / 10,
      meets_golden_ratio: meets,
      metrics,
      segmentation: {
        bbox: { x: minX, y: minY, width: bw, height: bh },
        centroid: { x: Math.round(cx * 10) / 10, y: Math.round(cy * 10) / 10 },
        centroid_normalized: { x: Math.round(cxNorm * 1000) / 1000, y: Math.round(cyNorm * 1000) / 1000 },
        image_width: width,
        image_height: height,
      },
      profile: {
        primary_axis: profile.axis,
        ideal_centroid: { x: profile.idealX, y: profile.idealY },
      },
    },
    report: {
      verdict: meets ? "meets" : "does_not_meet",
      headline: meets ? "Meets golden-ratio standard (fallback engine)" : "Refinement recommended (fallback engine)",
      summary: meets
        ? "Proportions fall within atelier tolerance using the lightweight analyser."
        : "One or more proportion dimensions deviate from φ. Install Python dependencies for full sketch output.",
      recommendations: meets
        ? []
        : ["Review silhouette aspect ratio and focal placement against φ divides."],
      agent_steps: [
        { step: 1, action: "Segment silhouette", result: "JS fallback segmentation" },
        { step: 2, action: "Measure φ metrics", result: `${metrics.length} core dimensions` },
        { step: 3, action: "Verdict", result: meets ? "Meets" : "Needs refinement" },
      ],
      strongest_metric: metrics.reduce((a, b) => (a.score > b.score ? a : b)).label,
      weakest_metric: metrics.reduce((a, b) => (a.score < b.score ? a : b)).label,
    },
    sketch_png_base64: null,
    engine: "js-fallback",
  };
}

export async function runGoldenRatioFallback(payload) {
  const { imagePath, category, title, productCode } = payload;
  if (!imagePath || !fs.existsSync(imagePath)) {
    return { ok: false, error: "image_not_found" };
  }

  const result = await analyzeWithSharp(imagePath, category);
  if (!result) {
    return { ok: false, error: "python_unavailable_and_no_sharp" };
  }

  if (title) result.report.headline = result.report.headline.replace("fallback engine", title);

  if (!result.analysis.meets_golden_ratio) {
    const gemini = await generateGeminiRedesignSketch(
      imagePath,
      title || "Atelier piece",
      productCode || "—",
      category,
      result.analysis,
      result.report.recommendations,
    );
    if (gemini.ok) {
      result.sketch_png_base64 = gemini.sketch_png_base64;
      result.sketch_source = "gemini";
      result.sketch_model = gemini.model;
      result.report.agent_steps.push({
        step: 4,
        action: "Gemini redesign sketch",
        result: `Atelier drawing generated (${gemini.model})`,
      });
      result.report.summary =
        "Proportions deviate from φ. A Gemini atelier sketch shows the proposed redesigned piece.";
    }
  }

  return result;
}
