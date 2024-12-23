import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal } from 'lucide-react';
import { getEvents } from '../../services/eventService';
import EventProcessDialog from './components/EventProcessDialog';
import EventHistoryDialog from './components/EventHistoryDialog';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showProcessDialog, setShowProcessDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [filters, setFilters] = useState({
    phase: '',
    status: ''
  });

  useEffect(() => {
    loadEvents();
  }, [filters]);

  const loadEvents = async () => {
    try {
      const data = await getEvents(filters);
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const handleProcess = (event: any) => {
    setSelectedEvent(event);
    setShowProcessDialog(true);
  };

  const handleViewHistory = (event: any) => {
    setSelectedEvent(event);
    setShowHistoryDialog(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">事件管理</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索事件..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <select
            value={filters.phase}
            onChange={(e) => setFilters({ ...filters, phase: e.target.value })}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">所有阶段</option>
            <option value="未处理">未处理</option>
            <option value="事件调查">事件调查</option>
            <option value="完结">完结</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">所有状态</option>
            <option value="待处理">待处理</option>
            <option value="处理中">处理中</option>
            <option value="已处理">已处理</option>
            <option value="已完结">已完结</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">事件ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">规则ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">源IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">目标IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">当前阶段</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">当前状态</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event: any) => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap">{event.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.rule_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.src_ip}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.dest_ip}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    event.current_phase === '完结' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {event.current_phase}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    event.current_status === '已完结'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {event.current_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleProcess(event)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    处理
                  </button>
                  <button
                    onClick={() => handleViewHistory(event)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    查看历史
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showProcessDialog && selectedEvent && (
        <EventProcessDialog
          event={selectedEvent}
          onClose={() => {
            setShowProcessDialog(false);
            setSelectedEvent(null);
            loadEvents();
          }}
        />
      )}

      {showHistoryDialog && selectedEvent && (
        <EventHistoryDialog
          event={selectedEvent}
          onClose={() => {
            setShowHistoryDialog(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
}