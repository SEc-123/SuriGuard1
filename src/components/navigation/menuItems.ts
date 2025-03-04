import { 
  BarChart3, 
  Activity,
  ScrollText,
  Bell,
  Shield,
  Users,
  Settings,
  Database,
  MoreHorizontal
} from 'lucide-react';
import { IconType } from 'react-icons';

interface MenuItem {
  icon: IconType;
  label: string;
  path: string;
}

export const menuItems: MenuItem[] = [
  { icon: BarChart3, label: 'Dashboard', path: '/' },
  { icon: Activity, label: 'Real-time Monitor', path: '/monitor' },
  { icon: ScrollText, label: 'Log Management', path: '/logs' },
  { icon: Bell, label: 'Event Management', path: '/events' },
  { icon: Shield, label: 'Rules Management', path: '/rules' },
  { icon: Users, label: 'User Management', path: '/users' },
  { icon: Database, label: 'Database Management', path: '/database' },
  { icon: Settings, label: 'System Settings', path: '/settings' },
  { icon: MoreHorizontal, label: 'More Features', path: '/more' },
];