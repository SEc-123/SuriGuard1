export interface LogEvent {
  timestamp: Date;
  event_type: string;
  flow_id?: number;
  src_ip?: string;
  src_port?: number;
  dest_ip?: string;
  dest_port?: number;
  proto?: string;
  [key: string]: any;
}

export interface LogStats {
  alerts: number;
  dns: number;
  http: number;
  tls: number;
  files: number;
}

export interface LogFilter {
  timestamp?: Date;
  src_ip?: string;
  dest_ip?: string;
  severity?: number;
  category?: string;
  [key: string]: any;
}