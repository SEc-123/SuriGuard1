export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  permissions: string[];
  last_login?: Date;
  created_at: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface UserActivity {
  id: number;
  user: string;
  action: string;
  details?: string;
  time: Date;
}