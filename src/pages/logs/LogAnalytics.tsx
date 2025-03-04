import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { getPresetAnalytics } from '../../services/presetFilterService';
import { executeAnalytics } from '../../services/analyticsService';
import AnalyticsChart from '../../components/analytics/AnalyticsChart';
import CreateAnalyticsModal from '../../components/logs/CreateAnalyticsModal';
import { PresetAnalytics } from '../../types/presetFilter';

export default function LogAnalytics() {
  const [analytics, setAnalytics] = useState<PresetAnalytics[]>([]);
  const [chartData, setChartData] = useState<Record<string, any[]>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch all analytics or analytics for a specific filter
      const allAnalytics = await getPresetAnalytics('critical-alerts');
      setAnalytics(allAnalytics);
      
      // Load data for each analytics
      const dataPromises = allAnalytics.map(async (item) => {
        try {
          const data = await executeAnalytics(item);
          return { id: item.id, data };
        } catch (error) {
          console.error(`Failed to execute analytics ${item.id}:`, error);
          return { id: item.id, data: [] };
        }
      });
      
      const results = await Promise.all(dataPromises);
      const newChartData: Record<string, any[]> = {};
      
      results.forEach(({ id, data }) => {
        newChartData[id] = data;
      });
      
      setChartData(newChartData);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Log Analytics</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Create Analytics
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading analytics...</div>
      ) : analytics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analytics.map((item) => (
            <AnalyticsChart
              key={item.id}
              analytics={item}
              data={chartData[item.id] || []}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500 mb-4">No analytics configured yet</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center mx-auto"
          >
            <Plus size={20} className="mr-2" />
            Create Your First Analytics
          </button>
        </div>
      )}

      {showCreateModal && (
        <CreateAnalyticsModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            setShowCreateModal(false);
            loadAnalytics();
          }}
        />
      )}
    </div>
  );
}