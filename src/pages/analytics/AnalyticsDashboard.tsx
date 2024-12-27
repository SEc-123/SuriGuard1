import React, { useState, useEffect } from 'react';
import { Plus, BarChart2 } from 'lucide-react';
import { getVisualizations } from '../../services/visualizationService';
import VisualizationCard from './components/VisualizationCard';
import CreateVisualizationModal from './components/CreateVisualizationModal';
import { Visualization } from '../../types/visualization';

export default function AnalyticsDashboard() {
  const [visualizations, setVisualizations] = useState<Visualization[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadVisualizations();
  }, []);

  const loadVisualizations = async () => {
    try {
      const data = await getVisualizations();
      setVisualizations(data);
    } catch (error) {
      console.error('Failed to load visualizations:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Advanced Analytics</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Create Visualization
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visualizations.map((visualization) => (
          <VisualizationCard
            key={visualization.id}
            visualization={visualization}
            onDelete={() => loadVisualizations()}
          />
        ))}
        
        {visualizations.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <BarChart2 size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No visualizations yet</h3>
            <p className="text-gray-500 text-center mb-4">
              Create your first visualization by selecting a saved filter and choosing a chart type.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Create Visualization
            </button>
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateVisualizationModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            setShowCreateModal(false);
            loadVisualizations();
          }}
        />
      )}
    </div>
  );
}