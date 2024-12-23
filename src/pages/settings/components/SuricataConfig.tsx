import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, AlertCircle } from 'lucide-react';
import { getSuricataConfig, updateSuricataConfig, restartSuricata } from '../../../services/suricataService';

export default function SuricataConfig() {
  const [configPath, setConfigPath] = useState('');
  const [configContent, setConfigContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setIsLoading(true);
      const { path, content } = await getSuricataConfig();
      setConfigPath(path);
      setConfigContent(content);
      setError('');
    } catch (err) {
      setError('Failed to load Suricata configuration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updateSuricataConfig(configContent);
      setSuccessMessage('Configuration saved successfully');
      setError('');
    } catch (err) {
      setError('Failed to save configuration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = async () => {
    try {
      setIsLoading(true);
      const result = await restartSuricata();
      if (result.success) {
        setSuccessMessage('Suricata restarted successfully');
      } else {
        setError(`Failed to restart Suricata: ${result.error}`);
      }
    } catch (err) {
      setError('Failed to restart Suricata');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Suricata Configuration</h2>
      
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

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Configuration File Path
        </label>
        <input
          type="text"
          value={configPath}
          readOnly
          className="w-full px-3 py-2 border rounded-md bg-gray-50"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Configuration Content
        </label>
        <textarea
          value={configContent}
          onChange={(e) => setConfigContent(e.target.value)}
          className="w-full h-96 px-3 py-2 border rounded-md font-mono text-sm"
          spellCheck={false}
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <Save size={20} className="mr-2" />
          Save Changes
        </button>
        <button
          onClick={handleRestart}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          <RefreshCw size={20} className="mr-2" />
          Restart Suricata
        </button>
      </div>
    </div>
  );
}