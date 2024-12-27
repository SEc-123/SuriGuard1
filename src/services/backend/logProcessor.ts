import { getDb } from './database';

export async function processLogEvent(event: any) {
  const db = await getDb();
  const rawLog = JSON.stringify(event);

  switch (event.event_type) {
    case 'alert':
      await db.run(`
        INSERT INTO alerts (
          timestamp, flow_id, src_ip, src_port, dest_ip, dest_port, proto,
          action, gid, signature_id, rev, signature, category, severity,
          raw_log
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        event.timestamp,
        event.flow_id,
        event.src_ip,
        event.src_port,
        event.dest_ip,
        event.dest_port,
        event.proto,
        event.alert.action,
        event.alert.gid,
        event.alert.signature_id,
        event.alert.rev,
        event.alert.signature,
        event.alert.category,
        event.alert.severity,
        rawLog
      ]);
      break;

    case 'dns':
      await db.run(`
        INSERT INTO dns_logs (
          timestamp, flow_id, src_ip, dest_ip, proto,
          type, query_id, rrname, rrtype, rcode,
          raw_log
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        event.timestamp,
        event.flow_id,
        event.src_ip,
        event.dest_ip,
        event.proto,
        event.dns.type,
        event.dns.id,
        event.dns.rrname,
        event.dns.rrtype,
        event.dns.rcode,
        rawLog
      ]);
      break;

    case 'http':
      await db.run(`
        INSERT INTO http_logs (
          timestamp, flow_id, src_ip, dest_ip, proto,
          hostname, url, http_user_agent, http_method, protocol,
          status, length, raw_log
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        event.timestamp,
        event.flow_id,
        event.src_ip,
        event.dest_ip,
        event.proto,
        event.http.hostname,
        event.http.url,
        event.http.http_user_agent,
        event.http.http_method,
        event.http.protocol,
        event.http.status,
        event.http.length,
        rawLog
      ]);
      break;

    case 'tls':
      await db.run(`
        INSERT INTO tls_logs (
          timestamp, flow_id, src_ip, dest_ip, proto,
          version, subject, issuer, serial, fingerprint,
          sni, cipher, raw_log
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        event.timestamp,
        event.flow_id,
        event.src_ip,
        event.dest_ip,
        event.proto,
        event.tls.version,
        event.tls.subject,
        event.tls.issuer,
        event.tls.serial,
        event.tls.fingerprint,
        event.tls.sni,
        event.tls.cipher,
        rawLog
      ]);
      break;

    case 'fileinfo':
      await db.run(`
        INSERT INTO file_logs (
          timestamp, flow_id, src_ip, dest_ip, proto,
          filename, magic, size, md5, sha1,
          sha256, mime_type, raw_log
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        event.timestamp,
        event.flow_id,
        event.src_ip,
        event.dest_ip,
        event.proto,
        event.fileinfo.filename,
        event.fileinfo.magic,
        event.fileinfo.size,
        event.fileinfo.md5,
        event.fileinfo.sha1,
        event.fileinfo.sha256,
        event.fileinfo.mime_type,
        rawLog
      ]);
      break;
  }
}