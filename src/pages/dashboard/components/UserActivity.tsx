import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getUserActivities } from '../../../services/userService';

interface Activity {
  id: number;
  user: string;
  action: string;
  time: Date;
}

export default function UserActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await getUserActivities();
      setActivities(data);
    } catch (error) {
      console.error('Failed to load user activities:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div key={activity.id} className="flex items-center justify-between py-2 border-b">
          <div>
            <p className="font-medium">{activity.user}</p>
            <p className="text-sm text-gray-500">{activity.action}</p>
          </div>
          <span className="text-sm text-gray-500">
            {format(new Date(activity.time), 'HH:mm')}
          </span>
        </div>
      ))}
    </div>
  );
}