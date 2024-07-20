const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');

router.get('/', contractController.getAllContracts);
router.get('/:id', contractController.getContractByID);
router.post('/', contractController.postContract);
router.put('/edit/:id', contractController.putContract);
router.delete('/:id', contractController.deleteContract);
router.get('/all', contractController.getAllContracts);

module.exports = router;