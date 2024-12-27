export type LogType = 'alert' | 'dns' | 'http' | 'tls' | 'file';

export interface LogEvent {
  id: number;
  timestamp: string;
  src_ip: string;
  dest_ip: string;
  protocol: string;
  severity?: number;
  [key: string]: any;
}