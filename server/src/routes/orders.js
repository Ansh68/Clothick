import express from 'express';
import { protect } from '../middleware/auth.js';
import { getMyOrders, getOrderById } from '../controllers/order.controller.js';

const router = express.Router();

// GET /api/orders - my orders (protected)
router.get('/', protect, getMyOrders);

// GET /api/orders/:id - single order details (protected)
router.get('/:id', protect, getOrderById);

export default router;
