-- Bianca Jewellery Purchase Plan (JPP)
-- Apply in the Supabase SQL editor or via CLI.
-- Service-role API access only; RLS denies direct client access.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS jpp_customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  email TEXT,
  jpp_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'activation_pending'
    CHECK (status IN ('registered', 'activation_pending', 'active', 'completed')),
  consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  activated_at TIMESTAMPTZ,
  CONSTRAINT jpp_customers_mobile_unique UNIQUE (mobile_number),
  CONSTRAINT jpp_customers_jpp_number_unique UNIQUE (jpp_number)
);

CREATE INDEX IF NOT EXISTS idx_jpp_customers_created_at
  ON jpp_customers (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_jpp_customers_status
  ON jpp_customers (status);

CREATE INDEX IF NOT EXISTS idx_jpp_customers_mobile
  ON jpp_customers (mobile_number);

CREATE TABLE IF NOT EXISTS jpp_number_sequence (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  last_value BIGINT NOT NULL DEFAULT 0
);

INSERT INTO jpp_number_sequence (id, last_value)
VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

CREATE OR REPLACE FUNCTION jpp_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_jpp_customers_updated_at ON jpp_customers;
CREATE TRIGGER trg_jpp_customers_updated_at
  BEFORE UPDATE ON jpp_customers
  FOR EACH ROW
  EXECUTE PROCEDURE jpp_set_updated_at();

-- Atomically allocate the next JPP sequence number.
CREATE OR REPLACE FUNCTION jpp_next_sequence()
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
  next_val BIGINT;
BEGIN
  UPDATE jpp_number_sequence
  SET last_value = last_value + 1
  WHERE id = 1
  RETURNING last_value INTO next_val;

  IF next_val IS NULL THEN
    INSERT INTO jpp_number_sequence (id, last_value) VALUES (1, 1)
    ON CONFLICT (id) DO UPDATE SET last_value = jpp_number_sequence.last_value + 1
    RETURNING last_value INTO next_val;
  END IF;

  RETURN next_val;
END;
$$;

-- Future-ready installment tracking (not used by MVP UI).
CREATE TABLE IF NOT EXISTS jpp_installments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES jpp_customers (id) ON DELETE CASCADE,
  installment_number INTEGER NOT NULL,
  amount_due NUMERIC(12, 2),
  amount_paid NUMERIC(12, 2),
  due_date DATE,
  paid_at TIMESTAMPTZ,
  payment_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'received', 'partial', 'failed', 'waived')),
  transaction_reference TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT jpp_installments_customer_number_unique
    UNIQUE (customer_id, installment_number)
);

CREATE TABLE IF NOT EXISTS jpp_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL UNIQUE REFERENCES jpp_customers (id) ON DELETE CASCADE,
  plan_start_date DATE,
  plan_maturity_date DATE,
  monthly_amount NUMERIC(12, 2),
  total_amount_paid NUMERIC(12, 2) NOT NULL DEFAULT 0,
  remaining_amount NUMERIC(12, 2),
  redemption_status TEXT NOT NULL DEFAULT 'not_started'
    CHECK (redemption_status IN ('not_started', 'eligible', 'redeemed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE jpp_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE jpp_number_sequence ENABLE ROW LEVEL SECURITY;
ALTER TABLE jpp_installments ENABLE ROW LEVEL SECURITY;
ALTER TABLE jpp_plans ENABLE ROW LEVEL SECURITY;

-- No anon/authenticated policies: public clients cannot read or write.
-- Server uses the service role key, which bypasses RLS.

REVOKE ALL ON TABLE jpp_customers FROM anon, authenticated;
REVOKE ALL ON TABLE jpp_number_sequence FROM anon, authenticated;
REVOKE ALL ON TABLE jpp_installments FROM anon, authenticated;
REVOKE ALL ON TABLE jpp_plans FROM anon, authenticated;
REVOKE ALL ON FUNCTION jpp_next_sequence() FROM anon, authenticated;
