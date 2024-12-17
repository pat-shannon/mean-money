const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker")
const diaryEntryController = require ("../controllers/diaryEntry.js")


router.post('/diary-entry', tokenChecker, diaryEntryController.createDiaryEntry);
router.get('/diary-entry', tokenChecker, diaryEntryController.getDiaryEntries);
router.delete('/diary-entry/:id', tokenChecker, diaryEntryController.deleteDiaryEntry);

module.exports = router;