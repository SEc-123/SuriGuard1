import React from 'react';
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
import { Visualization } from '../../../types/visualization';

interface ChartRendererProps {
  visualization: Visualization;
}

export default function ChartRenderer({ visualization }: ChartRendererProps) {
  const { type, data, config } = visualization;

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={config.xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={config.yAxis} fill="#3B82F6" />
          </BarChart>
        );
      
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={config.xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={config.yAxis} stroke="#3B82F6" />
          </LineChart>
        );
      
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={config.value}
              nameKey={config.name}
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
    <div className="h-[300px] w-full">
      <ResponsiveContainer>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}