import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/auth/PrivateRoute';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import UserList from './pages/users/UserList';
import Settings from './pages/settings/Settings';
import RulesList from './pages/rules/RulesList';
import LogManagement from './pages/logs/LogManagement';
import EventList from './pages/events/EventList';

function App() {
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
        
        <Route path="/events" element={
          <PrivateRoute requiredPermission="events">
            <AppLayout>
              <EventList />
            </AppLayout>
          </PrivateRoute>
        } />
        
        {/* Other existing routes... */}
      </Routes>
    </Router>
  );
}

export default App;