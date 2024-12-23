import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { join } from 'path';
import { User } from '../types/auth';

let db: any = null;

const initDatabase = async () => {
  if (!db) {
    db = await open({
      filename: join(process.cwd(), 'data', 'users.db'),
      driver: sqlite3.Database
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        status TEXT NOT NULL,
        last_login DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS user_permissions (
        user_id TEXT NOT NULL,
        permission TEXT NOT NULL,
        PRIMARY KEY (user_id, permission),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS user_activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        action TEXT NOT NULL,
        details TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
  }
  return db;
};

// 用户活动记录
export const logUserActivity = async (userId: string, action: string, details?: string) => {
  const db = await initDatabase();
  await db.run(
    'INSERT INTO user_activities (user_id, action, details) VALUES (?, ?, ?)',
    [userId, action, details]
  );
};

export const getUserActivities = async (limit: number = 10) => {
  const db = await initDatabase();
  const activities = await db.all(`
    SELECT 
      a.id,
      u.username as user,
      a.action,
      a.created_at as time
    FROM user_activities a
    JOIN users u ON a.user_id = u.id
    ORDER BY a.created_at DESC
    LIMIT ?
  `, [limit]);
  
  return activities;
};

// 权限检查
export const checkPermission = async (userId: string, permission: string): Promise<boolean> => {
  const db = await initDatabase();
  const user = await db.get('SELECT role FROM users WHERE id = ?', [userId]);
  
  if (user?.role === 'admin') return true;
  
  const userPermission = await db.get(
    'SELECT 1 FROM user_permissions WHERE user_id = ? AND permission = ?',
    [userId, permission]
  );
  
  return !!userPermission;
};

// 现有的用户管理功能保持不变...