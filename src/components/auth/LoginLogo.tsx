import React from 'react';
import suriguardLogo from '/logo/suriguard-logo.png';

export default function LoginLogo() {
  return (
    <div className="flex flex-col items-center mb-8">
      <img 
        src={suriguardLogo} 
        alt="Suriguard Logo" 
        className="w-64 h-64 object-contain mb-4"
      />
      <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x tracking-wide uppercase">
        Next-Gen Cybersecurity
      </p>
    </div>
  );
}