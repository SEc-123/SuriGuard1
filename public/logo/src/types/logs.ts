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

export interface FilterCondition {
  field: string;
  operator: string;
  value: string | number;
}

export interface LogFilters {
  search?: string;
  type?: string;
  severity?: string;
  advanced?: FilterCondition[];
}

export interface AlertEvent extends LogEvent {
  signature_id: number;
  signature: string;
  category: string;
  severity: number;
}

export interface DnsEvent extends LogEvent {
  query: string;
  type: string;
  answer: string[];
}

export interface HttpEvent extends LogEvent {
  method: string;
  url: string;
  status_code: number;
  user_agent: string;
}

export interface TlsEvent extends LogEvent {
  version: string;
  subject: string;
  issuer: string;
  fingerprint: string;
}

export interface FileEvent extends LogEvent {
  filename: string;
  size: number;
  type: string;
  md5: string;
  sha1: string;
}