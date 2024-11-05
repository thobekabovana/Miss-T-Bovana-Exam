const express = require('express');
const router = express.Router();
const ProductController = require('../Components/ProductController');
const multer = require('multer');

// Set up Multer to store images temporarily
const upload = multer({ storage: multer.memoryStorage() });

// Get all products
router.get('/', ProductController.getAllProducts);

// Delete a product
router.delete('/:id', ProductController.deleteProduct);

// Update a product, including image uploads
router.put('/:id', upload.array('images'), ProductController.updateProduct);

module.exports = router;
