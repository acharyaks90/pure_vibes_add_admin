import React from 'react';
import { AdminContext, useAdminProvider } from '../../hooks/useAdmin';

interface AdminProviderProps {
  children: React.ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const admin = useAdminProvider();

  return (
    <AdminContext.Provider value={admin}>
      {children}
    </AdminContext.Provider>
  );
};