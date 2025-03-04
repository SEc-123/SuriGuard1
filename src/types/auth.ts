export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}