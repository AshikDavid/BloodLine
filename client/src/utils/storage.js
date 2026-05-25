export const getToken = () => localStorage.getItem('token');

export const getRole = () => localStorage.getItem('role');

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

export const setSession = (user, token = 'basic-demo-token') => {
  const routeRole = user?.role === 'admin' ? 'admin' : 'user';

  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
  localStorage.setItem('role', routeRole);

  return routeRole;
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};
