import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getRuleCategories, RuleCategory } from '../../../services/dashboardService';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

export default function RuleStats() {
  const [data, setData] = useState<RuleCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRuleStats();
  }, []);

  const loadRuleStats = async () => {
    try {
      const categories = await getRuleCategories();
      setData(categories);
    } catch (error) {
      console.error('Failed to load rule stats:', error);
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
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}