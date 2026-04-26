import Order from '../models/Order.js';

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .sort({ orderDate: -1 })
            .populate('products.product', 'name slug images price');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, userId: req.user._id })
            .populate('products.product', 'name slug images price');
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
