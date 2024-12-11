const express = require("express");
const router = express.Router();

const diaryEntryController = require ("../controllers/diaryEntry")

router.post("/", diaryEntryController.createEntry);

module.exports = router;