import { handleExchangeRatesRequest } from "./exchange-rates-handler.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  res.end(JSON.stringify(body));
}

export function exchangeRatesApiPlugin() {
  return {
    name: "exchange-rates-api",
    enforce: "pre",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split("?")[0];
        if (path !== "/api/exchange-rates") {
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
          sendJson(res, 405, { ok: false, error: "method_not_allowed" });
          return;
        }

        try {
          const result = await handleExchangeRatesRequest();
          sendJson(res, result.status, result.body);
        } catch {
          sendJson(res, 500, { ok: false, error: "server_error" });
        }
      });
    },
  };
}
