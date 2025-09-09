import React from 'react';
import { KavachContext, useKavachProvider } from '../../hooks/useKavach';

interface KavachProviderProps {
  children: React.ReactNode;
}

export const KavachProvider: React.FC<KavachProviderProps> = ({ children }) => {
  const kavach = useKavachProvider();

  return (
    <KavachContext.Provider value={kavach}>
      {children}
    </KavachContext.Provider>
  );
};