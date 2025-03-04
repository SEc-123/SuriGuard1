import React, { useState } from 'react';
import { X } from 'lucide-react';
import { savePresetFilter } from '../../services/presetFilterService';
import { LogFilters } from '../../types/logs';
import { FilterCondition } from '../../types/presetFilter';

interface SaveFilterModalProps {
  currentFilters: LogFilters;
  onClose: () => void;
  onSave: () => void;
}

export default function SaveFilterModal({ currentFilters, onClose, onSave }: SaveFilterModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Filter name is required');
      return;
    }

    try {
      setSaving(true);
      setError('');

      // Convert LogFilters to FilterCondition[]
      const conditions: FilterCondition[] = [];
      
      // Add search condition if present
      if (currentFilters.search) {
        conditions.push({
          field: 'content',
          operator: 'contains',
          value: currentFilters.search
        });
      }
      
      // Add type condition if not 'all'
      if (currentFilters.type && currentFilters.type !== 'all') {
        conditions.push({
          field: 'type',
          operator: 'equals',
          value: currentFilters.type
        });
      }
      
      // Add severity condition if not 'all'
      if (currentFilters.severity && currentFilters.severity !== 'all') {
        conditions.push({
          field: 'severity',
          operator: 'equals',
          value: currentFilters.severity
        });
      }
      
      // Add advanced conditions
      if (currentFilters.advanced && currentFilters.advanced.length > 0) {
        conditions.push(...currentFilters.advanced);
      }

      await savePresetFilter({
        name,
        description,
        conditions
      });
      
      onSave();
    } catch (error) {
      console.error('Failed to save filter:', error);
      setError('Failed to save filter');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Save Filter</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>

          <div className="border rounded-md p-3 bg-gray-50">
            <h3 className="text-sm font-medium mb-2">Filter Preview</h3>
            <div className="text-sm">
              {currentFilters.search && (
                <div className="mb-1">Search: {currentFilters.search}</div>
              )}
              {currentFilters.type && currentFilters.type !== 'all' && (
                <div className="mb-1">Type: {currentFilters.type}</div>
              )}
              {currentFilters.severity && currentFilters.severity !== 'all' && (
                <div className="mb-1">Severity: {currentFilters.severity}</div>
              )}
              {currentFilters.advanced && currentFilters.advanced.length > 0 && (
                <div>
                  <div className="mb-1">Advanced Conditions:</div>
                  <ul className="list-disc pl-5">
                    {currentFilters.advanced.map((condition, index) => (
                      <li key={index}>
                        {condition.field} {condition.operator} {condition.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {!currentFilters.search && 
               (!currentFilters.type || currentFilters.type === 'all') && 
               (!currentFilters.severity || currentFilters.severity === 'all') && 
               (!currentFilters.advanced || currentFilters.advanced.length === 0) && (
                <div className="text-gray-500">No filters applied</div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Filter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}