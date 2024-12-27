/*
  # Create Analytics Tables

  1. New Tables
    - `saved_filters`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `log_type` (text)
      - `filter_conditions` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `visualizations`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `filter_id` (uuid, references saved_filters)
      - `chart_type` (text)
      - `chart_config` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create saved_filters table
CREATE TABLE IF NOT EXISTS saved_filters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  log_type text NOT NULL,
  filter_conditions jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create visualizations table
CREATE TABLE IF NOT EXISTS visualizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  filter_id uuid REFERENCES saved_filters(id) ON DELETE CASCADE,
  chart_type text NOT NULL,
  chart_config jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE saved_filters ENABLE ROW LEVEL SECURITY;
ALTER TABLE visualizations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read saved filters"
  ON saved_filters
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create saved filters"
  ON saved_filters
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read visualizations"
  ON visualizations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage visualizations"
  ON visualizations
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_saved_filters_log_type ON saved_filters(log_type);
CREATE INDEX idx_visualizations_filter_id ON visualizations(filter_id);