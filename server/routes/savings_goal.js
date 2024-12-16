const express = require("express");
const router = express.Router();
const SavingsGoalController = require("../controllers/savings_goal");

router.post("/savings-goal", SavingsGoalController.createSavingsGoal)
router.get("/savings-goal", SavingsGoalController.getUserSavingsGoal)


module.exports = router;