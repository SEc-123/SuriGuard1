import React from 'react';
import { Trash2, Settings } from 'lucide-react';
import { PresetAnalytics } from '../../types/presetFilter';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface AnalyticsChartProps {
  analytics: PresetAnalytics;
  data: any[];
}

export default function AnalyticsChart({ analytics, data }: AnalyticsChartProps) {
  const renderChart = () => {
    switch (analytics.chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={analytics.groupBy} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={analytics.groupBy} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#3B82F6" />
          </LineChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey={analytics.groupBy}
              fill="#3B82F6"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h3 className="font-medium">{analytics.name}</h3>
          <p className="text-sm text-gray-500">
            {analytics.aggregation} by {analytics.groupBy}
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 text-gray-500 hover:text-gray-700 rounded-lg">
            <Settings size={18} />
          </button>
          <button className="p-1 text-gray-500 hover:text-red-600 rounded-lg">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-4 h-[300px]">
        <ResponsiveContainer>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}