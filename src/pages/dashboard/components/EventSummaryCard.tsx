import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventSummaryProps {
  pendingEvents: number;
  investigatingEvents: number;
  completedEvents: number;
  criticalEvents: number;
}

export default function EventSummaryCard({ 
  pendingEvents, 
  investigatingEvents, 
  completedEvents,
  criticalEvents 
}: EventSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Event Summary</h3>
        <Bell className="text-blue-600" size={24} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Clock className="text-yellow-500" size={20} />
            <span className="text-lg font-semibold">{pendingEvents}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Pending</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <AlertTriangle className="text-orange-500" size={20} />
            <span className="text-lg font-semibold">{investigatingEvents}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Investigating</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <CheckCircle className="text-green-500" size={20} />
            <span className="text-lg font-semibold">{completedEvents}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Completed</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <AlertTriangle className="text-red-500" size={20} />
            <span className="text-lg font-semibold text-red-600">{criticalEvents}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Critical</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">Real-time monitoring</span>
        <Link to="/events" className="text-blue-600 hover:text-blue-700">View All Events →</Link>
      </div>
    </div>
  );
}