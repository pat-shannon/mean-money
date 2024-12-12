const express = require("express");
const diaryEntryController = require ("../controllers/diaryEntry.js")
// const tokenChecker = require('../middleware/tokenChecker');
const router = express.Router();

router.post('/server/diary-entry', diaryEntryController.createEntry);

module.exports = router;