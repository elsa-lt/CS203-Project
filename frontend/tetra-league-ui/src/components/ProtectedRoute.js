import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element, role }) => {
  const { user } = useAuth();

  console.log('User:', user);
  console.log('Required Role:', role); 

  if (!user || (user.role !== `ROLE_${role.toUpperCase()}`)) {
      return <Navigate to="/login" replace />;
  }

  return element; // If authorized, return the element
};

export default ProtectedRoute;
