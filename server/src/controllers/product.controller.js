import Product from '../models/Product.js';
import Category from '../models/Category.js';

export const getProducts = async (req, res) => {
    try {
        const { gender, status, tag, q, variant, sort: sortParam } = req.query;
        let filter = {};

        if (q) {
            filter.name = new RegExp(q, 'i');
        }

        if (gender) {
            filter.gender = gender;
        }

        if (status) {
            filter.status = status;
        }

        if (variant) {
            filter.variant = variant;
        }

        if (tag) {
            if (['men', 'women', 'kids'].includes(tag)) {
                filter.gender = tag;
            } else if (tag === 'new') {
                filter.status = 'new';
            } else if (tag === 'hot') {
                filter.status = 'hot';
            } else if (tag === 'sale') {
                filter.status = 'sale';
            }
        }

        let sort = { name: 1 };
        if (sortParam === 'price_asc') {
            sort = { price: 1 };
        } else if (sortParam === 'price_desc') {
            sort = { price: -1 };
        } else if (sortParam === 'name_desc') {
            sort = { name: -1 };
        } else if (sortParam === 'newest') {
            sort = { createdAt: -1 };
        } else if (filter.status === 'new' || tag === 'new') {
            sort = { createdAt: -1 };
        }

        const products = await Product.find(filter).sort(sort).populate('categories', 'title slug');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProductsByVariant = async (req, res) => {
    try {
        const products = await Product.find({ variant: req.params.variant })
            .sort({ name: 1 })
            .populate('categories', 'title slug');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const cat = await Category.findOne({ slug: req.params.slug });
        if (!cat) return res.json([]);
        const products = await Product.find({ categories: cat._id })
            .sort({ name: 1 })
            .populate('categories', 'title slug');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug }).populate(
            'categories',
            'title slug'
        );
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const searchProducts = async (req, res) => {
    try {
        const q = (req.query.q || '').trim();
        const filter = q ? { name: new RegExp(q, 'i') } : {};
        const products = await Product.find(filter)
            .sort({ name: 1 })
            .populate('categories', 'title slug');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, intro, description, price, discount, categories, stock, status, variant, gender } = req.body;

        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => file.path);
        }

        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        // const categoryIds = categories ? categories.split(',') : []; // If sent as comma separated string

        const product = await Product.create({
            name,
            slug,
            intro,
            description,
            price: Number(price),
            discount: Number(discount || 0),
            // categories: categoryIds, 
            stock: Number(stock || 0),
            status,
            variant,
            gender: gender || 'unisex',
            images
        });

        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
