import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    images: [{ type: String }],
    intro: { type: String },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, min: 0, default: 0 },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    stock: { type: Number, min: 0, default: 0 },
    status: { type: String, enum: ['new', 'hot', 'sale', ''], default: '' },
    variant: {
      type: String,
      enum: ['tshirt', 'shirt', 'jeans', 'hoodie', 'shorts', 'others'],
      default: 'others',
    },
    gender: {
      type: String,
      enum: ['men', 'women', 'kids', 'unisex'],
      default: 'unisex',
    },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text' });
productSchema.index({ slug: 1 });
productSchema.index({ variant: 1 });
productSchema.index({ gender: 1 });
productSchema.index({ status: 1 });

export default mongoose.model('Product', productSchema);
