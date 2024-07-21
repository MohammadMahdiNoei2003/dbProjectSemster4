const express = require('express');
const router = express.Router();
const repController = require('../controllers/repController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, repController.getAllReps);
router.get('/:id', authMiddleware, repController.getRepByID);
router.post('/', authMiddleware, repController.postRep);
router.put('/edit/:id', authMiddleware, repController.putRep);
router.delete('/:id', authMiddleware, repController.deleteRep);
router.get('/all', authMiddleware, repController.getAllReps);

module.exports = router;