import Category from '../models/Category.js';

export const getCategories = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 0;
        const query = Category.find().sort({ title: 1 });
        const categories = limit ? await query.limit(limit).lean() : await query.lean();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCategoryBySlug = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
