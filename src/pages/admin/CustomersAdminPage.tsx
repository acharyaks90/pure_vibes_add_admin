import React from 'react';
import { AdminLayout } from '../../components/Admin/AdminLayout';
import { CustomersAdmin } from '../../components/Admin/CustomersAdmin';

export const CustomersAdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <CustomersAdmin />
    </AdminLayout>
  );
};