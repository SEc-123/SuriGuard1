export type UserRole = 'super_admin' | 'admin' | 'user';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  id: string;
  userId: string;
  loginTime: string;
  logoutTime: string | null;
  ipAddress: string;
  userAgent: string;
}

export const ROLE_PERMISSIONS = {
  super_admin: ['all'],
  admin: [
    'dashboard',
    'monitor',
    'logs',
    'events',
    'rules'
  ],
  user: [
    'dashboard',
    'monitor',
    'logs',
    'events'
  ]
} as const;

// Default admin account for testing
export const DEFAULT_ADMIN = {
  id: '1',
  username: 'admin',
  password: 'admin123', // In production, this should be hashed
  email: 'admin@suriguard.com',
  role: 'super_admin' as UserRole,
  status: 'active' as const,
  lastLogin: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};