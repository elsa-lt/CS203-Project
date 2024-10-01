import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/ProtectedRoute.css';

const ProtectedRoute = ({ element, role }) => {
  const { user, hasRole } = useAuth();
  console.log('User:', user);
  console.log('Required Role:', role); 

  if (user === undefined) {
   return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!hasRole(role)) {
      return <Navigate to="/login" replace />;
  }

  return element; 
};

export default ProtectedRoute;
