const express = require("express");

const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker")
const diaryEntryController = require ("../controllers/diaryEntry.js")



router.post('/get-spending-for-period', tokenChecker, diaryEntryController.getSpendingForPeriod);
router.post('/diary-entry', tokenChecker, diaryEntryController.createDiaryEntry);
router.get('/diary-entry', tokenChecker, diaryEntryController.getDiaryEntries);
router.delete('/diary-entry/:id', tokenChecker, diaryEntryController.deleteDiaryEntry);

router.get("/savings-contributions", tokenChecker, async (req, res) => {
    try {
        const userId = req.user.id;
        
        const savingsEntries = await DiaryEntry.find({
            user: userId,
            isSavingsContribution: true
        });

        const totalSavings = savingsEntries.reduce((total, entry) => total + entry.amount, 0);

        res.json({
            totalSavings,
            contributions: savingsEntries
        });
    } catch (error) {
        console.error("Error retrieving savings contributions:", error);
        res.status(500).json({
            message: "Error retrieving savings contributions",
            error: error.message
        });
    }
});

module.exports = router;