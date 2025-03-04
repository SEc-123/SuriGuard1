import React from 'react';
import { BarChart2, LineChart, PieChart } from 'lucide-react';

interface ChartTypeSelectorProps {
  value: string;
  onChange: (type: 'bar' | 'line' | 'pie') => void;
}

export default function ChartTypeSelector({ value, onChange }: ChartTypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Chart Type
      </label>
      <div className="grid grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => onChange('bar')}
          className={`p-4 border rounded-lg flex flex-col items-center ${
            value === 'bar' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
          }`}
        >
          <BarChart2 size={24} className={value === 'bar' ? 'text-blue-500' : 'text-gray-500'} />
          <span className="mt-2 text-sm">Bar Chart</span>
        </button>

        <button
          type="button"
          onClick={() => onChange('line')}
          className={`p-4 border rounded-lg flex flex-col items-center ${
            value === 'line' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
          }`}
        >
          <LineChart size={24} className={value === 'line' ? 'text-blue-500' : 'text-gray-500'} />
          <span className="mt-2 text-sm">Line Chart</span>
        </button>

        <button
          type="button"
          onClick={() => onChange('pie')}
          className={`p-4 border rounded-lg flex flex-col items-center ${
            value === 'pie' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
          }`}
        >
          <PieChart size={24} className={value === 'pie' ? 'text-blue-500' : 'text-gray-500'} />
          <span className="mt-2 text-sm">Pie Chart</span>
        </button>
      </div>
    </div>
  );
}