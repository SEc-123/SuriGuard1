import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAlertTrends, AlertTrend } from '../../../services/dashboardService';

export default function TrendChart() {
  const [data, setData] = useState<AlertTrend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrendData();
  }, []);

  const loadTrendData = async () => {
    try {
      const trends = await getAlertTrends(7);
      setData(trends);
    } catch (error) {
      console.error('Failed to load trend data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="h-64 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="alerts" 
            stroke="#3b82f6" 
            fill="#93c5fd" 
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}