const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, productController.getAllProducts);
router.get('/:id', authMiddleware, productController.getProductByID);
router.post('/', authMiddleware, productController.postProduct);
router.put('/edit/:id', authMiddleware, productController.putProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
