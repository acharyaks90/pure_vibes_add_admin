import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductList } from '../components/Kavach/ProductList';
import { KavachProvider } from '../components/Kavach/KavachProvider';

export const Kavach: React.FC = () => {
  const navigate = useNavigate();

  return (
    <KavachProvider>
      <ProductList
        onBack={() => navigate('/dashboard')}
      />
    </KavachProvider>
  );
};