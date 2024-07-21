const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',  customerController.getAllCustomers);
router.get('/:id',  customerController.getCustomerByID);
router.post('/',  customerController.postCustomer);
router.put('/edit/:id',  customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;