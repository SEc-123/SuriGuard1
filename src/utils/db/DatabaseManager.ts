import mysql from 'mysql2/promise';
import { getDatabaseConfig } from '../../services/databaseService';

export class DatabaseManager {
  private static instance: DatabaseManager;
  private pool: mysql.Pool;

  private constructor() {
    this.initializePool();
  }

  private async initializePool() {
    const dbConfig = await getDatabaseConfig();
    this.pool = mysql.createPool({
      host: dbConfig.host,
      port: parseInt(dbConfig.port),
      user: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  static getInstance() {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  async getConnection() {
    return this.pool.getConnection();
  }
}