import React from 'react';
import SuricataConfig from './components/SuricataConfig';
import DatabaseConfig from './components/DatabaseConfig';

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>
      <div className="grid gap-6">
        <SuricataConfig />
        <DatabaseConfig />
      </div>
    </div>
  );
}