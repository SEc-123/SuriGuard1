import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'data', 'suriguard.db');

async function init() {
  try {
    console.log('Initializing Suriguard database...');
    
    const db = new Database(dbPath);

    // Create preset_filters table
    db.exec(`
      CREATE TABLE IF NOT EXISTS preset_filters (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        conditions TEXT NOT NULL,
        is_system INTEGER DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);

    // Create preset_analytics table
    db.exec(`
      CREATE TABLE IF NOT EXISTS preset_analytics (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        filter_id TEXT NOT NULL,
        chart_type TEXT NOT NULL,
        aggregation TEXT NOT NULL,
        group_by TEXT NOT NULL,
        time_range TEXT,
        FOREIGN KEY (filter_id) REFERENCES preset_filters(id)
      )
    `);

    // Create index for preset_analytics
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_analytics_filter_id 
      ON preset_analytics(filter_id)
    `);

    // Insert default system filter
    const filterStmt = db.prepare(`
      INSERT OR IGNORE INTO preset_filters (
        id, name, description, conditions, is_system, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    filterStmt.run(
      'critical-alerts',
      'Critical Alerts',
      'Show all critical severity alerts',
      JSON.stringify([{ field: 'severity', operator: 'equals', value: 'critical' }]),
      1,
      new Date().toISOString(),
      new Date().toISOString()
    );

    // Insert default analytics
    const analyticsStmt = db.prepare(`
      INSERT OR IGNORE INTO preset_analytics (
        id, name, filter_id, chart_type, aggregation, group_by, time_range
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    analyticsStmt.run(
      'alerts-by-severity',
      'Alerts by Severity',
      'critical-alerts',
      'pie',
      'count',
      'severity',
      '24h'
    );

    console.log('Database initialized successfully!');
    console.log('Tables created: preset_filters, preset_analytics');
    
    db.close();
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

init();