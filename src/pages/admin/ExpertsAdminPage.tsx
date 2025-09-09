import React from 'react';
import { AdminLayout } from '../../components/Admin/AdminLayout';
import { ExpertsAdmin } from '../../components/Admin/ExpertsAdmin';

export const ExpertsAdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <ExpertsAdmin />
    </AdminLayout>
  );
};