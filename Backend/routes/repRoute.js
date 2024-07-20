const express = require('express');
const router = express.Router();
const repController = require('../controllers/repController');

router.get('/', repController.getAllReps);
router.get('/:id', repController.getRepByID);
router.post('/', repController.postRep);
router.put('/edit/:id', repController.putRep);
router.delete('/:id', repController.deleteRep);
router.get('/all', repController.getAllReps);

module.exports = router;