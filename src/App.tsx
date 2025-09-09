import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import { AdminProvider } from './components/Admin/AdminProvider';
import { LandingPage } from './components/Landing/LandingPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminProtectedRoute } from './components/Admin/AdminProtectedRoute';
import { Layout } from './components/Layout/Layout';
import { LoginForm } from './components/Auth/LoginForm';
import { AdminLogin } from './components/Admin/AdminLogin';
import { Dashboard } from './components/Dashboard/Dashboard';
import { MyDashboard } from './pages/MyDashboard';
import { Sarthi } from './pages/Sarthi';
import { Brahma } from './pages/Brahma';
import { Kavach } from './pages/Kavach';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { SarthiAdminPage } from './pages/admin/SarthiAdminPage';
import { CustomersAdminPage } from './pages/admin/CustomersAdminPage';
import { PaymentsAdminPage } from './pages/admin/PaymentsAdminPage';
import { BrahmaAdminPage } from './pages/admin/BrahmaAdminPage';
import { KavachAdminPage } from './pages/admin/KavachAdminPage';
import { ExpertsAdminPage } from './pages/admin/ExpertsAdminPage';
import { SettingsAdminPage } from './pages/admin/SettingsAdminPage';

const AppContent: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      
      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={
        <AdminProtectedRoute>
          <AdminDashboardPage />
        </AdminProtectedRoute>
      } />
      <Route path="/admin/customers" element={
        <AdminProtectedRoute requiredRole={['super-admin']}>
          <CustomersAdminPage />
        </AdminProtectedRoute>
      } />
      <Route path="/admin/sarthi" element={
        <AdminProtectedRoute requiredRole={['super-admin', 'sarthi-admin']}>
          <SarthiAdminPage />
        </AdminProtectedRoute>
      } />
      <Route path="/admin/brahma" element={
        <AdminProtectedRoute requiredRole={['super-admin', 'brahma-admin']}>
          <BrahmaAdminPage />
        </AdminProtectedRoute>
      } />
      <Route path="/admin/kavach" element={
        <AdminProtectedRoute requiredRole={['super-admin', 'kavach-admin']}>
          <KavachAdminPage />
        </AdminProtectedRoute>
      } />
      <Route path="/admin/experts" element={
        <AdminProtectedRoute requiredRole={['super-admin', 'sarthi-admin']}>
          <ExpertsAdminPage />
        </AdminProtectedRoute>
      } />
      <Route path="/admin/payments" element={
        <AdminProtectedRoute requiredRole={['super-admin']}>
          <PaymentsAdminPage />
        </AdminProtectedRoute>
      } />
      <Route path="/admin/settings" element={
        <AdminProtectedRoute>
          <SettingsAdminPage />
        </AdminProtectedRoute>
      } />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/my-dashboard" element={
        <ProtectedRoute>
          <Layout>
            <MyDashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/sarthi" element={
        <ProtectedRoute>
          <Sarthi />
        </ProtectedRoute>
      } />
      <Route path="/brahma" element={
        <ProtectedRoute>
          <Brahma />
        </ProtectedRoute>
      } />
      <Route path="/kavach" element={
        <ProtectedRoute>
          <Kavach />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

function App() {
  return (
    <AdminProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </AdminProvider>
  );
}

export default App;