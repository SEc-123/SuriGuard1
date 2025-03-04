import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getSavedFilters } from '../../../services/filterService';
import { createVisualization } from '../../../services/visualizationService';
import { SavedFilter } from '../../../types/visualization';

interface CreateVisualizationModalProps {
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateVisualizationModal({
  onClose,
  onCreated
}: CreateVisualizationModalProps) {
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    filterId: '',
    type: 'bar',
    config: {
      xAxis: '',
      yAxis: '',
      aggregation: 'count'
    }
  });

  useEffect(() => {
    loadSavedFilters();
  }, []);

  const loadSavedFilters = async () => {
    try {
      const filters = await getSavedFilters();
      setSavedFilters(filters);
    } catch (error) {
      console.error('Failed to load saved filters:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createVisualization(formData);
      onCreated();
    } catch (error) {
      console.error('Failed to create visualization:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create Visualization</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Saved Filter
            </label>
            <select
              value={formData.filterId}
              onChange={(e) => setFormData({ ...formData, filterId: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select a filter</option>
              {savedFilters.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chart Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                X Axis Field
              </label>
              <input
                type="text"
                value={formData.config.xAxis}
                onChange={(e) => setFormData({
                  ...formData,
                  config: { ...formData.config, xAxis: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Y Axis Field
              </label>
              <input
                type="text"
                value={formData.config.yAxis}
                onChange={(e) => setFormData({
                  ...formData,
                  config: { ...formData.config, yAxis: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aggregation
            </label>
            <select
              value={formData.config.aggregation}
              onChange={(e) => setFormData({
                ...formData,
                config: { ...formData.config, aggregation: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="count">Count</option>
              <option value="sum">Sum</option>
              <option value="avg">Average</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}