const express = require("express");
const usersRouter = require("../routes/users.js");
const UsersController = require("../controllers/users.js");

describe("Users Routes", () => {
    let mockApp;
    let mockRouter;

    beforeEach(() => {
        mockApp = {
            use: jest.fn(),
        };

        jest.spyOn(UsersController, "create").mockImplementation(jest.fn());
        jest.spyOn(UsersController, "findByEmail").mockImplementation(jest.fn());
        jest.spyOn(UsersController, "findById").mockImplementation(jest.fn());
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("Route Configuration", () => {
        it("should have a POST route for creating users", () => {
            const routes = usersRouter.stack;
            const postRoute = routes.find(
                route => route.route.methods.post && route.route.path === "/"
            );

            expect(postRoute).toBeTruthy();
            expect(postRoute.route.methods.post).toBe(true);
        });

        it("can find a user by email", () => {
            const routes = usersRouter.stack;
            const getByEmailRoute = routes.find(
                route => route.route.methods.get && route.route.path === "/find/:email"
            );

            expect(getByEmailRoute).toBeTruthy();
            expect(getByEmailRoute.route.methods.get).toBe(true);
        });

        it("can find a user by Id", () => {
            const routes = usersRouter.stack;
            const getByIdRoute = routes.find(
                route => route.route.methods.get && route.route.path === "/findById/:id"
            );

            expect(getByIdRoute).toBeTruthy();
            expect(getByIdRoute.route.methods.get).toBe(true);
        });
    });

    describe("controller can be called successfully", () => {
        it("calls create method with /POST", () => {
            const mockReq = {
                body: {
                    name: "Bobby",
                    email: "bobby92@email.com",
                    password: "password123"
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const createRoute = usersRouter.stack.find(
                route => route.route.methods.post && route.route.path === "/"
            );

            createRoute.route.stack[0].handle(mockReq, mockRes);

            expect(UsersController.create).toHaveBeenCalledWith(mockReq, mockRes);
        });

        it("calls findByEmail method when GET /find/:email is called", () => {
            // Create mock req and res objects
            const mockReq = {
                params: {
                    email: "billybob@email.co.uk"
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const findByEmailRoute = usersRouter.stack.find(
                route => route.route.methods.get && route.route.path === "/find/:email"
            );

            findByEmailRoute.route.stack[0].handle(mockReq, mockRes);

            expect(UsersController.findByEmail).toHaveBeenCalledWith(mockReq, mockRes);
        });

        it("calls findById method when GET /findById/:id is called", () => {
            // Create mock req and res objects
            const mockReq = {
                params: {
                    id: "1234321"
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            // Find the findById route handler
            const findByIdRoute = usersRouter.stack.find(
                route => route.route.methods.get && route.route.path === "/findById/:id"
            );

            // Call the route handler
            findByIdRoute.route.stack[0].handle(mockReq, mockRes);

            // Verify UsersController.findById was called
            expect(UsersController.findById).toHaveBeenCalledWith(mockReq, mockRes);
        });
    });
});