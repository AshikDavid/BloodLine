import api from '../utils/api';

export const getDashboard = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const getAdminRequests = async () => {
  const response = await api.get('/admin/requests');
  return response.data;
};

export const getAdminDonations = async () => {
  const response = await api.get('/admin/donations');
  return response.data;
};

export const deleteAdminUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

export const deleteAdminRequest = async (id) => {
  const response = await api.delete(`/admin/requests/${id}`);
  return response.data;
};

export const deleteAdminDonation = async (id) => {
  const response = await api.delete(`/admin/donations/${id}`);
  return response.data;
};
