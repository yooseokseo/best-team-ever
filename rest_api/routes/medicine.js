const express = require("express");
const router = express.Router();

const MedsController = require("../controllers/medicine");
const HistoryController = require("../controllers/history");
const checkAuth = require('../middleware/check-auth');




// Create new medicine
router.post('/new/:profile_id', checkAuth, 
			MedsController.newMedicine, HistoryController.newHistory);

// Get specific medicine data
router.get('/:medicine_id', checkAuth, MedsController.getMedicine);

// Edit specific medicine
router.patch('/edit/:medicine_id', checkAuth, MedsController.editMedicine);

// Delete specific medicine
router.delete('/delete/:medicine_id', checkAuth, MedsController.deleteMedicine);




module.exports = router;
