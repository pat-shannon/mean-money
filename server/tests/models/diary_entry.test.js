// file models/diary_entry.test.js

const mongoose = require("mongoose");
const DiaryEntry = require("../../models/diary_entry");

describe("DiaryEntry Model", () => {
    beforeAll(async () => {
        const uri = "mongodb://127.0.0.1:27017/diary_entry_test_db";
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    describe("Schema Validation", () => {
        test("should create a valid DiaryEntry document", async () => {
            const validDiaryEntry = new DiaryEntry({
                user_id: new mongoose.Types.ObjectId(),
                amount: 50.5,
                date: new Date(),
                businessName: "Santa's grotto",
                category: "Food and Drink",
                isSavingsContribution: false,
            });

            const savedDiaryEntry = await validDiaryEntry.save();
            expect(savedDiaryEntry._id).toBeDefined();
            expect(savedDiaryEntry.amount).toBe(50.5);
            expect(savedDiaryEntry.businessName).toBe("Santa's grotto");
        });

        test("should throw validation error for missing required fields", async () => {
            const invalidDiaryEntry = new DiaryEntry({
                amount: 100,
                businessName: "Pix'n'mix",
                isSavingsContribution: true,
                // no userid, category or date
            });

            let error;
            try {
                await invalidDiaryEntry.save();
            } catch (err) {
                error = err;
            }
            expect(error).toBeDefined();
            expect(error.name).toBe("ValidationError");
            expect(error.errors.user_id).toBeDefined();
            expect(error.errors.category).toBeDefined();
        });

        test("should throw validation error for invalid category", async () => {
            const invalidCategoryEntry = new DiaryEntry({
                user_id: new mongoose.Types.ObjectId(),
                amount: 20,
                date: new Date(),
                businessName: "Busines One",
                category: "Goofing around",
                isSavingsContribution: false,
            });

            let error;
            try {
                await invalidCategoryEntry.save();
            } catch (err) {
                error = err;
            }
            expect(error).toBeDefined();
            expect(error.name).toBe("ValidationError");
            expect(error.errors.category).toBeDefined();
        });

        test("should assign default values correctly", async () => {
            const defaultDiaryEntry = new DiaryEntry({
                user_id: new mongoose.Types.ObjectId(),
                amount: 75,
                businessName: "Costa",
                category: "Miscellaneous",
            });

            const savedEntry = await defaultDiaryEntry.save();
            expect(savedEntry.date).toBeDefined();
            expect(savedEntry.isSavingsContribution).toBe(false);
        });

        test("should respect timestamps option", async () => {
            const timestampEntry = new DiaryEntry({
                user_id: new mongoose.Types.ObjectId(),
                amount: 30,
                businessName: "Timestamp Test",
                category: "Shopping",
            });

            const savedEntry = await timestampEntry.save();
            expect(savedEntry.createdAt).toBeDefined();
            expect(savedEntry.updatedAt).toBeDefined();
        });
    });
});
