export interface Event {
  id: number;
  alert_id: string;
  rule_id: number;
  src_ip: string;
  dest_ip: string;
  severity: number;
  current_phase: string;
  current_status: string;
  created_at: Date;
  updated_at: Date;
}

export interface EventHistory {
  id: number;
  event_id: number;
  phase: string;
  status: string;
  action: string;
  result?: string;
  reason?: string;
  user: string;
  created_at: Date;
}