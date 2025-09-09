import React from 'react';
import { AdminLayout } from '../../components/Admin/AdminLayout';
import { BrahmaAdmin } from '../../components/Admin/BrahmaAdmin';

export const BrahmaAdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <BrahmaAdmin />
    </AdminLayout>
  );
};