const mongoose = require('mongoose');
require('dotenv').config();
async function connectToDatabase() {
    const mongoDbUrl = process.env.MONGODB_URL;

    await mongoose.connect(mongoDbUrl)
    .then(() => {
        console.log('Connected to MongoDB.');
    }).catch(error => {
        console.log(error);
    });
}

module.exports = { connectToDatabase };

