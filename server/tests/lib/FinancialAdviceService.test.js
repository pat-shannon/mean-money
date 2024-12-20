const jwt = require("jsonwebtoken");
const FinancialAdvisorService = require("../../lib/FinancialAdviceService");
const DiaryEntry = require("../../models/diary_entry");
const User = require("../../models/user");
const SavingsGoal = require("../../models/savings_goal");

jest.mock("../../models/diary_entry");
jest.mock("../../models/user");
jest.mock("../../models/savings_goal");
jest.mock("jsonwebtoken");

describe("FinancialAdvisorService", () => {
    let mockToken;
    let mockUserId;

    beforeEach(() => {
        jest.clearAllMocks();
        mockToken = "mockValidToken";
        mockUserId = "mockUserId";

        jwt.verify.mockImplementation(() => ({ user_id: mockUserId }));
    });

    describe("Constructor and Token Decoding", () => {
        test("should decode user ID from valid token", () => {
            const service = new FinancialAdvisorService(mockToken);
            expect(service.userId).toBe(mockUserId);
        });

        test("should throw an error for invalid token", () => {
            jwt.verify.mockImplementation(() => {
                throw new Error("Invalid Token");
            });

            expect(() => new FinancialAdvisorService("invalidToken")).toThrow("Invalid Token");
        });
    });

    describe("generateAdvice Method", () => {
        test("should generate advice for user", async () => {
            const mockUser = {
                _id: mockUserId,
                foodAndDrinkGoal: 500,
                socialAndEntertainmentGoal: 300,
                shoppingGoal: 400,
                holidayAndTravelGoal: 600,
                healthAndBeautyGoal: 200,
                miscGoal: 100,
                disposableIncome: 2000,
                currentSavings: 1000,
            };

            const mockDiaryEntries = [
                { category: "Food and Drink", amount: 700 },
                { category: "Shopping", amount: 500 },
                { category: "Miscellaneous", amount: 150 },
            ];

            const mockSavingsGoals = [
                {
                    savingsTitle: "Vacation",
                    savingsTarget: 5000,
                    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days remaining
                },
            ];

            User.findById.mockResolvedValue(mockUser);
            DiaryEntry.find.mockResolvedValue(mockDiaryEntries);
            SavingsGoal.find.mockResolvedValue(mockSavingsGoals);

            const service = new FinancialAdvisorService(mockToken);
            const advice = await service.generateAdvice();

            expect(advice).toContain("Whoa, big spender! Your food budget is eating your wallet. Maybe cook at home once in a while?");
            expect(advice).toContain("Your shopping addiction is showing!");
            expect(advice).toContain("Your Vacation goal is looking slim. Panic mode: activated! 🚨");
        });

        test("should handle missing user gracefully", async () => {
            User.findById.mockResolvedValue(null);

            const service = new FinancialAdvisorService(mockToken);
        
            const advice = await service.generateAdvice();
        
            expect(advice).toBeUndefined();
        });
    });

    describe("analyseSpendingPatterns Method", () => {
        test("should generate advice for exceeding category goals", () => {
            const service = new FinancialAdvisorService(mockToken);

            const mockUser = {
                foodAndDrinkGoal: 500,
                shoppingGoal: 400,
                miscGoal: 200,
            };

            const mockDiaryEntries = [
                { category: "Food and Drink", amount: 600 },
                { category: "Shopping", amount: 500 },
                { category: "Miscellaneous", amount: 250 },
            ];

            const advice = service._analyseSpendingPatterns(mockUser, mockDiaryEntries);

            expect(advice).toContain("Your shopping addiction is showing!");
        });
    });

    describe("checkSavingGoalProgress Method", () => {
        test("should generate advice for savings goals with low progress", () => {
            const service = new FinancialAdvisorService(mockToken);

            const mockUser = { currentSavings: 1000 };
            const mockSavingsGoals = [
                {
                    savingsTitle: "Vacation",
                    savingsTarget: 5000,
                    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days remaining
                },
            ];

            const advice = service._checkSavingGoalProgress(mockUser, mockSavingsGoals);

            expect(advice).toContain("Your Vacation goal is looking slim. Panic mode: activated! 🚨");
        });
    });

    describe("checkBudgetGoals Method", () => {
        test("should generate advice if spending exceeds disposable income threshold", () => {
            const service = new FinancialAdvisorService(mockToken);

            const mockUser = { disposableIncome: 2000 };
            const mockDiaryEntries = [
                { amount: 1000 },
                { amount: 900 },
                { amount: 500 },
            ];

            const advice = service._checkBudgetGoals(mockUser, mockDiaryEntries);

            expect(advice).toContain("💸 Slow down, money magician! You're burning through cash faster than a lottery winner.");
        });
    });

    describe("formatAdvice Method", () => {
        test("should return default advice if no issues found", () => {
            const service = new FinancialAdvisorService(mockToken);

            const advice = service._formatAdvice([]);
            expect(advice).toEqual(["Looking good! Your finances are so on point, even I'm impressed."]);
        });

        test("should return provided advice if issues exist", () => {
            const service = new FinancialAdvisorService(mockToken);

            const advice = service._formatAdvice(["Test Advice"]);
            expect(advice).toEqual(["Test Advice"]);
        });
    });
});
