-- Consultation leads captured from the Cannes 2026 showcase and future pages.
CREATE TABLE IF NOT EXISTS consultation_leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  source_page TEXT NOT NULL DEFAULT 'cannes-2026',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_consultation_leads_created_at
  ON consultation_leads (created_at DESC);
