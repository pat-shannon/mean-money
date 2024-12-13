const User = require("../models/user");
const mongoose = require("mongoose");
const { generateToken } = require("../lib/token");

// Create a new User

async function create(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = new User({
            name,
            email,
            password,
        });

        const savedUser = await user.save();

        res.status(201).json({
            message: 'User created successfully',
            user: savedUser,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Something went wrong while creating user',
            error: error.message,
        });
    }
}


// Find a User by Email

function findByEmail(req, res) {
    const { email } = req.params;
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        })
        .catch((err) => {
            console.error("Error finding user by email:", err);
            res.status(500).json({ message: "Something went wrong" });
        });
}


// Find a User by ID

async function findById(req, res) {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid User ID format" });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error("Error finding user by ID:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

// Set a User's spending goals

async function setSpendingGoals(req, res){
    try{
        const token = generateToken(req.user_id);
        const id = req.user_id
        const updateSpendingGoals = await User.updateOne(
            {_id: req.user_id},
            {$set: {
                currentSavings: req.body.currentSavings,
                disposableIncome: req.body.disposableIncome,
                foodAndDrinkGoal: req.body.foodAndDrinkGoal,
                socialOutingsGoal: req.body.socialOutingsGoal,
                entertainmentAndAppsGoal: req.body.entertainmentAndAppsGoal,
                holidayAndTravelGoal: req.body.holidayAndTravelGoal,
                healthAndBeautyGoal: req.body.healthAndBeautyGoal,
                miscGoal: req.body.miscGoal
            }}).then((updateSpendingGoals) => {
                res.status(201).json({token: token});
            });

    } catch (error) {
        res.status(400).json({message: "Error setting user spending goals", token: token})
    }
}

const UsersController = {
    create: create,
    findByEmail,
    findById,
    setSpendingGoals,
};
module.exports = UsersController;
