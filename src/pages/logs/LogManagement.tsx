import React from 'react';
import { Outlet } from 'react-router-dom';

export default function LogManagement() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Log Management</h1>
      <Outlet />
    </div>
  );
}