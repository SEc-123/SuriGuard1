import React, { useState, useEffect } from 'react';
import { Save, Database as DatabaseIcon, AlertCircle } from 'lucide-react';
import { getDatabaseConfig, updateDatabaseConfig, testConnection } from '../../../services/databaseService';

export default function DatabaseConfig() {
  const [config, setConfig] = useState({
    host: '',
    port: '',
    username: '',
    password: '',
    database: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setIsLoading(true);
      const dbConfig = await getDatabaseConfig();
      setConfig(dbConfig);
      setError('');
    } catch (err) {
      setError('Failed to load database configuration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updateDatabaseConfig(config);
      setSuccessMessage('Database configuration saved successfully');
      setError('');
    } catch (err) {
      setError('Failed to save database configuration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTest = async () => {
    try {
      setIsLoading(true);
      const result = await testConnection(config);
      if (result.success) {
        setSuccessMessage('Database connection successful');
      } else {
        setError(`Connection failed: ${result.error}`);
      }
    } catch (err) {
      setError('Failed to test database connection');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Database Configuration</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md flex items-center">
          <AlertCircle className="mr-2" size={20} />
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Host
          </label>
          <input
            type="text"
            value={config.host}
            onChange={(e) => setConfig({ ...config, host: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Port
          </label>
          <input
            type="text"
            value={config.port}
            onChange={(e) => setConfig({ ...config, port: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            value={config.username}
            onChange={(e) => setConfig({ ...config, username: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={config.password}
            onChange={(e) => setConfig({ ...config, password: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Database Name
          </label>
          <input
            type="text"
            value={config.database}
            onChange={(e) => setConfig({ ...config, database: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <Save size={20} className="mr-2" />
          Save Configuration
        </button>
        <button
          onClick={handleTest}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          <DatabaseIcon size={20} className="mr-2" />
          Test Connection
        </button>
      </div>
    </div>
  );
}