const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/productController');


router.post('/', controller.createProduct);
router.get('/', controller.getProducts);
router.get('/:id', controller.getProductById);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
