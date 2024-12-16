const mongoose = require("mongoose");
const SavingsGoal = require("../models/savings_goal");
const { generateToken } = require("../lib/token");
const User = require("../models/user");


async function createSavingsGoal(req, res) {
    const token = generateToken(req.user_id);

    try {
        const { savingsTitle, savingsTarget, savingsCategory, startDate, endDate } = req.body

        if ( !savingsTitle || !savingsTarget || !savingsCategory || !startDate || !endDate) {
            console.log('not got all fields');
            return res.status(400).json({ message: 'All fields required'});
        }
        console.log('All fields present!')
        
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const userId = decoded.user_id;
        // const userId = req.user_id;
        // console.log('user id created: ', userId);
        const object_user_id = new mongoose.Types.ObjectId(req.user_id);
        const newSavingsGoal = new SavingsGoal({ user_id: object_user_id, savingsTitle, savingsTarget, savingsCategory, startDate, endDate });

        await newSavingsGoal.save()
        res.status(201).json({ message: 'Savings goal created'});
        } 
        catch (error) {
            console.error('Error creating savings goal', error);
            res.status(500).json({ message: 'Failed to create savings goal', error: error.message });
        }
    }

// async function getUserSavingsGoals(req, res) {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const userId = decoded.user_id;

//         const savingsGoals = await SavingsGoal.find({ user_id: userId });

//         res.status(200).json(savingsGoals);
//     } catch (error) {
//         console.error('Error fetching savings goals', error);
//         res.status(500).json({ message: 'Failed to fetch savings goals', error: error.message });
//     }
// }

async function getUserSavingsGoal(req, res) {
    try {
        const token = generateToken(req.user_id);
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const userId = decoded.user_id;

        const savingsGoals = await SavingsGoal.find({ user_id: req.user_id });

        res.status(200).json(savingsGoals);
    } catch (error) {
        console.error('Error fetching savings goals', error);
        res.status(500).json({ message: 'Failed to fetch savings goals', error: error.message });
    }
}

const SavingsGoalController = {
    createSavingsGoal: createSavingsGoal,
    getUserSavingsGoal: getUserSavingsGoal
}

module.exports = SavingsGoalController