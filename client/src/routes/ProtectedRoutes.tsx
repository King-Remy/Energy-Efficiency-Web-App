import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ProtectedRoute: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;