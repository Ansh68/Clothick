import api from './axios';

export const fetchCategories = (limit) =>
  api.get('/api/categories', { params: limit ? { limit } : {} }).then((r) => r.data);
