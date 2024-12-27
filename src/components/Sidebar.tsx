import React, { useState } from 'react';
import { 
  BarChart3,
  ScrollText,
  Bell,
  Shield,
  Users,
  Settings,
  Menu,
  AlertTriangle,
  LineChart
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', path: '/' },
  { icon: LineChart, label: 'Advanced Analytics', path: '/analytics' },
  { icon: ScrollText, label: 'Log Management', path: '/logs' },
  { icon: AlertTriangle, label: 'Event Management', path: '/events' },
  { icon: Shield, label: 'Rules Management', path: '/rules' },
  { icon: Users, label: 'User Management', path: '/users' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={`bg-gray-900 text-white h-screen transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-[220px]'
      }`}
    >
      <div className="flex-shrink-0">
        {collapsed ? (
          <div className="h-[60px] flex items-center justify-center">
            <Shield className="text-white" size={24} />
          </div>
        ) : (
          <Logo />
        )}
      </div>

      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 hover:bg-gray-800 rounded-lg mx-4 my-2 flex items-center justify-center"
      >
        <Menu size={20} />
      </button>
      
      <nav className="mt-6 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              {!collapsed && (
                <span className="ml-4 font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="p-4 text-xs text-gray-500 border-t border-gray-800">
          Version 1.0.0
        </div>
      )}
    </div>
  );
}