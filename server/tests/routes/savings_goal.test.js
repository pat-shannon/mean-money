// file: savings_goal.test.js

const request = require("supertest");
const express = require("express");
const tokenChecker = require("../../middleware/tokenChecker");
const SavingsGoalController = require("../../controllers/savings_goal");


jest.mock("../../middleware/tokenChecker");
jest.mock("../../controllers/savings_goal");

describe("Savings Goal Routes", () => {
    let app;

    beforeEach(() => {
        jest.clearAllMocks();
        
        tokenChecker.mockImplementation((req, res, next) => next());
        
        app = express();
        app.use(express.json());
        
        const savingsGoalRoutes = require("../../routes/savings_goal");
        app.use("/savings", savingsGoalRoutes);
    });

    describe("POST /savings-goal", () => {
        it("creates a new savings goal", async () => {
            const mockGoal = { 
                id: 1, 
                target: 1000, 
                description: "Holiday fund",
                targetDate: "2024-12-31"
            };

            SavingsGoalController.createSavingsGoal.mockImplementation((req, res) => {
                res.status(201).json(mockGoal);
            });

            const response = await request(app)
                .post("/savings/savings-goal")
                .send({
                    target: 1000,
                    description: "Holiday fund",
                    targetDate: "2024-12-31"
                });

            expect(tokenChecker).toHaveBeenCalled();
            expect(SavingsGoalController.createSavingsGoal).toHaveBeenCalled();
            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockGoal);
        });
    });

    describe("GET /savings-goal", () => {
        it("retrieves user savings goals", async () => {
            const mockGoals = [
                { id: 1, target: 1000, description: "Holiday fund" },
                { id: 2, target: 5000, description: "New car" }
            ];

            SavingsGoalController.getUserSavingsGoal.mockImplementation((req, res) => {
                res.json(mockGoals);
            });

            const response = await request(app)
                .get("/savings/savings-goal");

            expect(tokenChecker).toHaveBeenCalled();
            expect(SavingsGoalController.getUserSavingsGoal).toHaveBeenCalled();
            expect(response.body).toEqual(mockGoals);
        });
    });

    describe("DELETE /savings-goal/:id", () => {
        it("deletes a savings goal", async () => {
            SavingsGoalController.deleteSavingGoal.mockImplementation((req, res) => {
                res.status(200).json({ message: "Goal deleted successfully" });
            });

            const response = await request(app)
                .delete("/savings/savings-goal/1");

            expect(tokenChecker).toHaveBeenCalled();
            expect(SavingsGoalController.deleteSavingGoal).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "Goal deleted successfully");
        });

        it("handles non-existent goal deletion", async () => {
            SavingsGoalController.deleteSavingGoal.mockImplementation((req, res) => {
                res.status(404).json({ message: "Goal not found" });
            });

            const response = await request(app)
                .delete("/savings/savings-goal/999");

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("message", "Goal not found");
        });
    });

    describe("Authentication Failure", () => {
        it("handles unauthorized requests", async () => {
            tokenChecker.mockImplementation((req, res, next) => {
                res.status(401).json({ message: "Unauthorized" });
            });

            const response = await request(app)
                .get("/savings/savings-goal");

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message", "Unauthorized");
        });
    });
});