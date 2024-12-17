const DiaryEntry = require("../models/diary_entry");
const mongoose = require("mongoose");
const { generateToken } = require("../lib/token");


async function createEntry(req, res) {
    try {
        const { amount, date, businessName, category } = req.body

        if (!amount || !date || !businessName || !category) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newDiaryEntry = new DiaryEntry({ amount, date, businessName, category });

        await newDiaryEntry.save()
        // const newToken = generateToken(user_ID);
        res.status(201).json({ message: "Diary entry created" });
    }
    catch (error) {
        console.error('Error creating diary entry:', error);
        res.status(500).json({ message: 'Failed to create diary entry', error: error.message });
    }
}

    

async function getLastMonthSpending(req, res) {
    const token = generateToken(req.user_id);
    try{
        const spendingData = DiaryEntry.find({user_id: req.user_id})
        // console.log(spendingData)
        res.status(200).json({spendingData: spendingData, message: "Successfully retrieved last month's spending", token: token})
    } catch (error) {
        console.error('Error retrieving monthly spending: ', error);
        res.status(400).json({message: 'Failed to retrieve monthly spending: ', error, token: token})
    }
}

// async function findUser(req,res){
//     const user = await User.find({_id: req.user_id});
//     const token = generateToken(req.user_id);

//     const returnUserData = {
//         name: user[0].name,
//         currentSavings: user[0].currentSavings,
//         disposableIncome: user[0].disposableIncome,
//         foodAndDrinkGoal: user[0].foodAndDrinkGoal,
//         socialOutingsGoal: user[0].socialOutingsGoal,
//         entertainmentAndAppsGoal: user[0].entertainmentAndAppsGoal,
//         holidayAndTravelGoal: user[0].holidayAndTravelGoal,
//         healthAndBeautyGoal: user[0].healthAndBeautyGoal,
//         miscGoal: user[0].miscGoal
//     }
//     res.status(200).json({userData: returnUserData, token: token });
// }

const diaryEntryController = {
    createEntry,
    getLastMonthSpending
};
    module.exports = diaryEntryController;