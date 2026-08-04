-- Local SQLite schema for Bianca JPP (dev / fallback when Supabase is unset).

CREATE TABLE IF NOT EXISTS jpp_customers (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL UNIQUE,
  email TEXT,
  jpp_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'activation_pending'
    CHECK (status IN ('registered', 'activation_pending', 'active', 'completed')),
  consent INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  activated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_jpp_customers_created_at
  ON jpp_customers (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_jpp_customers_status
  ON jpp_customers (status);

CREATE TABLE IF NOT EXISTS jpp_number_sequence (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  last_value INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO jpp_number_sequence (id, last_value) VALUES (1, 0);

-- Future-ready installment tracking scaffold.
CREATE TABLE IF NOT EXISTS jpp_installments (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES jpp_customers (id) ON DELETE CASCADE,
  installment_number INTEGER NOT NULL,
  amount_due REAL,
  amount_paid REAL,
  due_date TEXT,
  paid_at TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  transaction_reference TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (customer_id, installment_number)
);
