import api from './axios';

export const createRazorpayOrder = (items) =>
  api.post('/api/payments/razorpay/create-order', { items }).then((r) => r.data);

export const verifyRazorpayPayment = (payload) =>
  api.post('/api/payments/razorpay/verify', payload).then((r) => r.data);
