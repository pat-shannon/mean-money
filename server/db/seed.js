require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/user");
const DiaryEntry = require("../models/diary_entry");
const SavingsGoal = require("../models/savings_goal");
const { connectToDatabase } = require("./db");

async function seedData() {
    await connectToDatabase();
    await mongoose.connection.db.dropDatabase();
    console.log("Cleared existing data.");

    try {
        const users = [
            {
                name: "Reena",
                email: "reena@example.com",
                password: "Password123!",
                currentSavings: 100,
                disposableIncome: 1500,
                foodAndDrinkGoal: 150,
                socialAndEntertainmentGoal: 100,
                shoppingGoal: 0,
                holidayAndTravelGoal: 50,
                healthAndBeautyGoal: 0,
                miscGoal:0
            },
            {
                name: "Naomi",
                email: "naomi@example.com",
                password: "123456789",
                currentSavings: 0,
                disposableIncome: 3000,
                foodAndDrinkGoal: 250,
                socialAndEntertainmentGoal: 250,
                shoppingGoal: 100,
                holidayAndTravelGoal: 100,
                healthAndBeautyGoal: 100,
                miscGoal: 0
            },
        ];

        for (const userData of users) {
            const user = new User(userData);
            await user.save();
            console.log(`User ${user.name} created.`);
        }

        const diaryEntries = [
            {
                amount: 100,
                date: "2024/03/03",
                businessName: "Starbucks",
                category: "Food and Drink",
            },
            {
                amount: 100,
                date: "2024/03/03",
                businessName: "Starbucks",
                category: "Food and Drink",
            },
        ];

        for (const diaryData of diaryEntries) {
            const diary_entry = new DiaryEntry(diaryData);
            await diary_entry.save();
            console.log(`Entry by ${diary_entry.name} created.`);
        }
        const savingGoals = [
            {
                savingsTitle: "Miami",
                savingsTarget: 25,
                savingsCategory: 'Holiday',
                startDate: 2024/12/17,
                endDate:2025/1/30,
                isComplete: false
            },
            {
                savingsTitle: "Barbados",
                savingsTarget: 25,
                savingsCategory: 'Holiday',
                startDate: 2024/12/17,
                endDate:2025/1/30,
                isComplete: false
            },
        ];

        for (const savingData of savingGoals) {
            const saving_goal = new SavingsGoal(savingData);
            await saving_goal.save();
            console.log(`Entry by ${saving_goal.name} created.`);
        }

        console.log("Seeding completed successfully!");
    } catch (err) {
        console.error("Error seeding data:", err);
    } finally {
        mongoose.disconnect();
        console.log("Disconnected from database.");
    }
}

seedData().catch((err) => {
    console.error("Error running seed script:", err);
});