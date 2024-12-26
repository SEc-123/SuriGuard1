// Update the events table schema to use English
await db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    src_ip TEXT NOT NULL,
    dst_ip TEXT NOT NULL,
    protocol TEXT NOT NULL,
    rule_id INTEGER NOT NULL,
    severity INTEGER NOT NULL,
    current_stage TEXT DEFAULT 'Pending',
    handler TEXT,
    last_update DATETIME NOT NULL,
    
    confirm_status TEXT,
    confirm_handler TEXT,
    confirm_result TEXT,
    confirm_reason TEXT,
    confirm_time DATETIME,
    
    investigation_status TEXT,
    investigation_handler TEXT,
    investigation_result TEXT,
    investigation_reason TEXT,
    investigation_time DATETIME,
    
    completion_result TEXT,
    completion_reason TEXT,
    completion_time DATETIME
  );

  CREATE INDEX IF NOT EXISTS idx_events_start_time ON events(start_time);
  CREATE INDEX IF NOT EXISTS idx_events_current_stage ON events(current_stage);
  CREATE INDEX IF NOT EXISTS idx_events_severity ON events(severity);
`);