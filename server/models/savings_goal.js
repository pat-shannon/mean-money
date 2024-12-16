const mongoose = require("mongoose");

const SavingsGoalSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    savingsTitle: {
    type: String,
    required: true,
    },
    savingsTarget: {
    type: Number,
    required: true,
    },
    savingsCategory: {
    type: String,
    enum: [
        'Holiday',
        'House',
        'Emergency Funds',
        'Education',
        'Wedding',
        'Family',
        'Business',
        'Miscellaneous'
    ],
    required: true
    },
    startDate: {
    type: Date,
    default: Date.now,
    required: true,
    },
    endDate: {
    type: Date,
    required: true,
    },
    isComplete: {
    type: Boolean,
    },
});


const SavingsGoal = mongoose.model("SavingsGoal", SavingsGoalSchema);
module.exports = SavingsGoal;