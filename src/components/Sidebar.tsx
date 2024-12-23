import React from 'react';
import { 
  BarChart3, 
  Activity,
  ScrollText,
  Bell,
  Shield,
  Users,
  Settings,
  Menu
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', path: '/' },
  { icon: Activity, label: 'Real-time Monitor', path: '/monitor' },
  { icon: ScrollText, label: 'Log Management', path: '/logs' },
  { icon: Bell, label: 'Event Management', path: '/events' },
  { icon: Shield, label: 'Rules Management', path: '/rules' },
  { icon: Users, label: 'User Management', path: '/users' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className={`bg-gray-900 text-white h-screen transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-bold">Suriguard</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-gray-800 rounded">
          <Menu size={20} />
        </button>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 transition-colors ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              {!collapsed && <span className="ml-4">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}