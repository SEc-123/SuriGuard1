import React from 'react';

export default function LoginLogo() {
  return (
    <div className="flex flex-col items-center mb-8">
      <img 
        src="/logo/suriguard-logo.png" 
        alt="Suriguard Logo" 
        className="h-16 w-auto"
      />
      <p className="text-sm text-gray-400 mt-2">for the best suricata</p>
    </div>
  );
}