const express = require("express");
const tokenChecker = require("../middleware/tokenChecker")
const diaryEntryController = require ("../controllers/diaryEntry.js")
// const tokenChecker = require('../middleware/tokenChecker');
const router = express.Router();

router.post('/server/diary-entry', diaryEntryController.createEntry);
router.get('/get-last-month-spending', tokenChecker, diaryEntryController.getLastMonthSpending);

module.exports = router;