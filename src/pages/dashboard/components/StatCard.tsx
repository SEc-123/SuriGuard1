import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  trend: string;
  trendType: 'up' | 'down';
}

export default function StatCard({ icon: Icon, label, value, trend, trendType }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="text-blue-600" size={24} />
        </div>
        <span className={`text-sm ${
          trendType === 'up' ? 'text-green-500' : 'text-red-500'
        }`}>
          {trend}
        </span>
      </div>
      <h3 className="text-gray-500 text-sm">{label}</h3>
      <p className="text-2xl font-semibold mt-1">{value.toLocaleString()}</p>
    </div>
  );
}