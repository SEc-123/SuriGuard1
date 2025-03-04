import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { LogFilters } from '../../types/logs';

interface LogFilterFormProps {
  filters: LogFilters;
  onChange: (filters: LogFilters) => void;
}

export default function LogFilterForm({ filters, onChange }: LogFilterFormProps) {
  const handleAddCondition = () => {
    const newAdvanced = [
      ...(filters.advanced || []),
      { field: '', operator: 'equals', value: '' }
    ];
    onChange({ ...filters, advanced: newAdvanced });
  };

  const handleRemoveCondition = (index: number) => {
    const newAdvanced = [...(filters.advanced || [])];
    newAdvanced.splice(index, 1);
    onChange({ ...filters, advanced: newAdvanced });
  };

  const handleConditionChange = (index: number, field: string, value: any) => {
    const newAdvanced = [...(filters.advanced || [])];
    newAdvanced[index] = { ...newAdvanced[index], [field]: value };
    onChange({ ...filters, advanced: newAdvanced });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Log Type
          </label>
          <select
            value={filters.type || 'all'}
            onChange={(e) => onChange({ ...filters, type: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="all">All Types</option>
            <option value="alert">Alert</option>
            <option value="dns">DNS</option>
            <option value="http">HTTP</option>
            <option value="tls">TLS</option>
            <option value="file">File</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Severity
          </label>
          <select
            value={filters.severity || 'all'}
            onChange={(e) => onChange({ ...filters, severity: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="all">All Severities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700">Advanced Filters</h3>
          <button
            type="button"
            onClick={handleAddCondition}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add Condition
          </button>
        </div>
        
        {filters.advanced && filters.advanced.length > 0 ? (
          <div className="space-y-2">
            {filters.advanced.map((condition, index) => (
              <div key={index} className="flex items-center space-x-2">
                <select
                  value={condition.field}
                  onChange={(e) => handleConditionChange(index, 'field', e.target.value)}
                  className="px-3 py-2 border rounded-md flex-1"
                >
                  <option value="">Select Field</option>
                  <option value="src_ip">Source IP</option>
                  <option value="dest_ip">Destination IP</option>
                  <option value="protocol">Protocol</option>
                  <option value="timestamp">Timestamp</option>
                </select>
                
                <select
                  value={condition.operator}
                  onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
                  className="px-3 py-2 border rounded-md flex-1"
                >
                  <option value="equals">Equals</option>
                  <option value="contains">Contains</option>
                  <option value="startsWith">Starts With</option>
                  <option value="endsWith">Ends With</option>
                  <option value="greaterThan">Greater Than</option>
                  <option value="lessThan">Less Than</option>
                </select>
                
                <input
                  type="text"
                  value={condition.value}
                  onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                  className="px-3 py-2 border rounded-md flex-1"
                  placeholder="Value"
                />
                
                <button
                  type="button"
                  onClick={() => handleRemoveCondition(index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 p-4 border border-dashed rounded-md text-center">
            No advanced filters. Click "Add Condition" to create one.
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onChange({ search: '', type: 'all', severity: 'all', advanced: [] })}
          className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 mr-2"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => {
            // Apply filters - already handled by onChange
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}