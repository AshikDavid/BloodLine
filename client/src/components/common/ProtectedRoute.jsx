import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getRole, getToken } from '../../utils/storage';

export default function ProtectedRoute({ allowedRole }) {
  const token = getToken();
  const role = getRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} replace />;
  }

  return <Outlet />;
}
