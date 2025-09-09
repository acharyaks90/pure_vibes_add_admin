import React from 'react';
import { AdminLayout } from '../../components/Admin/AdminLayout';
import { PaymentsAdmin } from '../../components/Admin/PaymentsAdmin';

export const PaymentsAdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <PaymentsAdmin />
    </AdminLayout>
  );
};