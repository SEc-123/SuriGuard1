import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import LoginLogo from '../../components/auth/LoginLogo';

export default function Login() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-200">
        <LoginLogo />
        <LoginForm />
      </div>
    </div>
  );
}