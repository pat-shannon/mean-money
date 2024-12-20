// file: diarEntry.test.js

const request = require("supertest");
const express = require("express");
const tokenChecker = require("../../middleware/tokenChecker");
const diaryEntryController = require("../../controllers/diaryEntry");

// Mock middleware and controller
jest.mock("../../middleware/tokenChecker");
jest.mock("../../controllers/diaryEntry");

describe("diaryEntry Route", () => {
    let app;

    beforeEach(() => {
        jest.clearAllMocks();
        
        // Setup default middleware mock
        tokenChecker.mockImplementation((req, res, next) => next());
        
        app = express();
        app.use(express.json());
        
        const diaryEntryRoute = require("../../routes/diaryEntry");
        app.use("/diary", diaryEntryRoute);
    });

    describe("POST /get-spending-for-period", () => {
        it("uses token checker middleware and calls controller method", async () => {
            const mockSpendingData = { total: 500 };
            diaryEntryController.getSpendingForPeriod.mockImplementation((req, res) => {
                res.json(mockSpendingData);
            });

            const response = await request(app)
                .post("/diary/get-spending-for-period")
                .send({ startDate: "2024-01-01", endDate: "2024-01-31" });

            expect(tokenChecker).toHaveBeenCalled();
            expect(diaryEntryController.getSpendingForPeriod).toHaveBeenCalled();
            expect(response.body).toEqual(mockSpendingData);
        });
    });

    describe("POST /diary-entry", () => {
        it("creates a new diary entry", async () => {
            const mockEntry = { id: 1, amount: 100, category: "Food and Drink" };
            diaryEntryController.createDiaryEntry.mockImplementation((req, res) => {
                res.status(201).json(mockEntry);
            });

            const response = await request(app)
                .post("/diary/diary-entry")
                .send({ amount: 100, category: "Food and Drink" });

            expect(tokenChecker).toHaveBeenCalled();
            expect(diaryEntryController.createDiaryEntry).toHaveBeenCalled();
            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockEntry);
        });
    });

    describe("GET /diary-entry", () => {
        it("retrieves diary entries", async () => {
            const mockEntries = [
                { id: 1, amount: 100, category: "Food and Drink" },
                { id: 2, amount: 200, category: "Travel" }
            ];
            diaryEntryController.getDiaryEntries.mockImplementation((req, res) => {
                res.json(mockEntries);
            });

            const response = await request(app)
                .get("/diary/diary-entry");

            expect(tokenChecker).toHaveBeenCalled();
            expect(diaryEntryController.getDiaryEntries).toHaveBeenCalled();
            expect(response.body).toEqual(mockEntries);
        });
    });

    describe("DELETE /diary-entry/:id", () => {
        it("deletes a diary entry", async () => {
            diaryEntryController.deleteDiaryEntry.mockImplementation((req, res) => {
                res.status(200).json({ message: "Entry deleted" });
            });

            const response = await request(app)
                .delete("/diary/diary-entry/1");

            expect(tokenChecker).toHaveBeenCalled();
            expect(diaryEntryController.deleteDiaryEntry).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "Entry deleted");
        });
    });

    describe("Authentication Failure", () => {
        it("handles unauthorized requests", async () => {
            tokenChecker.mockImplementation((req, res, next) => {
                res.status(401).json({ message: "Unauthorized" });
            });

            const response = await request(app)
                .get('/diary/diary-entry');

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message", "Unauthorized");
        });
    });
});