const mongoose = require("mongoose");

const DiaryEntrySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    businessName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: [
            'Food and Drink',
            'Social and Entertainment',
            'Shopping',
            'Holiday and Travel',
            'Health and Beauty',
            'Miscellaneous'
        ],
        required: true
    },
    isSavingsContribution: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

const DiaryEntry = mongoose.model("DiaryEntry", DiaryEntrySchema);
module.exports = DiaryEntry;