import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/auth/PrivateRoute';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import AnalyticsDashboard from './pages/analytics/AnalyticsDashboard';
import UserList from './pages/users/UserList';
import Settings from './pages/settings/Settings';
import RulesManagement from './pages/rules/RulesManagement';
import LogManagement from './pages/logs/LogManagement';
import LogList from './pages/logs/LogList';
import LogAnalytics from './pages/logs/LogAnalytics';
import EventList from './pages/events/EventList';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <PrivateRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </PrivateRoute>
        } />
        
        <Route path="/analytics" element={
          <PrivateRoute requiredPermission="analytics">
            <AppLayout>
              <AnalyticsDashboard />
            </AppLayout>
          </PrivateRoute>
        } />
        
        <Route path="/logs" element={
          <PrivateRoute requiredPermission="logs">
            <AppLayout>
              <LogManagement />
            </AppLayout>
          </PrivateRoute>
        }>
          <Route path="list" element={<LogList />} />
          <Route path="analytics" element={<LogAnalytics />} />
          <Route index element={<LogList />} />
        </Route>
        
        <Route path="/events" element={
          <PrivateRoute requiredPermission="events">
            <AppLayout>
              <EventList />
            </AppLayout>
          </PrivateRoute>
        } />
        
        <Route path="/rules" element={
          <PrivateRoute requiredPermission="rules">
            <AppLayout>
              <RulesManagement />
            </AppLayout>
          </PrivateRoute>
        } />
        
        <Route path="/users" element={
          <PrivateRoute requiredPermission="users">
            <AppLayout>
              <UserList />
            </AppLayout>
          </PrivateRoute>
        } />
        
        <Route path="/settings" element={
          <PrivateRoute requiredPermission="settings">
            <AppLayout>
              <Settings />
            </AppLayout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}