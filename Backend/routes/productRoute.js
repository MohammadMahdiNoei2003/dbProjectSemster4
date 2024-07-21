const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductByID);
router.post('/', productController.postProduct);
router.put('/edit/:id', productController.putProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
