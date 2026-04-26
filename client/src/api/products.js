import api from './axios';

export const fetchProducts = () => api.get('/api/products').then((r) => r.data);
export const fetchProductsByVariant = (variant) =>
  api.get(`/api/products/variant/${variant}`).then((r) => r.data);
export const fetchProductBySlug = (slug) =>
  api.get(`/api/products/slug/${slug}`).then((r) => r.data);
export const fetchProductsByCategory = (slug) =>
  api.get(`/api/products/category/${slug}`).then((r) => r.data);
export const searchProducts = (q) =>
  api.get('/api/products/search', { params: { q } }).then((r) => r.data);
