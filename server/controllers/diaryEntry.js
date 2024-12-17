const DiaryEntry = require("../models/diary_entry");
const mongoose = require("mongoose");
const { generateToken } = require("../lib/token");


async function createDiaryEntry(req, res) {
    try {
        const { amount, date, businessName, category } = req.body
        const user_id = req.user_id;

        if (!amount || !date || !businessName || !category) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newDiaryEntry = new DiaryEntry({ user_id, amount, date, businessName, category });

        await newDiaryEntry.save()
        // const newToken = generateToken(user_ID);
        res.status(201).json({ message: "Diary entry created" });
    }
    catch (error) {
        console.error('Error creating diary entry:', error);
        res.status(500).json({ message: 'Failed to create diary entry', error: error.message });
    }
}
async function getDiaryEntries(req, res) {
    try {
        const user_id = req.user_id;
        
        const entries = await DiaryEntry.find({ user_id }).sort({ date: -1 });
        
        res.status(200).json({ 
            entries,
            token: generateToken(user_id)  
        });
    } catch (error) {
        console.error('Error getting all diary entries:', error);
        res.status(500).json({ 
            message: 'Failed to retrieve diary entries', 
            error: error.message 
        });
    }
}

async function deleteDiaryEntry(req, res) {
    try {
        const user_id = req.user_id;
        const entry_id = req.params.id;
        
        const deletedEntry = await DiaryEntry.findOneAndDelete({_id: entry_id,
            user_id: user_id});
        
            if (!deletedEntry) {
                return res.status(404).json({ 
                    message: 'Diary entry not found or you do not have permission to delete it'
                });
            }
            
            res.status(200).json({ 
                message: 'Diary entry deleted successfully',
                deletedEntry
            });
    } catch (error) {
        console.error('Error deleting diary entry:', error);
        res.status(500).json({ 
            message: 'Failed to delete diary entry', 
            error: error.message 
        });
    }
}

    const diaryEntryController = {
        createDiaryEntry,
        getDiaryEntries,
        deleteDiaryEntry
    };

    module.exports = diaryEntryController;