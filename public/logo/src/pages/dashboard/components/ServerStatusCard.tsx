import React from 'react';
import { Activity, Server, Clock } from 'lucide-react';

interface ServerStatusProps {
  uptime: string;
  cpuUsage: number;
  memoryUsage: number;
  networkLoad: number;
}

export default function ServerStatusCard({ uptime, cpuUsage, memoryUsage, networkLoad }: ServerStatusProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Server Status</h3>
        <Server className="text-blue-600" size={24} />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="text-gray-400 mr-2" size={20} />
            <span className="text-sm text-gray-600">Uptime</span>
          </div>
          <span className="text-sm font-medium">{uptime}</span>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">CPU Usage</span>
            <span className="text-sm font-medium">{cpuUsage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${cpuUsage}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">Memory Usage</span>
            <span className="text-sm font-medium">{memoryUsage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full" 
              style={{ width: `${memoryUsage}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">Network Load</span>
            <span className="text-sm font-medium">{networkLoad} MB/s</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full" 
              style={{ width: `${(networkLoad / 100) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}