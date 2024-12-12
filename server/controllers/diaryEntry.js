const DiaryEntry = require("../models/diary_entry");
const mongoose = require("mongoose");
// const { generateToken } = require("../lib/token");


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

    const diaryEntryController = {
        createEntry
    };

    module.exports = diaryEntryController;