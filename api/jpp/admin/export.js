import { handleJppAdminExport } from "../../../server/jpp-handler.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const result = await handleJppAdminExport(req, {
    search: typeof req.query?.search === "string" ? req.query.search : "",
    status: typeof req.query?.status === "string" ? req.query.status : "",
    sort: typeof req.query?.sort === "string" ? req.query.sort : "desc",
  });

  if (result.buffer) {
    res.setHeader("Content-Type", result.contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${result.filename}"`,
    );
    res.status(200).send(result.buffer);
    return;
  }

  res.status(result.status).json(result.body);
}
