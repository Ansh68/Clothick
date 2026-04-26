import express from 'express';
import {
  getProducts,
  getProductsByVariant,
  getProductsByCategory,
  getProductBySlug,
  searchProducts,
  createProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// GET /api/products - all products
router.get('/', getProducts);

// POST /api/products - create product (add protect middleware later if needed)
router.post('/', upload.array('images', 5), createProduct);

// GET /api/products/search?q=... - search by name (regex)
// NOTE: Put search BEFORE :variant or :slug to avoid conflict if 'search' is interpreted as a param
router.get('/search', searchProducts);

// GET /api/products/variant/:variant - by variant (tshirt, jacket, etc.)
router.get('/variant/:variant', getProductsByVariant);

// GET /api/products/category/:slug - products by category slug
router.get('/category/:slug', getProductsByCategory);

// GET /api/products/slug/:slug - single product by slug
router.get('/slug/:slug', getProductBySlug);

// DELETE /api/products/:id - delete product by id
router.delete('/:id', deleteProduct);

export default router;
