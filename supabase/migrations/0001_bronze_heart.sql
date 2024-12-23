/*
  # Create Log Management Tables

  1. New Tables
    - `alert_logs`: Stores security event alerts
    - `dns_logs`: Stores DNS request/response logs
    - `http_logs`: Stores HTTP traffic logs
    - `tls_logs`: Stores TLS session logs
    - `file_logs`: Stores file transfer logs

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Alert Logs Table
CREATE TABLE IF NOT EXISTS alert_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz NOT NULL,
  flow_id bigint,
  event_type text NOT NULL,
  src_ip inet,
  src_port integer,
  dest_ip inet,
  dest_port integer,
  proto text,
  alert_action text,
  alert_gid integer,
  alert_signature_id integer,
  alert_rev integer,
  alert_signature text,
  alert_category text,
  alert_severity integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE alert_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read alert logs"
  ON alert_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- DNS Logs Table
CREATE TABLE IF NOT EXISTS dns_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz NOT NULL,
  flow_id bigint,
  event_type text NOT NULL,
  src_ip inet,
  dest_ip inet,
  proto text,
  dns_type text,
  dns_id integer,
  dns_rrname text,
  dns_rrtype text,
  dns_rcode text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE dns_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read DNS logs"
  ON dns_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- HTTP Logs Table
CREATE TABLE IF NOT EXISTS http_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz NOT NULL,
  flow_id bigint,
  event_type text NOT NULL,
  src_ip inet,
  dest_ip inet,
  proto text,
  hostname text,
  url text,
  http_user_agent text,
  http_method text,
  protocol text,
  status integer,
  length integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE http_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read HTTP logs"
  ON http_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- TLS Logs Table
CREATE TABLE IF NOT EXISTS tls_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz NOT NULL,
  flow_id bigint,
  event_type text NOT NULL,
  src_ip inet,
  dest_ip inet,
  proto text,
  tls_subject text,
  tls_issuerdn text,
  tls_version text,
  tls_fingerprint text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tls_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read TLS logs"
  ON tls_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- File Logs Table
CREATE TABLE IF NOT EXISTS file_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz NOT NULL,
  flow_id bigint,
  event_type text NOT NULL,
  src_ip inet,
  dest_ip inet,
  proto text,
  filename text,
  file_sid integer,
  file_size bigint,
  file_md5 text,
  file_sha256 text,
  file_stored boolean,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE file_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read file logs"
  ON file_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_alert_logs_timestamp ON alert_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_dns_logs_timestamp ON dns_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_http_logs_timestamp ON http_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_tls_logs_timestamp ON tls_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_file_logs_timestamp ON file_logs(timestamp);