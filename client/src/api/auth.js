import api from './axios';

export const register = (name, email, password) =>
  api.post('/api/auth/register', { name, email, password }).then((r) => r.data);

export const login = (email, password) =>
  api.post('/api/auth/login', { email, password }).then((r) => r.data);

export const fetchMe = () => api.get('/api/auth/me').then((r) => r.data);

export const updateProfile = (data) =>
  api.put('/api/auth/profile', data).then((r) => r.data);

export const fetchAddresses = () =>
  api.get('/api/auth/addresses').then((r) => r.data);

export const addAddress = (data) =>
  api.post('/api/auth/addresses', data).then((r) => r.data);

export const updateAddress = (addressId, data) =>
  api.put(`/api/auth/addresses/${addressId}`, data).then((r) => r.data);

export const deleteAddress = (addressId) =>
  api.delete(`/api/auth/addresses/${addressId}`).then((r) => r.data);
