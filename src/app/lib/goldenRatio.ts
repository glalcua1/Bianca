export const PHI = (1 + Math.sqrt(5)) / 2;

export type GoldenRatioMetric = {
  id: string;
  label: string;
  description: string;
  value: number;
  ideal: number;
  deviation: number;
  score: number;
  unit: string;
};

export type GoldenRatioAnalysis = {
  phi: number;
  category: string;
  overall_score: number;
  meets_golden_ratio: boolean;
  metrics: GoldenRatioMetric[];
  segmentation: {
    bbox: { x: number; y: number; width: number; height: number };
    centroid: { x: number; y: number };
    centroid_normalized: { x: number; y: number };
    image_width: number;
    image_height: number;
  };
  profile: {
    primary_axis: string;
    ideal_centroid: { x: number; y: number };
  };
};

export type GoldenRatioAgentStep = {
  step: number;
  action: string;
  result: string;
};

export type GoldenRatioReport = {
  verdict: "meets" | "does_not_meet";
  headline: string;
  summary: string;
  recommendations: string[];
  agent_steps: GoldenRatioAgentStep[];
  strongest_metric: string;
  weakest_metric: string;
};

export type GoldenRatioSketchSource = "gemini" | "cv-overlay";

export type GoldenRatioAnalyzeResponse = {
  ok: boolean;
  analysis?: GoldenRatioAnalysis;
  report?: GoldenRatioReport;
  /** Primary sketch — Gemini atelier redesign when available */
  sketch_png_base64?: string | null;
  /** Technical φ overlay (shown alongside Gemini sketch) */
  sketch_annotation_base64?: string | null;
  sketch_source?: GoldenRatioSketchSource | null;
  sketch_model?: string | null;
  sketch_error?: string | null;
  engine?: string;
  error?: string;
  message?: string;
};

export type AnalyzePieceInput = {
  image: string;
  category: string;
  title: string;
  productCode: string;
};

export async function analyzePieceProportions(
  input: AnalyzePieceInput,
): Promise<GoldenRatioAnalyzeResponse> {
  const res = await fetch("/api/golden-ratio-analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = (await res.json()) as GoldenRatioAnalyzeResponse;
  if (!res.ok && data.ok !== false) {
    return { ok: false, error: "request_failed", message: res.statusText };
  }
  return data;
}

export function scoreTone(score: number): "excellent" | "good" | "attention" | "critical" {
  if (score >= 85) return "excellent";
  if (score >= 72) return "good";
  if (score >= 55) return "attention";
  return "critical";
}

export function scoreLabel(score: number): string {
  const tone = scoreTone(score);
  if (tone === "excellent") return "Harmonious";
  if (tone === "good") return "Within tolerance";
  if (tone === "attention") return "Needs refinement";
  return "Critical deviation";
}
