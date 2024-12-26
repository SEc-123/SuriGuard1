import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Event } from '../../types/events';
import { getEvents } from '../../services/eventService';
import EventStageModal from './components/EventStageModal';
import EventHistoryModal from './components/EventHistoryModal';

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    loadEvents();
  }, [filters]);

  const loadEvents = async () => {
    try {
      const response = await getEvents(filters);
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const handleProcess = (event: Event) => {
    setSelectedEvent(event);
    setIsStageModalOpen(true);
  };

  const handleViewHistory = (event: Event) => {
    setSelectedEvent(event);
    setIsHistoryModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Event Management</h1>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <select className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
              <option value="">All Stages</option>
              <option value="Pending">Pending</option>
              <option value="Investigation">Investigation</option>
              <option value="Completed">Completed</option>
            </select>
            <select className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
              <option value="">All Severities</option>
              <option value="3">High</option>
              <option value="2">Medium</option>
              <option value="1">Low</option>
            </select>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rule ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Target IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Handler</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{event.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{event.rule_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{event.src_ip}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{event.dst_ip}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.current_stage === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    event.current_stage === 'Investigation' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {event.current_stage}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{event.handler || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleProcess(event)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Process
                  </button>
                  <button
                    onClick={() => handleViewHistory(event)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEvent && (
        <>
          <EventStageModal
            isOpen={isStageModalOpen}
            onClose={() => {
              setIsStageModalOpen(false);
              setSelectedEvent(null);
              loadEvents();
            }}
            event={selectedEvent}
          />
          <EventHistoryModal
            isOpen={isHistoryModalOpen}
            onClose={() => {
              setIsHistoryModalOpen(false);
              setSelectedEvent(null);
            }}
            event={selectedEvent}
          />
        </>
      )}
    </div>
  );
}