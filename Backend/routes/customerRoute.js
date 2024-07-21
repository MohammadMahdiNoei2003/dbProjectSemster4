const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, customerController.getAllCustomers);
router.get('/:id', authMiddleware, customerController.getCustomerByID);
router.post('/', authMiddleware, customerController.postCustomer);
router.put('/edit/:id', authMiddleware, customerController.updateCustomer);
router.delete('/:id', authMiddleware, customerController.deleteCustomer);

module.exports = router;