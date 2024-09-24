// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element, role }) => {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
