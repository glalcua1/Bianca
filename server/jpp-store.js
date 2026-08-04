import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import { createClient } from "@supabase/supabase-js";
import {
  getJppServerConfig,
  hasSupabaseConfig,
} from "./jpp-config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @typedef {'registered' | 'activation_pending' | 'active' | 'completed'} JppStatus */

/**
 * @typedef {object} JppCustomer
 * @property {string} id
 * @property {string} full_name
 * @property {string} mobile_number
 * @property {string|null} email
 * @property {string} jpp_number
 * @property {JppStatus} status
 * @property {boolean} consent
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string|null} activated_at
 */

function formatJppNumber(sequence, prefix) {
  return `${prefix}-${String(sequence).padStart(6, "0")}`;
}

function normalizeCustomer(row) {
  if (!row) return null;
  return {
    id: row.id,
    full_name: row.full_name,
    mobile_number: row.mobile_number,
    email: row.email ?? null,
    jpp_number: row.jpp_number,
    status: row.status,
    consent: Boolean(row.consent),
    created_at: row.created_at,
    updated_at: row.updated_at,
    activated_at: row.activated_at ?? null,
  };
}

/* -------------------------------------------------------------------------- */
/* SQLite fallback                                                            */
/* -------------------------------------------------------------------------- */

let sqliteDb;

function getSqliteDb() {
  if (sqliteDb) return sqliteDb;

  const dbDir = path.resolve(__dirname, "../database");
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

  const dbPath = path.join(dbDir, "jpp_customers.db");
  const schemaPath = path.join(dbDir, "jpp-schema.sql");

  sqliteDb = new Database(dbPath);
  sqliteDb.pragma("journal_mode = WAL");
  sqliteDb.exec(fs.readFileSync(schemaPath, "utf8"));
  return sqliteDb;
}

function sqliteFindByMobile(mobile) {
  const row = getSqliteDb()
    .prepare("SELECT * FROM jpp_customers WHERE mobile_number = ?")
    .get(mobile);
  return normalizeCustomer(row);
}

function sqliteRegisterCustomer({ fullName, mobileNumber, email, consent }) {
  const existing = sqliteFindByMobile(mobileNumber);
  if (existing) {
    return { duplicate: true, customer: existing };
  }

  const config = getJppServerConfig();
  const db = getSqliteDb();
  const allocate = db.transaction(() => {
    db.prepare(
      "UPDATE jpp_number_sequence SET last_value = last_value + 1 WHERE id = 1",
    ).run();
    const { last_value: seq } = db
      .prepare("SELECT last_value FROM jpp_number_sequence WHERE id = 1")
      .get();
    const jppNumber = formatJppNumber(seq, config.jppNumberPrefix);
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO jpp_customers (
        id, full_name, mobile_number, email, jpp_number, status, consent,
        created_at, updated_at, activated_at
      ) VALUES (
        @id, @full_name, @mobile_number, @email, @jpp_number, 'activation_pending',
        @consent, @created_at, @updated_at, NULL
      )
    `).run({
      id,
      full_name: fullName,
      mobile_number: mobileNumber,
      email: email || null,
      jpp_number: jppNumber,
      consent: consent ? 1 : 0,
      created_at: now,
      updated_at: now,
    });

    return sqliteFindByMobile(mobileNumber);
  });

  try {
    const customer = allocate();
    return { duplicate: false, customer };
  } catch (error) {
    if (String(error?.message || "").includes("UNIQUE")) {
      const customer = sqliteFindByMobile(mobileNumber);
      if (customer) return { duplicate: true, customer };
    }
    throw error;
  }
}

function sqliteListCustomers({ search = "", status = "", sort = "desc" } = {}) {
  const order = sort === "asc" ? "ASC" : "DESC";
  const params = [];
  const clauses = [];

  if (search) {
    clauses.push(
      "(full_name LIKE ? OR mobile_number LIKE ? OR jpp_number LIKE ? OR IFNULL(email, '') LIKE ?)",
    );
    const like = `%${search}%`;
    params.push(like, like, like, like);
  }
  if (status) {
    clauses.push("status = ?");
    params.push(status);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const rows = getSqliteDb()
    .prepare(`SELECT * FROM jpp_customers ${where} ORDER BY created_at ${order}`)
    .all(...params);

  return rows.map(normalizeCustomer);
}

function sqliteGetStats() {
  const db = getSqliteDb();
  const total = db.prepare("SELECT COUNT(*) AS c FROM jpp_customers").get().c;
  const today = db
    .prepare(
      `SELECT COUNT(*) AS c FROM jpp_customers
       WHERE date(created_at) = date('now')`,
    )
    .get().c;
  const month = db
    .prepare(
      `SELECT COUNT(*) AS c FROM jpp_customers
       WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')`,
    )
    .get().c;

  return {
    totalRegistered: total,
    registrationsToday: today,
    registrationsThisMonth: month,
  };
}

function sqliteUpdateStatus(id, status) {
  const now = new Date().toISOString();
  const activatedAt = status === "active" ? now : null;

  if (status === "active") {
    getSqliteDb()
      .prepare(
        `UPDATE jpp_customers
         SET status = ?, updated_at = ?, activated_at = COALESCE(activated_at, ?)
         WHERE id = ?`,
      )
      .run(status, now, activatedAt, id);
  } else {
    getSqliteDb()
      .prepare(
        `UPDATE jpp_customers
         SET status = ?, updated_at = ?,
             activated_at = CASE WHEN ? = 'active' THEN COALESCE(activated_at, ?) ELSE activated_at END
         WHERE id = ?`,
      )
      .run(status, now, status, now, id);
  }

  const row = getSqliteDb()
    .prepare("SELECT * FROM jpp_customers WHERE id = ?")
    .get(id);
  return normalizeCustomer(row);
}

function sqliteGetById(id) {
  const row = getSqliteDb()
    .prepare("SELECT * FROM jpp_customers WHERE id = ?")
    .get(id);
  return normalizeCustomer(row);
}

/* -------------------------------------------------------------------------- */
/* Supabase                                                                   */
/* -------------------------------------------------------------------------- */

function getSupabase() {
  const config = getJppServerConfig();
  if (!hasSupabaseConfig(config)) return null;
  return createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function supabaseFindByMobile(mobile) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("jpp_customers")
    .select("*")
    .eq("mobile_number", mobile)
    .maybeSingle();
  if (error) throw error;
  return normalizeCustomer(data);
}

async function supabaseRegisterCustomer({
  fullName,
  mobileNumber,
  email,
  consent,
}) {
  const existing = await supabaseFindByMobile(mobileNumber);
  if (existing) {
    return { duplicate: true, customer: existing };
  }

  const config = getJppServerConfig();
  const supabase = getSupabase();

  const { data: seq, error: seqError } = await supabase.rpc("jpp_next_sequence");
  if (seqError) throw seqError;

  const jppNumber = formatJppNumber(seq, config.jppNumberPrefix);
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("jpp_customers")
    .insert({
      full_name: fullName,
      mobile_number: mobileNumber,
      email: email || null,
      jpp_number: jppNumber,
      status: "activation_pending",
      consent: Boolean(consent),
      created_at: now,
      updated_at: now,
    })
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      const customer = await supabaseFindByMobile(mobileNumber);
      if (customer) return { duplicate: true, customer };
    }
    throw error;
  }

  return { duplicate: false, customer: normalizeCustomer(data) };
}

