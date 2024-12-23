import React from 'react';
import { Shield } from 'lucide-react';
import LoginForm from '../../components/auth/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center">
            <Shield className="text-blue-600 w-12 h-12" />
            <h1 className="text-2xl font-bold ml-2">Suriguard</h1>
          </div>
          <p className="text-gray-600 mt-2 italic">for the best suricata</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}