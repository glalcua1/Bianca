import {
  handleJppAdminCustomers,
  handleJppAdminUpdateCustomer,
} from "../../../server/jpp-handler.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method === "GET") {
    const result = await handleJppAdminCustomers(req, {
      search: typeof req.query?.search === "string" ? req.query.search : "",
      status: typeof req.query?.status === "string" ? req.query.status : "",
      sort: typeof req.query?.sort === "string" ? req.query.sort : "desc",
    });
    res.status(result.status).json(result.body);
    return;
  }

  if (req.method === "PATCH") {
    const result = await handleJppAdminUpdateCustomer(req, req.body);
    res.status(result.status).json(result.body);
    return;
  }

  res.status(405).json({ ok: false, error: "method_not_allowed" });
}
