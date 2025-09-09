import React from 'react';
import { AdminLayout } from '../../components/Admin/AdminLayout';
import { AdminDashboard } from '../../components/Admin/AdminDashboard';

export const AdminDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
};