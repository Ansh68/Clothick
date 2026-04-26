import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    slug: { type: String, trim: true, unique: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);
