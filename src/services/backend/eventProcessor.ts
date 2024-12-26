import { getDb } from './database';

export async function createEventFromAlert(alert: any) {
  if (alert.severity < 1) return; // Only process critical, high, and medium alerts

  const db = await getDb();
  
  await db.run(`
    INSERT INTO events (
      start_time,
      src_ip,
      dst_ip,
      protocol,
      rule_id,
      severity,
      current_stage,
      last_update
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    alert.timestamp,
    alert.src_ip,
    alert.dst_ip,
    alert.proto,
    alert.signature_id,
    alert.severity,
    'Pending',
    new Date().toISOString()
  ]);
}