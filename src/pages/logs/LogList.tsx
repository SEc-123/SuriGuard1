import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Save } from 'lucide-react';
import { getLogsByType, exportLogs } from '../../services/logService';
import LogFilterForm from '../../components/logs/LogFilterForm';
import PresetFilterList from '../../components/logs/PresetFilterList';
import SaveFilterModal from '../../components/logs/SaveFilterModal';
import { LogFilters } from '../../types/logs';

export default function LogList() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [filters, setFilters] = useState<LogFilters>({
    search: '',
    type: 'all',
    severity: 'all',
    advanced: []
  });

  useEffect(() => {
    loadLogs();
  }, [filters]);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const response = await getLogsByType('all', filters);
      setLogs(response.data || []);
    } catch (error) {
      console.error('Failed to load logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      await exportLogs('all', filters);
    } catch (error) {
      console.error('Failed to export logs:', error);
    }
  };

  const handleFilterChange = (newFilters: LogFilters) => {
    setFilters(newFilters);
  };

  const handleApplyPresetFilter = (presetFilter: any) => {
    setFilters({
      ...filters,
      advanced: presetFilter.conditions
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search logs..."
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border rounded-lg flex items-center hover:bg-gray-50"
              >
                <Filter size={18} className="mr-2" />
                Filters
              </button>
              
              <button
                onClick={() => setShowSaveModal(true)}
                className="px-4 py-2 border rounded-lg flex items-center hover:bg-gray-50"
              >
                <Save size={18} className="mr-2" />
                Save Current
              </button>
              
              <button
                onClick={handleExport}
                className="px-4 py-2 border rounded-lg flex items-center hover:bg-gray-50"
              >
                <Download size={18} className="mr-2" />
                Export
              </button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 p-4 border rounded-lg">
              <LogFilterForm 
                filters={filters} 
                onChange={handleFilterChange} 
              />
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-4 gap-6 p-6">
          <div className="col-span-1">
            <PresetFilterList onApplyFilter={handleApplyPresetFilter} />
          </div>
          
          <div className="col-span-3">
            {loading ? (
              <div className="text-center py-8">Loading logs...</div>
            ) : logs.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source IP</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination IP</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Protocol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logs.map((log, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{log.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{log.src_ip}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{log.dest_ip}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{log.protocol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{log.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.severity && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            log.severity === 'high' ? 'bg-red-100 text-red-800' :
                            log.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {log.severity}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No logs found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showSaveModal && (
        <SaveFilterModal
          currentFilters={filters}
          onClose={() => setShowSaveModal(false)}
          onSave={() => {
            setShowSaveModal(false);
            // Refresh preset filters list
          }}
        />
      )}
    </div>
  );
}