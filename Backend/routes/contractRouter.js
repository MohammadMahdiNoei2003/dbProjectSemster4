const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, contractController.getAllContracts);
router.get('/:id', authMiddleware ,contractController.getContractByID);
router.post('/', authMiddleware, contractController.postContract);
router.put('/edit/:id', authMiddleware, contractController.putContract);
router.delete('/:id', authMiddleware, contractController.deleteContract);
router.get('/all', authMiddleware, contractController.getAllContracts);

module.exports = router;