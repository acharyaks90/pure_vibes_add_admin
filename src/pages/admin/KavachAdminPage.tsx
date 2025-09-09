import React from 'react';
import { AdminLayout } from '../../components/Admin/AdminLayout';
import { KavachAdmin } from '../../components/Admin/KavachAdmin';

export const KavachAdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <KavachAdmin />
    </AdminLayout>
  );
};