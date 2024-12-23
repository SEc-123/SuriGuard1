import mysql from 'mysql2/promise';
import * as fs from 'fs';
import { readYAMLConfig } from '../config/core.config';
import { getDatabaseConfig } from './databaseService';

let connection: mysql.Connection | null = null;
let watcher: fs.FSWatcher | null = null;
let lastPosition = 0;

interface LogEvent {
  timestamp: string;
  event_type: string;
  [key: string]: any;
}

// Initialize MySQL connection
export const initializeDatabase = async () => {
  try {
    const dbConfig = await getDatabaseConfig();
    connection = await mysql.createConnection({
      host: dbConfig.host,
      port: parseInt(dbConfig.port),
      user: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database
    });
    console.log('MySQL connection established');
  } catch (error) {
    console.error('Failed to connect to MySQL:', error);
    throw error;
  }
};

export const startLogWatcher = async () => {
  try {
    if (!connection) {
      await initializeDatabase();
    }

    const config = readYAMLConfig();
    const evePath = config['outputs']['eve-log']['filename'] || '/var/log/suricata/eve.json';

    // Get initial file size
    const stats = fs.statSync(evePath);
    lastPosition = stats.size;

    // Watch for changes
    watcher = fs.watch(evePath, async (eventType) => {
      if (eventType === 'change') {
        await readNewLogs(evePath);
      }
    });

    console.log('Log watcher started');
  } catch (error) {
    console.error('Failed to start log watcher:', error);
  }
};

const readNewLogs = async (filePath: string) => {
  try {
    const stats = fs.statSync(filePath);
    const newSize = stats.size;

    if (newSize < lastPosition) {
      // File was truncated, reset position
      lastPosition = 0;
    }

    if (newSize > lastPosition) {
      // Read only new content
      const buffer = Buffer.alloc(newSize - lastPosition);
      const fd = fs.openSync(filePath, 'r');
      fs.readSync(fd, buffer, 0, buffer.length, lastPosition);
      fs.closeSync(fd);

      const newContent = buffer.toString();
      const lines = newContent.split('\n').filter(line => line.trim());

      for (const line of lines) {
        try {
          const logEntry: LogEvent = JSON.parse(line);
          await processLogEntry(logEntry);
        } catch (e) {
          console.error('Failed to parse log entry:', e);
        }
      }

      lastPosition = newSize;
    }
  } catch (error) {
    console.error('Error reading new logs:', error);
  }
};

