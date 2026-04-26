import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth.js';
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/auth.controller.js';

const router = express.Router();

// POST /api/auth/register
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  registerUser
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  loginUser
);

// GET /api/auth/me (protected)
router.get('/me', protect, getMe);

// PUT /api/auth/profile (protected) - update phone
router.put('/profile', protect, updateProfile);

// GET /api/auth/addresses (protected)
router.get('/addresses', protect, getAddresses);

// POST /api/auth/addresses (protected)
router.post('/addresses', protect, addAddress);

// PUT /api/auth/addresses/:addressId (protected)
router.put('/addresses/:addressId', protect, updateAddress);

// DELETE /api/auth/addresses/:addressId (protected)
router.delete('/addresses/:addressId', protect, deleteAddress);

export default router;
