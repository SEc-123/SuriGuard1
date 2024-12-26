import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, History } from 'lucide-react';
import { User } from '../../types/user';
import { getUsers, createUser, updateUser, deleteUser, getUserSessions } from '../../services/userService';
import UserForm from './components/UserForm';
import UserSessionsTable from './components/UserSessionsTable';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const handleCreateUser = async (userData: Partial<User> & { password?: string }) => {
    try {
      await createUser(userData);
      await loadUsers();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error; // Re-throw to be handled by the form
    }
  };

  const handleUpdateUser = async (userData: Partial<User>) => {
    if (!selectedUser) return;
    try {
      await updateUser(selectedUser.id, userData);
      await loadUsers();
      setShowForm(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error; // Re-throw to be handled by the form
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(user.id);
        await loadUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleViewSessions = async (user: User) => {
    try {
      const userSessions = await getUserSessions(user.id);
      setSessions(userSessions);
      setShowSessions(true);
    } catch (error) {
      console.error('Failed to load user sessions:', error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedUser(null);
    setFormMode('create');
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => {
            setFormMode('create');
            setSelectedUser(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add User
        </button>
      </div>

      {/* Rest of the component remains the same until the modal section */}

      {showForm && (
        <UserForm
          mode={formMode}
          initialData={selectedUser || undefined}
          onSubmit={formMode === 'create' ? handleCreateUser : handleUpdateUser}
          onCancel={handleCloseForm}
        />
      )}

      {showSessions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">User Sessions</h2>
              <button
                onClick={() => setShowSessions(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <UserSessionsTable sessions={sessions} />
          </div>
        </div>
      )}
    </div>
  );
}