const processLogEntry = async (logEntry: LogEvent) => {
  if (!connection) return;

  try {
    switch (logEntry.event_type) {
      case 'alert':
        await connection.execute(
          'INSERT INTO alert_logs SET ?',
          {
            timestamp: new Date(logEntry.timestamp),
            flow_id: logEntry.flow_id,
            event_type: logEntry.event_type,
            src_ip: logEntry.src_ip,
            src_port: logEntry.src_port,
            dest_ip: logEntry.dest_ip,
            dest_port: logEntry.dest_port,
            proto: logEntry.proto,
            alert_action: logEntry.alert?.action,
            alert_gid: logEntry.alert?.gid,
            alert_signature_id: logEntry.alert?.signature_id,
            alert_rev: logEntry.alert?.rev,
            alert_signature: logEntry.alert?.signature,
            alert_category: logEntry.alert?.category,
            alert_severity: logEntry.alert?.severity
          }
        );
        break;

      case 'dns':
        await connection.execute(
          'INSERT INTO dns_logs SET ?',
          {
            timestamp: new Date(logEntry.timestamp),
            flow_id: logEntry.flow_id,
            event_type: logEntry.event_type,
            src_ip: logEntry.src_ip,
            dest_ip: logEntry.dest_ip,
            proto: logEntry.proto,
            dns_type: logEntry.dns?.type,
            dns_id: logEntry.dns?.id,
            dns_rrname: logEntry.dns?.rrname,
            dns_rrtype: logEntry.dns?.rrtype,
            dns_rcode: logEntry.dns?.rcode
          }
        );
        break;

      case 'http':
        await connection.execute(
          'INSERT INTO http_logs SET ?',
          {
            timestamp: new Date(logEntry.timestamp),
            flow_id: logEntry.flow_id,
            event_type: logEntry.event_type,
            src_ip: logEntry.src_ip,
            dest_ip: logEntry.dest_ip,
            proto: logEntry.proto,
            hostname: logEntry.http?.hostname,
            url: logEntry.http?.url,
            http_user_agent: logEntry.http?.http_user_agent,
            http_method: logEntry.http?.http_method,
            protocol: logEntry.http?.protocol,
            status: logEntry.http?.status,
            length: logEntry.http?.length
          }
        );
        break;

      case 'tls':
        await connection.execute(
          'INSERT INTO tls_logs SET ?',
          {
            timestamp: new Date(logEntry.timestamp),
            flow_id: logEntry.flow_id,
            event_type: logEntry.event_type,
            src_ip: logEntry.src_ip,
            dest_ip: logEntry.dest_ip,
            proto: logEntry.proto,
            tls_subject: logEntry.tls?.subject,
            tls_issuerdn: logEntry.tls?.issuerdn,
            tls_version: logEntry.tls?.version,
            tls_fingerprint: logEntry.tls?.fingerprint
          }
        );
        break;

      case 'files':
        await connection.execute(
          'INSERT INTO file_logs SET ?',
          {
            timestamp: new Date(logEntry.timestamp),
            flow_id: logEntry.flow_id,
            event_type: logEntry.event_type,
            src_ip: logEntry.src_ip,
            dest_ip: logEntry.dest_ip,
            proto: logEntry.proto,
            filename: logEntry.fileinfo?.filename,
            file_sid: logEntry.fileinfo?.sid,
            file_size: logEntry.fileinfo?.size,
            file_md5: logEntry.fileinfo?.md5,
            file_sha256: logEntry.fileinfo?.sha256,
            file_stored: logEntry.fileinfo?.stored
          }
        );
        break;
    }
  } catch (error) {
    console.error('Failed to process log entry:', error);
  }
};

// Stats and export functions remain the same
export const getLogStats = async () => {
  if (!connection) await initializeDatabase();

  const stats = {
    alerts: 0,
    dns: 0,
    http: 0,
    tls: 0,
    files: 0
  };

  try {
    const [alertCount] = await connection!.execute('SELECT COUNT(*) as count FROM alert_logs');
    const [dnsCount] = await connection!.execute('SELECT COUNT(*) as count FROM dns_logs');
    const [httpCount] = await connection!.execute('SELECT COUNT(*) as count FROM http_logs');
    const [tlsCount] = await connection!.execute('SELECT COUNT(*) as count FROM tls_logs');
    const [fileCount] = await connection!.execute('SELECT COUNT(*) as count FROM file_logs');

    stats.alerts = (alertCount as any)[0].count;
    stats.dns = (dnsCount as any)[0].count;
    stats.http = (httpCount as any)[0].count;
    stats.tls = (tlsCount as any)[0].count;
    stats.files = (fileCount as any)[0].count;
  } catch (error) {
    console.error('Failed to get log stats:', error);
  }

  return stats;
};

export const getLogs = async (type: string, filters: any = {}) => {
  if (!connection) await initializeDatabase();

  let query = `SELECT * FROM ${type}_logs WHERE 1=1`;
  const values: any[] = [];

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      query += ` AND ${key} = ?`;
      values.push(value);
    }
  });

  query += ' ORDER BY timestamp DESC';

  try {
    const [rows] = await connection!.execute(query, values);
    return rows;
  } catch (error) {
    console.error('Failed to get logs:', error);
    throw error;
  }
};

export const exportLogs = async (type: string, filters: any = {}) => {
  const logs = await getLogs(type, filters);
  return convertToCSV(logs);
};

const convertToCSV = (data: any[]) => {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => 
    headers.map(header => JSON.stringify(obj[header])).join(',')
  );
  
  return [headers.join(','), ...rows].join('\n');
};