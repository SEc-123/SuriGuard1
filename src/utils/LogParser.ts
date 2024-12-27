import { LogEvent } from '../types/log';

export class LogParser {
  parse(rawLog: string): LogEvent | null {
    try {
      const log = JSON.parse(rawLog);
      
      // Basic validation
      if (!log.timestamp || !log.event_type) {
        return null;
      }

      // Convert timestamp to Date
      log.timestamp = new Date(log.timestamp);

      // Type-specific parsing
      switch (log.event_type) {
        case 'alert':
          return this.parseAlertLog(log);
        case 'dns':
          return this.parseDNSLog(log);
        case 'http':
          return this.parseHTTPLog(log);
        case 'tls':
          return this.parseTLSLog(log);
        case 'files':
          return this.parseFileLog(log);
        default:
          return null;
      }
    } catch (error) {
      console.error('Failed to parse log:', error);
      return null;
    }
  }

  private parseAlertLog(log: any): LogEvent {
    return {
      timestamp: log.timestamp,
      event_type: 'alert',
      flow_id: log.flow_id,
      src_ip: log.src_ip,
      src_port: log.src_port,
      dest_ip: log.dest_ip,
      dest_port: log.dest_port,
      proto: log.proto,
      alert_action: log.alert?.action,
      alert_gid: log.alert?.gid,
      alert_signature_id: log.alert?.signature_id,
      alert_rev: log.alert?.rev,
      alert_signature: log.alert?.signature,
      alert_category: log.alert?.category,
      alert_severity: log.alert?.severity
    };
  }

  private parseDNSLog(log: any): LogEvent {
    return {
      timestamp: log.timestamp,
      event_type: 'dns',
      flow_id: log.flow_id,
      src_ip: log.src_ip,
      dest_ip: log.dest_ip,
      proto: log.proto,
      dns_type: log.dns?.type,
      dns_id: log.dns?.id,
      dns_rrname: log.dns?.rrname,
      dns_rrtype: log.dns?.rrtype,
      dns_rcode: log.dns?.rcode
    };
  }

  private parseHTTPLog(log: any): LogEvent {
    return {
      timestamp: log.timestamp,
      event_type: 'http',
      flow_id: log.flow_id,
      src_ip: log.src_ip,
      dest_ip: log.dest_ip,
      proto: log.proto,
      hostname: log.http?.hostname,
      url: log.http?.url,
      http_user_agent: log.http?.http_user_agent,
      http_method: log.http?.http_method,
      protocol: log.http?.protocol,
      status: log.http?.status,
      length: log.http?.length
    };
  }

  private parseTLSLog(log: any): LogEvent {
    return {
      timestamp: log.timestamp,
      event_type: 'tls',
      flow_id: log.flow_id,
      src_ip: log.src_ip,
      dest_ip: log.dest_ip,
      proto: log.proto,
      tls_subject: log.tls?.subject,
      tls_issuerdn: log.tls?.issuerdn,
      tls_version: log.tls?.version,
      tls_fingerprint: log.tls?.fingerprint
    };
  }

  private parseFileLog(log: any): LogEvent {
    return {
      timestamp: log.timestamp,
      event_type: 'files',
      flow_id: log.flow_id,
      src_ip: log.src_ip,
      dest_ip: log.dest_ip,
      proto: log.proto,
      filename: log.fileinfo?.filename,
      file_sid: log.fileinfo?.sid,
      file_size: log.fileinfo?.size,
      file_md5: log.fileinfo?.md5,
      file_sha256: log.fileinfo?.sha256,
      file_stored: log.fileinfo?.stored
    };
  }
}