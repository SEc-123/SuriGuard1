import React, { useState, useEffect } from 'react';
import { getEvents } from '../../../services/eventService';
import { format } from 'date-fns';

export default function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents({ limit: 5 });
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  return (
    <div className="space-y-4">
      {events.map((event: any) => (
        <div key={event.id} className="flex items-center justify-between py-2 border-b">
          <div>
            <p className="font-medium">事件 #{event.id}</p>
            <p className="text-sm text-gray-500">
              {format(new Date(event.created_at), 'yyyy-MM-dd HH:mm')}
            </p>
          </div>
          <span className={`px-3 py-1 text-sm rounded-full ${
            event.current_phase === '完结'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {event.current_phase}
          </span>
        </div>
      ))}
    </div>
  );
}