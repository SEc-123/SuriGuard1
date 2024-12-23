import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Shield, AlertTriangle, Activity } from 'lucide-react';
import { getLogStats } from '../services/logService';
import { getEvents } from '../services/eventService';
import { getRuleStats } from '../services/rulesService';
import { getUsers } from '../services/userService';
import StatCard from './dashboard/components/StatCard';
import TrendChart from './dashboard/components/TrendChart';
import EventsList from './dashboard/components/EventsList';
import RuleStats from './dashboard/components/RuleStats';
import UserActivity from './dashboard/components/UserActivity';

export default function Dashboard() {
  const [stats, setStats] = useState({
    alerts: 0,
    events: 0,
    rules: 0,
    users: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [logStats, events, ruleStats, users] = await Promise.all([
        getLogStats(),
        getEvents(),
        getRuleStats(),
        getUsers()
      ]);

      setStats({
        alerts: logStats.alerts,
        events: events.length,
        rules: ruleStats.total,
        users: users.length
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">仪表盘</h1>
      
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={AlertTriangle}
          label="告警总数"
          value={stats.alerts}
          trend="+12%"
          trendType="up"
        />
        <StatCard
          icon={Activity}
          label="活跃事件"
          value={stats.events}
          trend="-8%"
          trendType="down"
        />
        <StatCard
          icon={Shield}
          label="规则总数"
          value={stats.rules}
          trend="+3%"
          trendType="up"
        />
        <StatCard
          icon={Users}
          label="用户总数"
          value={stats.users}
          trend="+5%"
          trendType="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 趋势图表 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">告警趋势</h2>
          <TrendChart />
        </div>

        {/* 最新事件 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">最新事件</h2>
          <EventsList />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 规则统计 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">规则统计</h2>
          <RuleStats />
        </div>

        {/* 用户活动 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">用户活动</h2>
          <UserActivity />
        </div>
      </div>
    </div>
  );
}