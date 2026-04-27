import mongoose from 'mongoose';

const orderProductSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    paymentProvider: { type: String, enum: ['razorpay'], default: 'razorpay' },
    razorpayOrderId: { type: String, required: true, index: true },
    razorpayPaymentId: { type: String, default: '' },
    razorpaySignature: { type: String, default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    products: [orderProductSchema],
    totalPrice: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, default: 'inr' },
    amountDiscount: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    orderDate: { type: Date, required: true, default: Date.now },
    // Razorpay doesn't require invoices for this flow; keep optional placeholders.
    invoice: {
      id: String,
      number: String,
      hosted_invoice_url: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
