import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, hasPermission } from '../../utils/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

export default function PrivateRoute({ children, requiredPermission }: PrivateRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}