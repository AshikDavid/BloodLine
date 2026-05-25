import api from '../utils/api';

export const getMyDonations = async (donorId) => {
  const response = await api.get(`/donations/user/${donorId}`);
  return response.data;
};
