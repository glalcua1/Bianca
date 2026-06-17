import { handleInstagramMediaProxyRequest } from "../server/instagram-media-proxy-handler.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  try {
    const result = await handleInstagramMediaProxyRequest(req.query ?? {});
    res.status(result.status);
    if (result.body) {
      res.setHeader("Content-Type", result.contentType);
      if (result.cacheControl) {
        res.setHeader("Cache-Control", result.cacheControl);
      }
      res.end(result.body);
    } else {
      res.end();
    }
  } catch {
    res.status(502).end();
  }
}