async function supabaseListCustomers({
  search = "",
  status = "",
  sort = "desc",
} = {}) {
  const supabase = getSupabase();
  let query = supabase.from("jpp_customers").select("*");

  if (status) query = query.eq("status", status);
  if (search) {
    const escaped = search.replace(/%/g, "\\%").replace(/_/g, "\\_");
    query = query.or(
      `full_name.ilike.%${escaped}%,mobile_number.ilike.%${escaped}%,jpp_number.ilike.%${escaped}%,email.ilike.%${escaped}%`,
    );
  }

  query = query.order("created_at", { ascending: sort === "asc" });

  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map(normalizeCustomer);
}

async function supabaseGetStats() {
  const supabase = getSupabase();
  const now = new Date();
  const startOfDay = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  ).toISOString();
  const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  ).toISOString();

  const [totalRes, todayRes, monthRes] = await Promise.all([
    supabase.from("jpp_customers").select("id", { count: "exact", head: true }),
    supabase
      .from("jpp_customers")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfDay),
    supabase
      .from("jpp_customers")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfMonth),
  ]);

  if (totalRes.error) throw totalRes.error;
  if (todayRes.error) throw todayRes.error;
  if (monthRes.error) throw monthRes.error;

  return {
    totalRegistered: totalRes.count || 0,
    registrationsToday: todayRes.count || 0,
    registrationsThisMonth: monthRes.count || 0,
  };
}

async function supabaseUpdateStatus(id, status) {
  const supabase = getSupabase();
  const patch = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (status === "active") {
    const existing = await supabaseGetById(id);
    if (existing && !existing.activated_at) {
      patch.activated_at = new Date().toISOString();
    }
  }

  const { data, error } = await supabase
    .from("jpp_customers")
    .update(patch)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) throw error;
  return normalizeCustomer(data);
}

async function supabaseGetById(id) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("jpp_customers")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return normalizeCustomer(data);
}

/* -------------------------------------------------------------------------- */
/* Public store API                                                           */
/* -------------------------------------------------------------------------- */

function useSupabase() {
  return hasSupabaseConfig();
}

export function getJppStorageMode() {
  return useSupabase() ? "supabase" : "sqlite";
}

export async function registerJppCustomer(input) {
  if (useSupabase()) return supabaseRegisterCustomer(input);
  return sqliteRegisterCustomer(input);
}

export async function findJppCustomerByMobile(mobile) {
  if (useSupabase()) return supabaseFindByMobile(mobile);
  return sqliteFindByMobile(mobile);
}

export async function listJppCustomers(filters) {
  if (useSupabase()) return supabaseListCustomers(filters);
  return sqliteListCustomers(filters);
}

export async function getJppStats() {
  if (useSupabase()) return supabaseGetStats();
  return sqliteGetStats();
}

export async function updateJppCustomerStatus(id, status) {
  if (useSupabase()) return supabaseUpdateStatus(id, status);
  return sqliteUpdateStatus(id, status);
}

export async function getJppCustomerById(id) {
  if (useSupabase()) return supabaseGetById(id);
  return sqliteGetById(id);
}
