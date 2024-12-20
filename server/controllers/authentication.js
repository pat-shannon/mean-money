const { generateToken } = require("../lib/token");
const User = require("../models/user");
const bcrypt = require('bcrypt');


async function createToken(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log(`Auth Error: User with email ${email} not found`);
            return res.status(401).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Auth Error: Passwords do not match");
            return res.status(401).json({ message: "Password incorrect" });
        }

        const token = generateToken(user.id);
        res.status(201).json({ token: token, message: "OK" });
    } catch (error) {
        console.log("Error in createToken:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { createToken };