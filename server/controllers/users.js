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

// Find own user

async function findUser(req,res){
    console.log('yoooo')
    const user = await User.find({_id: req.user_id});
    const token = generateToken(req.user_id);

    const returnUserData = {
        name: user[0].name,
        currentSavings: user[0].currentSavings,
        disposableIncome: user[0].disposableIncome,
        foodAndDrinkGoal: user[0].foodAndDrinkGoal,
        socialOutingsGoal: user[0].socialOutingsGoal,
        entertainmentAndAppsGoal: user[0].entertainmentAndAppsGoal,
        holidayAndTravelGoal: user[0].holidayAndTravelGoal,
        healthAndBeautyGoal: user[0].healthAndBeautyGoal,
        miscGoal: user[0].miscGoal
    }
    res.status(200).json({userData: returnUserData, token: token });
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
    const token = generateToken(req.user_id);
    try{
        
        const id = req.user_id
        for (const key in req.body){
            if (!isNaN(req.body[key]) && (req.body[key])>=0){
            
            }
        }
        const updateSpendingGoals = await User.updateOne(
            {_id: req.user_id},
            {$set: {
                currentSavings: req.body.currentSavings.toFixed(2),
                disposableIncome: req.body.disposableIncome.toFixed(2),
                foodAndDrinkGoal: req.body.foodAndDrinkGoal.toFixed(2),
                socialOutingsGoal: req.body.socialOutingsGoal.toFixed(2),
                entertainmentAndAppsGoal: req.body.entertainmentAndAppsGoal.toFixed(2),
                holidayAndTravelGoal: req.body.holidayAndTravelGoal.toFixed(2),
                healthAndBeautyGoal: req.body.healthAndBeautyGoal.toFixed(2),
                miscGoal: req.body.miscGoal.toFixed(2)
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
    findUser,
};
module.exports = UsersController;
