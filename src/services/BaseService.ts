import { DatabaseManager } from '../utils/db/DatabaseManager';
import { QueryBuilder } from '../utils/db/QueryBuilder';

export abstract class BaseService {
  protected db: DatabaseManager;
  protected queryBuilder: QueryBuilder;

  constructor() {
    this.db = DatabaseManager.getInstance();
    this.queryBuilder = new QueryBuilder();
  }

  protected async executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
    const connection = await this.db.getConnection();
    try {
      const [rows] = await connection.execute(query, params);
      return rows as T[];
    } finally {
      connection.release();
    }
  }

  protected async executeTransaction<T>(
    callback: (connection: any) => Promise<T>
  ): Promise<T> {
    const connection = await this.db.getConnection();
    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}