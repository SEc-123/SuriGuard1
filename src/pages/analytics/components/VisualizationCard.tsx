import React from 'react';
import { Trash2, Settings } from 'lucide-react';
import { Visualization } from '../../../types/visualization';
import { deleteVisualization } from '../../../services/visualizationService';
import ChartRenderer from './ChartRenderer';

interface VisualizationCardProps {
  visualization: Visualization;
  onDelete: () => void;
}

export default function VisualizationCard({ visualization, onDelete }: VisualizationCardProps) {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this visualization?')) {
      try {
        await deleteVisualization(visualization.id);
        onDelete();
      } catch (error) {
        console.error('Failed to delete visualization:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h3 className="font-medium">{visualization.title}</h3>
          {visualization.description && (
            <p className="text-sm text-gray-500">{visualization.description}</p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleDelete}
            className="p-1 text-gray-500 hover:text-red-600 rounded-lg"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <ChartRenderer visualization={visualization} />
      </div>
    </div>
  );
}