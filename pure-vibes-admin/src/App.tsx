import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './components/AdminProvider';
import { AdminLogin } from './components/AdminLogin';
import { AdminProtectedRoute } from './components/AdminProtectedRoute';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { SarthiAdminPage } from './pages/SarthiAdminPage';
import { CustomersAdminPage } from './pages/CustomersAdminPage';
import { PaymentsAdminPage } from './pages/PaymentsAdminPage';
import { BrahmaAdminPage } from './pages/BrahmaAdminPage';
import { KavachAdminPage } from './pages/KavachAdminPage';
import { ExpertsAdminPage } from './pages/ExpertsAdminPage';
import { SettingsAdminPage } from './pages/SettingsAdminPage';

const AppContent: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<AdminLogin />} />
      
      {/* Protected admin routes */}
      <Route path="/dashboard" element={
        <AdminProtectedRoute>
          <AdminDashboardPage />
        </AdminProtectedRoute>
      } />
      <Route path="/customers" element={
        <AdminProtectedRoute requiredRole={['super-admin']}>
          <CustomersAdminPage />
        </AdminProtectedRoute>
      } />
      <Route path="/sarthi" element={
        <AdminProtectedRoute requiredRole={['super-admin', 'sarthi-admin']}>
          <SarthiAdminPage />
        </AdminProtectedRoute>
      } />
      <Route path="/brahma" element={
        <AdminProtectedRoute requiredRole={['super-admin', 'brahma-admin']}>
          <BrahmaAdminPage />
        </AdminProtectedRoute>
      } />
      <Route path="/kavach" element={
        <AdminProtectedRoute requiredRole={['super-admin', 'kavach-admin']}>
          <KavachAdminPage />
        </AdminProtectedRoute>
      } />
      <Route path="/experts" element={
        <AdminProtectedRoute requiredRole={['super-admin', 'sarthi-admin']}>
          <ExpertsAdminPage />
        </AdminProtectedRoute>
      } />
      <Route path="/payments" element={
        <AdminProtectedRoute requiredRole={['super-admin']}>
          <PaymentsAdminPage />
        </AdminProtectedRoute>
      } />
      <Route path="/settings" element={
        <AdminProtectedRoute>
          <SettingsAdminPage />
        </AdminProtectedRoute>
      } />
    </Routes>
  );
};

function App() {
  return (
    <AdminProvider>
      <Router>
        <AppContent />
      </Router>
    </AdminProvider>
  );
}

export default App;