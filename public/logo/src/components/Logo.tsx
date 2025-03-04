import React from 'react';
import { Shield } from 'lucide-react';

export default function Logo() {
  return (
    <div className="h-[60px] flex flex-col justify-center px-4">
      <div className="flex items-center">
        <Shield className="text-blue-500 mr-2" size={24} />
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 text-transparent bg-clip-text">
          Suriguard
        </h1>
      </div>
      <p className="text-xs text-gray-400 mt-1">for the best suricata</p>
    </div>
  );
}