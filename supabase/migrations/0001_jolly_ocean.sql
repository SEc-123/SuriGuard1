/*
  # Create Users and Sessions Tables

  1. New Tables
    - users
      - Basic user information and authentication
      - Role-based access control
      - Account status tracking
    - user_sessions
      - Login/logout history
      - IP address and user agent tracking
  
  2. Security
    - Password hashing
    - Session tracking
    - Activity logging
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'user')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  last_login TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- User sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  login_time TEXT NOT NULL DEFAULT (datetime('now')),
  logout_time TEXT,
  ip_address TEXT NOT NULL,
  user_agent TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_login_time ON user_sessions(login_time);

-- Insert default admin user
INSERT OR IGNORE INTO users (
  id, username, email, password_hash, role, status, created_at, updated_at
) VALUES (
  '1',
  'admin',
  'admin@suriguard.com',
  '$2b$10$default_hash_would_be_here',
  'super_admin',
  'active',
  datetime('now'),
  datetime('now')
);