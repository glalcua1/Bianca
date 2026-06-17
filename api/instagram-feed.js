/**
 * Instagram gallery for The Gallery section.
 * 1. Meta Graph API when INSTAGRAM_ACCESS_TOKEN is set (production).
 * 2. Public profile timeline via Instagram web API (local dev & fallback).
 *
 * Query: ?username=bianca.diamonds&limit=12
 */

import { handleInstagramFeedRequest } from "../server/instagram-gallery-handler.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  try {
    const result = await handleInstagramFeedRequest(req.query ?? {});
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );
    res.status(result.status).json(result.body);
  } catch {
    res.status(200).json({ media: [], configured: false, error: "handler_error" });
  }
}
