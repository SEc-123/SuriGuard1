import React from 'react';
import { UserSession } from '../../../types/user';

interface UserSessionsTableProps {
  sessions: UserSession[];
}

export default function UserSessionsTable({ sessions }: UserSessionsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Login Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Logout Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Agent</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sessions.map((session) => (
            <tr key={session.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(session.loginTime).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {session.logoutTime ? new Date(session.logoutTime).toLocaleString() : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {session.ipAddress}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {session.userAgent}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}