import { User, UserRole, UserSession, DEFAULT_ADMIN } from '../types/user';

const API_BASE = '/api/users';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to create user');
    return await response.json();
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
  } catch (error) {
    console.error('Failed to update user:', error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete user');
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
};

export const getUserSessions = async (userId: string): Promise<UserSession[]> => {
  try {
    const response = await fetch(`${API_BASE}/${userId}/sessions`);
    if (!response.ok) throw new Error('Failed to fetch user sessions');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user sessions:', error);
    throw error;
  }
};