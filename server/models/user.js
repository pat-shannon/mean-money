const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    currentSavings: {
        type: Number,
        default: 0,
    },
    disposableIncome: {
        type: Number,
        default: 0,
        min: [0, 'Disposable income must be a positive number']
    },
    foodAndDrinkGoal: {
        type: Number,
        default: 0,
        min: [0, 'Estimate cannot be negative']
    },
    socialOutingsGoal: {
        type: Number,
        default: 0,
        min: [0, 'Estimate cannot be negative']
    },
    entertainmentAndAppsGoal: {
        type: Number,
        default: 0,
        min: [0, 'Estimate cannot be negative']
    },
    holidayAndTravelGoal: {
        type: Number,
        default: 0,
        min: [0, 'Estimate cannot be negative']
    },
    healthAndBeautyGoal: {
        type: Number,
        default: 0,
        min: [0, 'Estimate cannot be negative']
    },
    miscGoal: {
        type: Number,
        default: 0,
        min: [0, 'Estimate cannot be negative']
    }
});

UserSchema.path('email').validate(function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}, 'Invalid email format');

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);

        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error)
    }
});

UserSchema.methods.comparePassword = async function(userPassword) {
    return bcrypt.compare(userPassword, this.password);
}

const User = mongoose.model("User", UserSchema);
module.exports = User;