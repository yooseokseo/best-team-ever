const express = require("express");
const router = express.Router();

const HistoryController = require('../controllers/history');
const checkAuth = require('../middleware/check-auth');

// Get medicine's history 
router.get('/:profile_id/:medicine_id', checkAuth, HistoryController.getMedHistory);

// Get specific history data
router.get('/:history_id', checkAuth, HistoryController.getHistory);


// Edit a history
router.patch('/edit/:history_id', checkAuth, HistoryController.editHistory);


module.exports = router;