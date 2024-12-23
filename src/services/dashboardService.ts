import { getLogStats } from './logService';
import { getRuleStats } from './rulesService';
import mysql from 'mysql2/promise';
import { getDatabaseConfig } from './databaseService';

export interface AlertTrend {
  date: string;
  alerts: number;
}

export interface RuleCategory {
  name: string;
  value: number;
}

let connection: mysql.Connection | null = null;

const initConnection = async () => {
  if (!connection) {
    const dbConfig = await getDatabaseConfig();
    connection = await mysql.createConnection({
      host: dbConfig.host,
      port: parseInt(dbConfig.port),
      user: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database
    });
  }
  return connection;
};

export const getAlertTrends = async (days: number = 7): Promise<AlertTrend[]> => {
  try {
    const conn = await initConnection();
    const [rows] = await conn.execute(`
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) as alerts
      FROM alert_logs
      WHERE timestamp >= DATE_SUB(CURRENT_DATE, INTERVAL ? DAY)
      GROUP BY DATE(timestamp)
      ORDER BY date ASC
    `, [days]);
    
    return rows as AlertTrend[];
  } catch (error) {
    console.error('Failed to get alert trends:', error);
    throw error;
  }
};

export const getRuleCategories = async (): Promise<RuleCategory[]> => {
  try {
    const conn = await initConnection();
    const [rows] = await conn.execute(`
      SELECT 
        alert_category as name,
        COUNT(*) as value
      FROM alert_logs
      WHERE alert_category IS NOT NULL
      GROUP BY alert_category
      ORDER BY value DESC
      LIMIT 4
    `);
    
    return rows as RuleCategory[];
  } catch (error) {
    console.error('Failed to get rule categories:', error);
    throw error;
  }
};