// file: models/savings_goal.test.js

const mongoose = require("mongoose");
const SavingsGoal = require("../../models/savings_goal");

describe("SavingsGoal Model", () => {
    beforeAll(async () => {
        const uri = "mongodb://127.0.0.1:27017/savings_goal_test_db";
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    describe("Schema Validation", () => {
        test("should create a valid SavingsGoal document", async () => {
            const validSavingsGoal = new SavingsGoal({
                user_id: new mongoose.Types.ObjectId(),
                savingsTitle: "Vacation to Hawaii",
                savingsTarget: 5000,
                savingsCategory: "Holiday",
                startDate: new Date("2024-01-01"),
                endDate: new Date("2024-12-31"),
                isComplete: false,
            });

            const savedGoal = await validSavingsGoal.save();
            expect(savedGoal._id).toBeDefined();
            expect(savedGoal.savingsTitle).toBe("Vacation to Hawaii");
            expect(savedGoal.savingsTarget).toBe(5000);
            expect(savedGoal.savingsCategory).toBe("Holiday");
            expect(savedGoal.startDate).toEqual(new Date("2024-01-01"));
            expect(savedGoal.endDate).toEqual(new Date("2024-12-31"));
            expect(savedGoal.isComplete).toBe(false);
        });

        test("should throw validation error for missing required fields", async () => {
            const invalidSavingsGoal = new SavingsGoal({
                // no user_id, savingsTitle, savingsTarget, savingsCategory, or endDate
                startDate: new Date("2024-01-01"),
            });

            let error;
            try {
                await invalidSavingsGoal.save();
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.name).toBe("ValidationError");
            expect(error.errors.savingsTitle).toBeDefined();
            expect(error.errors.savingsTarget).toBeDefined();
            expect(error.errors.savingsCategory).toBeDefined();
            expect(error.errors.endDate).toBeDefined();
        });

        test("should throw validation error for invalid savingsCategory", async () => {
            const invalidCategoryGoal = new SavingsGoal({
                user_id: new mongoose.Types.ObjectId(),
                savingsTitle: "I don't exist",
                savingsTarget: 1000,
                savingsCategory: "NOOOOO",
                startDate: new Date("2024-01-01"),
                endDate: new Date("2024-12-31"),
            });

            let error;
            try {
                await invalidCategoryGoal.save();
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.name).toBe("ValidationError");
            expect(error.errors.savingsCategory).toBeDefined();
        });

        test("should assign default values correctly", async () => {
            const defaultSavingsGoal = new SavingsGoal({
                user_id: new mongoose.Types.ObjectId(),
                savingsTitle: "What am I",
                savingsTarget: 2000,
                savingsCategory: "Miscellaneous",
                endDate: new Date("2024-12-31"),
            });

            const savedGoal = await defaultSavingsGoal.save();
            expect(savedGoal.startDate).toBeDefined();
            expect(savedGoal.isComplete).toBeUndefined();
        });

        test("should handle optional user_id", async () => {
            const noUserIdGoal = new SavingsGoal({
                savingsTitle: "No User ID Test",
                savingsTarget: 3000,
                savingsCategory: "Emergency Funds",
                startDate: new Date("2024-02-01"),
                endDate: new Date("2024-12-01"),
            });

            const savedGoal = await noUserIdGoal.save();
            expect(savedGoal._id).toBeDefined();
            expect(savedGoal.user_id).toBeUndefined();
        });
    });
});
