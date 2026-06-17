import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbDir = path.resolve(__dirname, "../database");
const dbPath = path.join(dbDir, "consultation_leads.db");
const schemaPath = path.join(dbDir, "schema.sql");

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.exec(fs.readFileSync(schemaPath, "utf8"));

/**
 * @param {{ clientName: string; phone: string; city: string; sourcePage?: string }} lead
 */
export function insertConsultationLead(lead) {
  const stmt = db.prepare(`
    INSERT INTO consultation_leads (client_name, phone, city, source_page)
    VALUES (@clientName, @phone, @city, @sourcePage)
  `);

  const result = stmt.run({
    clientName: lead.clientName,
    phone: lead.phone,
    city: lead.city,
    sourcePage: lead.sourcePage ?? "cannes-2026",
  });

  return result.lastInsertRowid;
}
