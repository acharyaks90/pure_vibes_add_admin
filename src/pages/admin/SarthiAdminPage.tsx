import React from 'react';
import { AdminLayout } from '../../components/Admin/AdminLayout';
import { SarthiAdmin } from '../../components/Admin/SarthiAdmin';

export const SarthiAdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <SarthiAdmin />
    </AdminLayout>
  );
};