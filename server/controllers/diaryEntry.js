const DiaryEntry = require("../models/diary_entry");
const mongoose = require("mongoose");
const { generateToken } = require("../lib/token");


async function createDiaryEntry(req, res) {
    const token = generateToken(req.user_id);
    try {
        const { amount, date, businessName, category } = req.body
        const user_id = req.user_id;

        if (!amount || !date || !businessName || !category) {
            return res.status(400).json({ message: 'All fields are required.', token});
        }

        const newDiaryEntry = new DiaryEntry({ user_id, amount, date, businessName, category });

        await newDiaryEntry.save()
        // const newToken = generateToken(user_ID);
        res.status(201).json({ message: "Diary entry created", token });
    }
    catch (error) {
        console.error('Error creating diary entry:', error);
        res.status(500).json({ message: 'Failed to create diary entry', error: error.message, token });
    }
}
async function getDiaryEntries(req, res) {
    const token = generateToken(req.user_id);
    try {
        const user_id = req.user_id;
        
        const entries = await DiaryEntry.find({ user_id }).sort({ date: -1 });
        
        res.status(200).json({ 
            entries,
            token
        });
    } catch (error) {
        console.error('Error getting all diary entries:', error);
        res.status(500).json({ 
            message: 'Failed to retrieve diary entries', 
            error: error.message,
            token
        });
    }
}

async function deleteDiaryEntry(req, res) {
    const token = generateToken(req.user_id);
    try {
        const user_id = req.user_id;
        const entry_id = req.params.id;
        
        const deletedEntry = await DiaryEntry.findOneAndDelete({_id: entry_id,
            user_id: user_id});
        
            if (!deletedEntry) {
                return res.status(404).json({ 
                    message: 'Diary entry not found or you do not have permission to delete it', token
                });
            }
            
            res.status(200).json({ 
                message: 'Diary entry deleted successfully',
                deletedEntry,
                token
            });
    } catch (error) {
        console.error('Error deleting diary entry:', error);
        res.status(500).json({ 
            message: 'Failed to delete diary entry', 
            error: error.message,
            token 
        });
    }
}


async function getSpendingForPeriod(req, res) {
    const token = generateToken(req.user_id);
    const user_id = req.user_id;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    try{
        const spendingData = await DiaryEntry.find({user_id, date:{$gte: startDate, $lte: endDate }})
        let spendingValues = {
            'Food and Drink': 0,
            'Social and Entertainment': 0,
            'Shopping': 0,
            'Holiday and Travel': 0,
            'Health and Beauty': 0,
            'Miscellaneous': 0,
        }
        spendingData.forEach((entry) => {
            spendingValues[entry.category] += entry.amount;
        })
        res.status(200).json({spendingValues, token})
    } catch (error) {
        console.error('Error retrieving spending for period: ', error);
        res.status(400).json({message: 'Failed to retrieve spending for period: ', error, token: token})
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
        createDiaryEntry,
        getDiaryEntries,
        deleteDiaryEntry,
        getSpendingForPeriod
};
    module.exports = diaryEntryController;