const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");
const SavingsGoalController = require("../controllers/savings_goal");

router.post("/savings-goal", tokenChecker, SavingsGoalController.createSavingsGoal)
router.get("/savings-goal", tokenChecker, SavingsGoalController.getUserSavingsGoal)


module.exports = router;