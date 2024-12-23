import { BaseService } from './BaseService';
import { Event, EventHistory } from '../types/event';

export class EventService extends BaseService {
  async getEvents(filters: Partial<Event> = {}): Promise<Event[]> {
    const [query, params] = this.queryBuilder
      .select(['*'])
      .from('events')
      .where(filters)
      .build();
    
    return this.executeQuery<Event>(query, params);
  }

  async getEventHistory(eventId: number): Promise<EventHistory[]> {
    const [query, params] = this.queryBuilder
      .select(['*'])
      .from('event_history')
      .where({ event_id: eventId })
      .build();

    return this.executeQuery<EventHistory>(query, params);
  }

  async updateEventPhase(
    eventId: number,
    phase: string,
    status: string,
    data: any,
    userId: string
  ): Promise<void> {
    await this.executeTransaction(async (connection) => {
      // Update event status
      await connection.execute(
        'UPDATE events SET current_phase = ?, current_status = ? WHERE id = ?',
        [phase, status, eventId]
      );

      // Add history record
      await connection.execute(
        `INSERT INTO event_history (
          event_id, phase, status, action, result, reason, user
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [eventId, phase, status, data.action, data.result, data.reason, userId]
      );
    });
  }

  async createEventFromAlert(alertId: string, userId: string): Promise<number> {
    return this.executeTransaction(async (connection) => {
      // Get alert details
      const [alerts] = await connection.execute(
        'SELECT * FROM alert_logs WHERE id = ?',
        [alertId]
      );
      const alert = alerts[0];

      if (!alert) throw new Error('Alert not found');

      // Create event
      const [result] = await connection.execute(
        `INSERT INTO events (
          alert_id, rule_id, src_ip, dest_ip, severity,
          current_phase, current_status
        ) VALUES (?, ?, ?, ?, ?, '未处理', '待处理')`,
        [
          alert.id,
          alert.alert_signature_id,
          alert.src_ip,
          alert.dest_ip,
          alert.alert_severity
        ]
      );

      const eventId = result.insertId;

      // Add initial history record
      await connection.execute(
        `INSERT INTO event_history (
          event_id, phase, status, action, user
        ) VALUES (?, '未处理', '待处理', '创建事件', ?)`,
        [eventId, userId]
      );

      return eventId;
    });
  }
}