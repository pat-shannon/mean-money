const User = require("../models/user");
const mongoose = require("mongoose");

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


const UsersController = {
    create: create,
    findByEmail,
    findById,
};
module.exports = UsersController;
