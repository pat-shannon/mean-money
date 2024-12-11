const mongoose = require("mongoose");
const SavingsGoal = require("../models/savings_goal");
const { generateToken } = require("../lib/token");
const User = require("../models/user");


async function createSavingsGoal(req, res) {
    try {
        const newSavingGoalData = {
            savingsTitle: req.body.savingsTitle,
            savingsTarget: req.body.savingsTarget,
            savingsCategory: req.body.savingsCategory,
            startDate: req.body.startDate || Date.now(),
            endDate: req.body.endDate,
            isComplete: false,
        };
        const savingsGoal = new SavingsGoal(newSavingGoalData);
        await savingsGoal.save();

        const newToken = generateToken(req.user_id);

        res.status(201).json({
            message: "Savings goal created successfully",
            token: newToken,
            savingsGoalId: savingsGoal._id.toString(),
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating savings goal",
            error: error.message,
        });
    }
}



const SavingsGoalController = {
    createSavingsGoal: createSavingsGoal
}

module.exports = SavingsGoalController