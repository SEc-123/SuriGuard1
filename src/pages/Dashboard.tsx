import React, { useState, useEffect } from 'react';
import ServerStatusCard from './dashboard/components/ServerStatusCard';
import LogSummaryCard from './dashboard/components/LogSummaryCard';
import EventSummaryCard from './dashboard/components/EventSummaryCard';
import RecentEventsTable from './dashboard/components/RecentEventsTable';
import { getLogStats } from '../services/logService';
import { getEvents } from '../services/eventService';
import { getServerStatus } from '../services/systemService';

export default function Dashboard() {
  const [serverStatus, setServerStatus] = useState({
    uptime: '0:00:00',
    cpuUsage: 0,
    memoryUsage: 0,
    networkLoad: 0
  });

  const [logStats, setLogStats] = useState({
    totalLogs: 0,
    alertLogs: 0,
    dnsLogs: 0,
    httpLogs: 0,
    lastUpdate: new Date().toLocaleString()
  });

  const [eventStats, setEventStats] = useState({
    pendingEvents: 0,
    investigatingEvents: 0,
    completedEvents: 0,
    criticalEvents: 0
  });

  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Load server status
        const status = await getServerStatus();
        setServerStatus(status);

        // Load log statistics
        const logs = await getLogStats();
        setLogStats({
          totalLogs: logs.total,
          alertLogs: logs.alerts,
          dnsLogs: logs.dns,
          httpLogs: logs.http,
          lastUpdate: new Date().toLocaleString()
        });

        // Load events
        const events = await getEvents({ limit: 5 });
        setRecentEvents(events.data);

        // Calculate event statistics
        const stats = events.data.reduce((acc, event) => {
          acc[`${event.current_stage.toLowerCase()}Events`]++;
          if (event.severity === 1) acc.criticalEvents++;
          return acc;
        }, {
          pendingEvents: 0,
          investigatingEvents: 0,
          completedEvents: 0,
          criticalEvents: 0
        });
        setEventStats(stats);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    };

    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* First row */}
        <ServerStatusCard {...serverStatus} />
        <LogSummaryCard {...logStats} />
        
        {/* Event Summary and Recent Events side by side */}
        <div className="lg:col-span-1 grid grid-rows-[auto_1fr] gap-6">
          <EventSummaryCard {...eventStats} />
          <RecentEventsTable events={recentEvents} />
        </div>
      </div>
    </div>
  );
}