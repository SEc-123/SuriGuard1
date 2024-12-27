import { User } from '../types/auth';

// Mock users database
const USERS = {
  admin: {
    id: '1',
    username: 'admin',
    password: 'admin',
    role: 'admin' as const,
    permissions: ['all']
  },
  user: {
    id: '2',
    username: 'user',
    password: 'user',
    role: 'user' as const,
    permissions: ['dashboard', 'logs']
  }
};

export const authenticate = (username: string, password: string): User | null => {
  const user = USERS[username as keyof typeof USERS];
  if (user && user.password === password) {
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('isAuthenticated', 'true');
    return userWithoutPassword;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const hasPermission = (permission: string): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  return user.role === 'admin' || user.permissions.includes(permission);
};