// file: financialAdvice.test.js

const request = require("supertest");
const express = require("express");
const authenticateToken = require("../../middleware/authMiddleware");
const FinancialAdvisorController = require("../../controllers/financialAdvice");

jest.mock("../../middleware/authMiddleware");
jest.mock("../../controllers/financialAdvice");

describe('Financial Advice Routes', () => {
    let app;

    beforeEach(() => {
        jest.clearAllMocks();
        
        authenticateToken.mockImplementation((req, res, next) => next());
        
        app = express();
        app.use(express.json());
        
        const financialAdviceRoute = require("../../routes/financialAdvice");
        app.use("/advice", financialAdviceRoute);
    });

    describe("GET /", () => {
        it("returns financial advice when authenticated", async () => {
            const mockAdvice = {
                advice: "Consider creating an emergency fund",
                category: "Savings"
            };

            FinancialAdvisorController.getFinancialAdvice.mockImplementation((req, res) => {
                res.json(mockAdvice);
            });

            const response = await request(app)
                .get("/advice");

            expect(authenticateToken).toHaveBeenCalled();
            expect(FinancialAdvisorController.getFinancialAdvice).toHaveBeenCalled();
            expect(response.body).toEqual(mockAdvice);
        });

        it("handles unauthorized requests", async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                res.status(401).json({ message: "Invalid token" });
            });

            const response = await request(app)
                .get("/advice");

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message", "Invalid token");
        });
    });
});