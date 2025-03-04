import { Database } from 'sqlite3';
import { User, UserRole, UserSession, DEFAULT_ADMIN } from '../../types/user';
import { hash, compare } from 'bcrypt';

const SALT_ROUNDS = 10;

export class UserService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async createUser(userData: Partial<User>, password: string): Promise<User> {
    const passwordHash = await hash(password, SALT_ROUNDS);
    
    const result = await this.db.run(`
      INSERT INTO users (
        username, email, password_hash, role, status
      ) VALUES (?, ?, ?, ?, ?)
    `, [
      userData.username,
      userData.email,
      passwordHash,
      userData.role || 'user',
      userData.status || 'active'
    ]);

    return this.getUserById(result.lastID);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    values.push(id);

    await this.db.run(`
      UPDATE users 
      SET ${updates.join(', ')}, updated_at = datetime('now')
      WHERE id = ?
    `, values);

    return this.getUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.db.run('DELETE FROM users WHERE id = ?', [id]);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.db.get('SELECT * FROM users WHERE id = ?', [id]);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.db.get('SELECT * FROM users WHERE username = ?', [username]);
  }

  async validatePassword(username: string, password: string): Promise<boolean> {
    const user = await this.getUserByUsername(username);
    if (!user) return false;
    return compare(password, user.password_hash);
  }

  async recordLogin(userId: string, ipAddress: string, userAgent: string): Promise<void> {
    await this.db.run(`
      INSERT INTO user_sessions (user_id, ip_address, user_agent)
      VALUES (?, ?, ?)
    `, [userId, ipAddress, userAgent]);

    await this.db.run(`
      UPDATE users 
      SET last_login = datetime('now')
      WHERE id = ?
    `, [userId]);
  }

  async recordLogout(sessionId: string): Promise<void> {
    await this.db.run(`
      UPDATE user_sessions 
      SET logout_time = datetime('now')
      WHERE id = ?
    `, [sessionId]);
  }

  async getUserSessions(userId: string): Promise<UserSession[]> {
    return this.db.all(`
      SELECT * FROM user_sessions 
      WHERE user_id = ? 
      ORDER BY login_time DESC
    `, [userId]);
  }

  async getUsers(filters: Record<string, any> = {}): Promise<User[]> {
    const conditions: string[] = [];
    const values: any[] = [];

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        conditions.push(`${key} = ?`);
        values.push(value);
      }
    });

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    return this.db.all(`
      SELECT * FROM users ${whereClause}
      ORDER BY created_at DESC
    `, values);
  }
}