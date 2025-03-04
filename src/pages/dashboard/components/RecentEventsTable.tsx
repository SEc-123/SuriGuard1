import React from 'react';
import { AlertTriangle, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '../../../types/events';

interface RecentEventsTableProps {
  events: Event[];
}

export default function RecentEventsTable({ events }: RecentEventsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">Recent Events</h3>
        <Link to="/events" className="text-blue-600 hover:text-blue-700 text-sm">
          View All →
        </Link>
      </div>

      <div className="overflow-y-auto max-h-[300px]">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap">
                  {event.severity === 1 ? (
                    <AlertTriangle className="text-red-500" size={16} />
                  ) : event.severity === 2 ? (
                    <Shield className="text-orange-500" size={16} />
                  ) : (
                    <Activity className="text-yellow-500" size={16} />
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{event.src_ip}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    event.current_stage === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    event.current_stage === 'Investigation' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {event.current_stage}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {new Date(event.start_time).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}