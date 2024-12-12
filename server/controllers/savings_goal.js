const mongoose = require("mongoose");
const SavingsGoal = require("../models/savings_goal");
const { generateToken } = require("../lib/token");
const User = require("../models/user");


async function createSavingsGoal(req, res) {
    try {
        const { savingsTitle, savingsTarget, savingsCategory, startDate, endDate } = req.body

        if ( !savingsTitle || !savingsTarget || !savingsCategory || !startDate || !endDate) {
            return res.status(400).json({ message: 'All fields required'});
        }

        const newSavingsGoal = new SavingsGoal({ savingsTitle, savingsTarget, savingsCategory, startDate, endDate });

        await newSavingsGoal.save()
        res.status(201).json({ message: 'Savings goal created'});
        } 
        catch (error) {
            console.error('Error creating savings goal', error);
            res.status(500).json({ message: 'Failed to create savings goal', error: error.message });
        }
    }


const SavingsGoalController = {
    createSavingsGoal: createSavingsGoal
}

module.exports = SavingsGoalController