import React from 'react';
import { AdminLayout } from '../../components/Admin/AdminLayout';
import { SettingsAdmin } from '../../components/Admin/SettingsAdmin';

export const SettingsAdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <SettingsAdmin />
    </AdminLayout>
  );
};