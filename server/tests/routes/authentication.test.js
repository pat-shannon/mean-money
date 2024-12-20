// file: authentication.test.js

const request = require("supertest");
const express = require("express");
const AuthenticationController = require("../../controllers/authentication");

jest.mock("../../controllers/authentication");

describe("Authentication Routes", () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());

        app.use((err, req, res, next) => {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        });

        const authRouter = require("../../routes/authentication");
        app.use("/auth", authRouter);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("POST /", () => {
        it("successfully creates a token", async () => {
            AuthenticationController.createToken.mockImplementation((req, res) => {
                res.status(201).json({ token: "fake-token-123", message: "OK" });
            });

            const response = await request(app)
                .post("/auth")
                .send({ email: "test@example.com", password: "password123" });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                token: "fake-token-123",
                message: "OK"
            });
        });

        it("handles user not found", async () => {
            AuthenticationController.createToken.mockImplementation((req, res) => {
                res.status(401).json({ message: "User not found" });
            });

            const response = await request(app)
                .post("/auth")
                .send({ email: "wrong@example.com", password: "wrongpass" });

            expect(response.status).toBe(401);
            expect(response.body).toEqual({ message: "User not found" });
        });

        it("handles incorrect password", async () => {
            AuthenticationController.createToken.mockImplementation((req, res) => {
                res.status(401).json({ message: "Password incorrect" });
            });

            const response = await request(app)
                .post("/auth")
                .send({ email: "test@example.com", password: "wrongpass" });

            expect(response.status).toBe(401);
            expect(response.body).toEqual({ message: "Password incorrect" });
        });

        it("handles server errors", async () => {
            AuthenticationController.createToken.mockImplementation((req, res) => {
                res.status(500).json({ message: "Internal Server Error" });
            });

            const response = await request(app)
                .post("/auth")
                .send({ email: "test@example.com", password: "password123" });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: "Internal Server Error" });
        });
    });
});