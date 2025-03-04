import React from 'react';
import { ScrollText, AlertTriangle, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogSummaryProps {
  totalLogs: number;
  alertLogs: number;
  dnsLogs: number;
  httpLogs: number;
  lastUpdate: string;
}

export default function LogSummaryCard({ totalLogs, alertLogs, dnsLogs, httpLogs, lastUpdate }: LogSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Log Summary</h3>
        <ScrollText className="text-blue-600" size={24} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <AlertTriangle className="text-yellow-500" size={20} />
            <span className="text-lg font-semibold">{alertLogs}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Alert Logs</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Globe className="text-blue-500" size={20} />
            <span className="text-lg font-semibold">{dnsLogs}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">DNS Logs</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Shield className="text-green-500" size={20} />
            <span className="text-lg font-semibold">{httpLogs}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">HTTP Logs</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <ScrollText className="text-purple-500" size={20} />
            <span className="text-lg font-semibold">{totalLogs}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Total Logs</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">Last updated: {lastUpdate}</span>
        <Link to="/logs" className="text-blue-600 hover:text-blue-700">View All Logs →</Link>
      </div>
    </div>
  );
}