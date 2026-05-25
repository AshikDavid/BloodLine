import api from '../utils/api';

export const createRequest = async (payload) => {
  const response = await api.post('/requests', payload);
  return response.data;
};

export const getRequests = async () => {
  const response = await api.get('/requests');
  return response.data;
};

export const updateRequestStatus = async (id, status) => {
  const response = await api.patch(`/requests/${id}/status`, { status });
  return response.data;
};

export const getOpenRequests = async () => {
  const response = await api.get('/requests/open');
  return response.data;
};
