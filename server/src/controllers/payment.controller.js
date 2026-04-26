import razorpay from '../config/razorpay.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { createHmac } from 'node:crypto';

function calcTotalAmountInPaise(items) {
    const amount = items.reduce((sum, item) => {
        const price = Number(item?.product?.price ?? 0);
        const qty = Number(item?.quantity ?? 0);
        return sum + price * qty;
    }, 0);
    return Math.round(amount * 100); // INR paise
}

export const createRazorpayOrder = async (req, res) => {
    try {
        const { items } = req.body;
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Cart items are required' });
        }

        // Fetch products from DB to get real prices
        const productIds = items.map((item) => item.product?._id).filter(Boolean);
        const productsDb = await Product.find({ _id: { $in: productIds } });

        if (productsDb.length !== productIds.length) {
            return res.status(400).json({ error: 'Some products not found' });
        }

        let totalAmount = 0;
        const orderProducts = [];

        for (const item of items) {
            const product = productsDb.find((p) => p._id.toString() === item.product?._id);
            if (product) {
                const quantity = Number(item.quantity || 1);
                totalAmount += product.price * quantity;
                orderProducts.push({
                    product: product._id,
                    quantity,
                });
            }
        }

        // Amount in paise
        const amountPaise = Math.round(totalAmount * 100);

        if (amountPaise <= 0) {
            return res.status(400).json({ error: 'Invalid order amount' });
        }

        const orderNumber = crypto.randomUUID();

        // Create Razorpay Order
        const rpOrder = await razorpay.orders.create({
            amount: amountPaise,
            currency: 'INR',
            receipt: orderNumber,
            notes: {
                orderNumber,
                userId: String(req.user?._id),
            },
        });

        // Create Pending Order in DB
        const newOrder = await Order.create({
            orderNumber,
            razorpayOrderId: rpOrder.id,
            razorpayPaymentId: '', // Filled on success
            razorpaySignature: '', // Filled on success
            userId: req.user._id,
            customerName: req.user?.name || req.user?.email,
            email: req.user?.email,
            products: orderProducts,
            totalPrice: totalAmount,
            currency: 'inr',
            amountDiscount: 0,
            status: 'pending',
            orderDate: new Date(),
        });

        return res.json({
            keyId: process.env.RAZORPAY_KEY_ID,
            orderId: rpOrder.id,
            amount: rpOrder.amount,
            currency: rpOrder.currency,
            orderNumber,
            dbOrderId: newOrder._id, // Send DB ID if needed
        });
    } catch (err) {
        console.error('Razorpay create-order error:', err);
        return res.status(500).json({ error: err.message || 'Create order failed' });
    }
};

export const verifyRazorpayPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ error: 'Missing Razorpay payment fields' });
        }

        // Verify signature
        const expected = createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (expected !== razorpay_signature) {
            return res.status(400).json({ error: 'Invalid payment signature' });
        }

        // Find Order by Razorpay Order ID
        const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (order.status === 'paid') {
            return res.json({ ok: true, orderId: order._id, message: 'Already paid' });
        }

        // Update Order
        order.razorpayPaymentId = razorpay_payment_id;
        order.razorpaySignature = razorpay_signature;
        order.status = 'paid';
        await order.save();

        return res.json({ ok: true, orderId: order._id });
    } catch (err) {
        console.error('Razorpay verify error:', err);
        return res.status(500).json({ error: err.message || 'Verification failed' });
    }
};
