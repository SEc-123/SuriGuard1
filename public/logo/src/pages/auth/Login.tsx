import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import LoginLogo from '../../components/auth/LoginLogo';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8 border border-white/20">
        <LoginLogo />
        <LoginForm />
      </div>
    </div>
  );
}