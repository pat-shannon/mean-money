const mongoose = require("mongoose");

const DiaryEntrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    businessName: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: [
            'Food and Drink',
            'Social Outings',
            'Entertainment and Apps',
            'Holiday and Travel',
            'Health and Beauty',
            'Miscellaneous'
        ],
        required: true
    },
});

const DiaryEntry = mongoose.model("DiaryEntry", DiaryEntrySchema);
module.exports = DiaryEntry;