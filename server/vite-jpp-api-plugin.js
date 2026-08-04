import {
  handleJppAdminCustomers,
  handleJppAdminExport,
  handleJppAdminLogin,
  handleJppAdminSession,
  handleJppAdminUpdateCustomer,
  handleJppRegister,
} from "./jpp-handler.js";

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("invalid_json"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, OPTIONS",
  );
  res.end(JSON.stringify(body));
}

function parseUrl(req) {
  try {
    return new URL(req.url || "/", "http://localhost");
  } catch {
    return new URL("/", "http://localhost");
  }
}

export function jppApiPlugin() {
  return {
    name: "jpp-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = parseUrl(req);
        const pathname = url.pathname;

        if (!pathname.startsWith("/api/jpp")) {
          next();
          return;
        }

        if (req.method === "OPTIONS") {
          sendJson(res, 204, {});
          return;
        }

        try {
          if (pathname === "/api/jpp/register" && req.method === "POST") {
            const body = await readJsonBody(req);
            const result = await handleJppRegister(body);
            sendJson(res, result.status, result.body);
            return;
          }

          if (pathname === "/api/jpp/admin/login" && req.method === "POST") {
            const body = await readJsonBody(req);
            const result = handleJppAdminLogin(body);
            sendJson(res, result.status, result.body);
            return;
          }

          if (pathname === "/api/jpp/admin/session" && req.method === "GET") {
            const result = handleJppAdminSession(req);
            sendJson(res, result.status, result.body);
            return;
          }

          if (pathname === "/api/jpp/admin/customers" && req.method === "GET") {
            const result = await handleJppAdminCustomers(req, {
              search: url.searchParams.get("search") || "",
              status: url.searchParams.get("status") || "",
              sort: url.searchParams.get("sort") || "desc",
            });
            sendJson(res, result.status, result.body);
            return;
          }

          if (pathname === "/api/jpp/admin/customers" && req.method === "PATCH") {
            const body = await readJsonBody(req);
            const result = await handleJppAdminUpdateCustomer(req, body);
            sendJson(res, result.status, result.body);
            return;
          }

          if (pathname === "/api/jpp/admin/export" && req.method === "GET") {
            const result = await handleJppAdminExport(req, {
              search: url.searchParams.get("search") || "",
              status: url.searchParams.get("status") || "",
              sort: url.searchParams.get("sort") || "desc",
            });
            if (result.buffer) {
              res.statusCode = 200;
              res.setHeader("Content-Type", result.contentType);
              res.setHeader(
                "Content-Disposition",
                `attachment; filename="${result.filename}"`,
              );
              res.setHeader("Access-Control-Allow-Origin", "*");
              res.end(result.buffer);
              return;
            }
            sendJson(res, result.status, result.body);
            return;
          }

          sendJson(res, 404, { ok: false, error: "not_found" });
        } catch (error) {
          if (error?.message === "invalid_json") {
            sendJson(res, 400, { ok: false, error: "Invalid request body." });
            return;
          }
          console.error("[jpp] vite plugin error", error);
          sendJson(res, 500, { ok: false, error: "Internal server error." });
        }
      });
    },
  };
}
