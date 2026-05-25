import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Landing from './components/common/Landing';
import Contact from './components/common/Contact';
import Login from './components/common/Login';
import Register from './components/common/Register';
import ProtectedRoute from './components/common/ProtectedRoute';
import NotFound from './components/common/NotFound';
import UserLayout from './components/users/UserLayout';
import UserDashboard from './components/users/UserDashboard';
import RequestBlood from './components/users/RequestBlood';
import RequestHistory from './components/users/RequestHistory';
import DonationHistory from './components/users/DonationHistory';
import DonorProfile from './components/users/DonorProfile';
import EditProfile from './components/users/EditProfile';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageUsers from './components/admin/ManageUsers';
import ManageRequests from './components/admin/ManageRequests';
import ManageDonations from './components/admin/ManageDonations';
import Reports from './components/admin/Reports';

function PublicPage({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicPage><Landing /></PublicPage>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<PublicPage><Contact /></PublicPage>} />
        <Route path="/contact-us" element={<Navigate to="/contact" replace />} />

        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route element={<UserLayout />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/request" element={<RequestBlood />} />
            <Route path="/user/history" element={<RequestHistory />} />
            <Route path="/user/donations" element={<DonationHistory />} />
            <Route path="/user/profile" element={<DonorProfile />} />
            <Route path="/user/edit" element={<EditProfile />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/requests" element={<ManageRequests />} />
            <Route path="/admin/donations" element={<ManageDonations />} />
            <Route path="/admin/reports" element={<Reports />} />
          </Route>
        </Route>

        <Route path="/blood-request" element={<Navigate to="/user/request" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
