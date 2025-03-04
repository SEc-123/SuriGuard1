import React from 'react';
import { Clock } from 'lucide-react';

interface TimeRangeSelectorProps {
  value: string;
  onChange: (range: string) => void;
}

export default function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  const ranges = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Time Range
      </label>
      <div className="grid grid-cols-4 gap-4">
        {ranges.map((range) => (
          <button
            key={range.value}
            type="button"
            onClick={() => onChange(range.value)}
            className={`p-3 border rounded-lg flex flex-col items-center ${
              value === range.value ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <Clock size={20} className={value === range.value ? 'text-blue-500' : 'text-gray-500'} />
            <span className="mt-1 text-sm">{range.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}