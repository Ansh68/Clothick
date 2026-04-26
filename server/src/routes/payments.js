import express from 'express';
import { protect } from '../middleware/auth.js';
import { createRazorpayOrder, verifyRazorpayPayment } from '../controllers/payment.controller.js';

const router = express.Router();

// POST /api/payments/razorpay/create-order (protected)
router.post('/razorpay/create-order', protect, createRazorpayOrder);

// POST /api/payments/razorpay/verify (protected)
router.post('/razorpay/verify', protect, verifyRazorpayPayment);

export default router;

