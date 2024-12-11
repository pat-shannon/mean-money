const DiaryEntry = require("../models/diary_entry")
const { generateToken } = require("../lib/token");


async function createEntry(req, res) {
    
    const amount = req.body.name
    const date = req.body.date
    const businessName = req.body.businessName
    const category = req.body.category

    const diaryEntry = new DiaryEntry({amount, date, businessName, category});
  
    await diaryEntry
    .save()
    .then
  
    const newToken = generateToken(user_ID);
    res.status(201).json({ message: "Diary entry created", token: newToken });
  }


const diaryEntryController = {
    createEntry: createEntry};

module.exports = diaryEntryController;