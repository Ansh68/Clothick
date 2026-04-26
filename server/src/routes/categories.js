import express from 'express';
import { getCategories, getCategoryBySlug } from '../controllers/category.controller.js';

const router = express.Router();

// GET /api/categories - all categories
router.get('/', getCategories);

// GET /api/categories/slug/:slug - single category by slug
router.get('/slug/:slug', getCategoryBySlug);

export default router;
