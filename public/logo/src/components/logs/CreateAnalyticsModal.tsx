import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getPresetFilters, savePresetAnalytics } from '../../services/presetFilterService';
import { PresetFilter } from '../../types/presetFilter';
import ChartTypeSelector from '../analytics/ChartTypeSelector';
import TimeRangeSelector from '../analytics/TimeRangeSelector';

interface CreateAnalyticsModalProps {
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateAnalyticsModal({ onClose, onCreated }: CreateAnalyticsModalProps) {
  const [filters, setFilters] = useState<PresetFilter[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    filterId: '',
    chartType: 'bar' as const,
    aggregation: 'count' as const,
    groupBy: '',
    timeRange: '24h'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFilters();
  }, []);

  const loadFilters = async () => {
    try {
      const data = await getPresetFilters();
      setFilters(data || []);
    } catch (error) {
      setError('Failed to load filters');
      console.error('Failed to load filters:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!formData.filterId) {
      setError('Please select a filter');
      return;
    }
    
    if (!formData.groupBy.trim()) {
      setError('Group By field is required');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      await savePresetAnalytics(formData);
      onCreated();
    } catch (error) {
      console.error('Failed to create analytics:', error);
      setError('Failed to create analytics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create Analytics</h2>
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
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter
            </label>
            <select
              value={formData.filterId}
              onChange={(e) => setFormData({ ...formData, filterId: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select a filter</option>
              {filters.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.name}
                </option>
              ))}
            </select>
          </div>

          <ChartTypeSelector
            value={formData.chartType}
            onChange={(type) => setFormData({ ...formData, chartType: type })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aggregation
            </label>
            <select
              value={formData.aggregation}
              onChange={(e) => setFormData({ ...formData, aggregation: e.target.value as any })}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="count">Count</option>
              <option value="sum">Sum</option>
              <option value="avg">Average</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group By
            </label>
            <input
              type="text"
              value={formData.groupBy}
              onChange={(e) => setFormData({ ...formData, groupBy: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <TimeRangeSelector
            value={formData.timeRange}
            onChange={(range) => setFormData({ ...formData, timeRange: range })}
          />

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}