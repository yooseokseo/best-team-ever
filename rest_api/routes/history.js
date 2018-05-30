const express = require("express");
const router = express.Router();

const HistoryController = require('../controllers/history');
const checkAuth = require('../middleware/check-auth');

// Get all profile's history 
router.get('/:profile_id', checkAuth, HistoryController.getProfileHistory);

// Get medicine's history 
router.get('/:profile_id/:medicine_id', checkAuth, HistoryController.getMedHistory);


module.exports = router;