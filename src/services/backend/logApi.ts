import { getDb } from './database';

interface QueryParams {
  type: string;
  page: number;
  limit: number;
  filters: Record<string, any>;
}

export async function queryLogs({ type, page, limit, filters }: QueryParams) {
  const db = await getDb();
  const offset = (page - 1) * limit;
  
  let table = '';
  let whereClause = '';
  const params: any[] = [];

  switch (type) {
    case 'alert':
      table = 'alerts';
      if (filters.severity) {
        whereClause += ' AND severity = ?';
        params.push(filters.severity);
      }
      break;
    case 'dns':
      table = 'dns_logs';
      if (filters.type) {
        whereClause += ' AND type = ?';
        params.push(filters.type);
      }
      break;
    // 其他类型的处理...
  }

  if (filters.search) {
    whereClause += ` AND (src_ip LIKE ? OR dest_ip LIKE ?)`;
    params.push(`%${filters.search}%`, `%${filters.search}%`);
  }

  const query = `
    SELECT * FROM ${table}
    WHERE 1=1 ${whereClause}
    ORDER BY timestamp DESC
    LIMIT ? OFFSET ?
  `;

  const countQuery = `
    SELECT COUNT(*) as total FROM ${table}
    WHERE 1=1 ${whereClause}
  `;

  const [rows, countResult] = await Promise.all([
    db.all(query, [...params, limit, offset]),
    db.get(countQuery, params)
  ]);

  return {
    data: rows,
    total: countResult.total,
    page,
    limit
  };
}

export async function exportLogs({ type, filters }: Omit<QueryParams, 'page' | 'limit'>) {
  const db = await getDb();
  
  let table = '';
  let whereClause = '';
  const params: any[] = [];

  // 类似于 queryLogs 的查询构建...

  const query = `
    SELECT * FROM ${table}
    WHERE 1=1 ${whereClause}
    ORDER BY timestamp DESC
  `;

  const rows = await db.all(query, params);
  return rows;
}

export async function getLogStats() {
  const db = await getDb();
  
  const stats = await Promise.all([
    db.get('SELECT COUNT(*) as count FROM alerts'),
    db.get('SELECT COUNT(*) as count FROM dns_logs'),
    db.get('SELECT COUNT(*) as count FROM http_logs'),
    db.get('SELECT COUNT(*) as count FROM tls_logs'),
    db.get('SELECT COUNT(*) as count FROM file_logs')
  ]);

  return {
    alerts: stats[0].count,
    dns: stats[1].count,
    http: stats[2].count,
    tls: stats[3].count,
    files: stats[4].count
  };
}