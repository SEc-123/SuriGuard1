-- Saved filters table
CREATE TABLE IF NOT EXISTS saved_filters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  log_type TEXT NOT NULL,
  filter_conditions JSON NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Visualizations table
CREATE TABLE IF NOT EXISTS visualizations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  filter_id INTEGER NOT NULL,
  chart_type TEXT NOT NULL,
  chart_config JSON NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (filter_id) REFERENCES saved_filters(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_saved_filters_log_type ON saved_filters(log_type);
CREATE INDEX idx_visualizations_filter_id ON visualizations(filter_id);