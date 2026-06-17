import { handleInstagramFeedRequest } from "./instagram-gallery-handler.js";
import { handleInstagramMediaProxyRequest } from "./instagram-media-proxy-handler.js";

function parseQuery(url) {
  const i = url.indexOf("?");
  if (i === -1) return {};
  const params = new URLSearchParams(url.slice(i + 1));
  return Object.fromEntries(params.entries());
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end(JSON.stringify(body));
}

export function instagramApiPlugin() {
  return {
    name: "instagram-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split("?")[0];

        if (
          path !== "/api/instagram-feed" &&
          path !== "/api/instagram-media"
        ) {
          next();
          return;
        }

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
          res.end();
          return;
        }

        if (req.method !== "GET") {
          sendJson(res, 405, { error: "method_not_allowed" });
          return;
        }

        try {
          const query = parseQuery(req.url ?? "");

          if (path === "/api/instagram-media") {
            const result = await handleInstagramMediaProxyRequest(query);
            res.statusCode = result.status;
            if (result.body) {
              res.setHeader("Content-Type", result.contentType);
              if (result.cacheControl) {
                res.setHeader("Cache-Control", result.cacheControl);
              }
              res.end(result.body);
            } else {
              res.end();
            }
            return;
          }

          const result = await handleInstagramFeedRequest(query);
          sendJson(res, result.status, result.body);
        } catch {
          if (path === "/api/instagram-media") {
            res.statusCode = 502;
            res.end();
            return;
          }
          sendJson(res, 200, {
            media: [],
            configured: false,
            error: "handler_error",
          });
        }
      });
    },
  };
}
