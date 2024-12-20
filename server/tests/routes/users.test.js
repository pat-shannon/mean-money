// file: routes/users.test.js

const request = require("supertest");
const app = require("../../app");
const UsersController = require("../../controllers/users");
const tokenChecker = require("../../middleware/tokenChecker");


// create mocks 
jest.mock("../../controllers/users");
jest.mock("../../middleware/tokenChecker");


//tests begin

describe("Users Routes", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // implement mocks:

        UsersController.create.mockImplementation((req, res) => res.status(200).json({ name: "Natalie", email: "nat08@yahoo.com", password: "Password123!" }));
        UsersController.findByEmail.mockImplementation((req, res) => res.status(200).json({}));
        UsersController.findById.mockImplementation((req, res) => res.status(200).json({}));
        UsersController.setSpendingGoals.mockImplementation((req, res) => res.status(200).json({}));
        UsersController.saveQuizResult.mockImplementation((req, res) => res.status(200).json({}));
        tokenChecker.mockImplementation((req, res, next) => next());
    });

    describe("Route Configuration", () => {
        test("should have a POST route for creating users", () => {
            return request(app)
                .post("/users")
                .send({ name: "Natalie", email: "nat08@yahoo.com", password: "Password123!" })
                .expect(200);
        });

        test("can find a user by email", () => {
            return request(app)
                .get("/users/find/test@test.com")
                .expect(200);
        });

        test("can find a user by Id", () => {
            return request(app)
                .get("/users/findById/123")
                .expect(200);
        });

        test("should have protected routes for spending goals", () => {
            return request(app)
                .post("/users/set-spending-goals")
                .expect(200);
        });

        test("should have protected routes for quiz results", () => {
            return request(app)
                .post("/users/quiz-result")
                .expect(200);
        });
    });

    describe("Route Functionality", () => {
        test("creates a user with valid data", async () => {
            const userData = { name: "Natalie", email: "nat08@yahoo.com", password: "Password123!" };

            await request(app)
                .post("/users")
                .send(userData)
                .expect(200);

        expect(UsersController.create).toHaveBeenCalled();
        const calledWith = UsersController.create.mock.calls[0][0];
        expect(calledWith.body).toEqual(userData);
    });


    test("finds user by email", async () => {
        const email = "billybob@email.co.uk";

        await request(app)
            .get(`/users/find/${email}`)
            .expect(200);

        expect(UsersController.findByEmail).toHaveBeenCalled();
        const calledWith = UsersController.findByEmail.mock.calls[0][0];
        expect(calledWith.params.email).toBe(email);
    });

    test("finds user by id", async () => {
        const id = "1234321";

        await request(app)
            .get(`/users/findById/${id}`)
            .expect(200);

        expect(UsersController.findById).toHaveBeenCalled();
        const calledWith = UsersController.findById.mock.calls[0][0];
        expect(calledWith.params.id).toBe(id);
    });

    test("sets spending goals with valid token", async () => {
        const goals = {
            food: 500,
            entertainment: 200
        };

        await request(app)
            .post("/users/set-spending-goals")
            .send(goals)
            .expect(200);

        expect(tokenChecker).toHaveBeenCalled();
        expect(UsersController.setSpendingGoals).toHaveBeenCalled();
        const calledWith = UsersController.setSpendingGoals.mock.calls[0][0];
        expect(calledWith.body).toEqual(goals);
    });

    test("blocks spending goals without valid token", () => {
        tokenChecker.mockImplementation((req, res, next) => {
            res.status(401).json({ message: "Unauthorized" });
        });

        return request(app)
            .post("/users/set-spending-goals")
            .expect(401);
    });

    test("saves quiz result with valid token", async () => {
        const quizData = {
            category: "Saver",
            score: 85
        };

        await request(app)
            .post("/users/quiz-result")
            .send(quizData)
            .expect(200);

        expect(tokenChecker).toHaveBeenCalled();
        expect(UsersController.saveQuizResult).toHaveBeenCalled();
        const calledWith = UsersController.saveQuizResult.mock.calls[0][0];
        expect(calledWith.body).toEqual(quizData);
    });

    test("validates password during user creation", () => {
        return request(app)
            .post("/users")
            .send({ password: "weak" })
            .expect(400);
    });
});
});