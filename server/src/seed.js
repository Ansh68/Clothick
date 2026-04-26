/**
 * Optional seed script: run with node src/seed.js (after setting MONGODB_URI in .env)
 * Creates sample categories and products so the store is not empty.
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const cat1 = await Category.create({ title: 'T-Shirts', slug: 't-shirts', description: 'Comfortable tees' });
  const cat2 = await Category.create({ title: 'Jackets', slug: 'jackets', description: 'Warm jackets' });

  await Product.create([
    {
      name: 'Classic White Tee',
      slug: 'classic-white-tee',
      images: ['https://via.placeholder.com/400'],
      intro: 'Simple and clean',
      description: 'A classic white t-shirt for everyday wear.',
      price: 29.99,
      discount: 10,
      categories: [cat1._id],
      stock: 50,
      status: 'new',
      variant: 'tshirt',
    },
    {
      name: 'Denim Jacket',
      slug: 'denim-jacket',
      images: ['https://via.placeholder.com/400'],
      intro: 'Casual denim',
      description: 'Timeless denim jacket.',
      price: 79.99,
      discount: 0,
      categories: [cat2._id],
      stock: 20,
      status: 'hot',
      variant: 'jacket',
    },
  ]);

  console.log('Seed done: 2 categories, 2 products');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
