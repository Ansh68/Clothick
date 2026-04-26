import api from './axios';

export const fetchMyOrders = () => api.get('/api/orders').then((r) => r.data);
