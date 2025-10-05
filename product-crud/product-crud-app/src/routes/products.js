const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/productsController');
const productsController = new ProductsController();

// Create a new product
router.post('/', productsController.createProduct);

// Retrieve all products
router.get('/', productsController.getAllProducts);

// Update a product by ID
router.put('/:id', productsController.updateProduct);

// Delete a product by ID
router.delete('/:id', productsController.deleteProduct);

module.exports = router;