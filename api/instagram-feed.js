/**
 * Vercel serverless: fetches recent Instagram posts/reels via Instagram Graph API.
 *
 * Required env (Vercel project → Settings → Environment Variables):
 *   INSTAGRAM_ACCESS_TOKEN — long‑lived user token (Instagram API with Instagram Login)
 *     or Page token with instagram_manage_insights / appropriate scopes.
 *
 * Optional:
 *   INSTAGRAM_USER_ID — defaults to "me" (works with user tokens for /me/media).
 *   INSTAGRAM_GRAPH_VERSION — defaults to "v21.0".
 *
 * Meta docs: https://developers.facebook.com/docs/instagram-api/guides/content-publishing
 */

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

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    res.status(200).json({ media: [], configured: false });
    return;
  }

  const graphVersion = process.env.INSTAGRAM_GRAPH_VERSION || "v21.0";
  const userId = process.env.INSTAGRAM_USER_ID || "me";
  const fbIgUserId = process.env.INSTAGRAM_FACEBOOK_GRAPH_USER_ID;
  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "permalink",
    "thumbnail_url",
    "children{media_url,media_type}",
  ].join(",");

  const q = `fields=${encodeURIComponent(fields)}&limit=12&access_token=${encodeURIComponent(
    token
  )}`;

  const url = fbIgUserId
    ? `https://graph.facebook.com/${graphVersion}/${fbIgUserId}/media?${q}`
    : `https://graph.instagram.com/${userId}/media?${q}`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    if (!r.ok) {
      res.status(200).json({
        media: [],
        configured: true,
        error: data.error?.message || "instagram_request_failed",
      });
      return;
    }
    res.status(200).json({ media: data.data ?? [], configured: true });
  } catch {
    res.status(200).json({ media: [], configured: true, error: "network" });
  }
}
