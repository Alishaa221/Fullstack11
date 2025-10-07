const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Get products by category
router.get('/category/:category', async (req, res) => {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
});

// Get products by variant color
router.get('/by-color/:color', async (req, res) => {
    const products = await Product.find({ "variants.color": req.params.color });
    res.json(products);
});

// POST route to add new product
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;