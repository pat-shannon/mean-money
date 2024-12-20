const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");
const bcrypt = require('bcrypt');

require("../mongodb_helper");

describe("/users", () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    describe("POST, when VALID name, email and password are provided", () => {
        test("the response code is 201 and message indicates success", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email: "thisisanemail@email.com", password: "1234Password?" });
            expect(response.body.message).toBe('User created successfully');
            expect(response.statusCode).toBe(201);
        });

        test("User is created", async () => {
            await request(app)
                .post("/users")
                .send({ name: "Emailer", email: "thisisanemail@email.com", password: "1234Password?" });

            const users = await User.find();
            const newUser = users[users.length - 1];
            expect(newUser.name).toEqual("Emailer");
            expect(newUser.email).toEqual("thisisanemail@email.com");
            expect(bcrypt.compare(newUser.password, '1234Password?'));
        });

        test("When a password exactly 8 characters long is provided with a capital letter, a number, and a special character, response code is 201 and user is saved", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email: "thisisanemail@email.com", password: "Mypass1?" });

            expect(response.statusCode).toBe(201);
            const users = await User.find();
            const newUser = users[users.length - 1];
            expect(newUser.name).toEqual("Emailer");
            expect(newUser.email).toEqual("thisisanemail@email.com");
            expect(bcrypt.compare(newUser.password, 'Mypass1?'));
        });

        test("When a password over 8 characters long is provided with a capital letter, a number, and a special character, response code is 201 and user is saved", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email: "thisisanemail@email.com", password: "Mypass1?" });

            expect(response.statusCode).toBe(201);
            const users = await User.find();
            const newUser = users[users.length - 1];
            expect(newUser.name).toEqual("Emailer");
            expect(newUser.email).toEqual("thisisanemail@email.com");
            expect(bcrypt.compare(newUser.password, 'Mypassword123? '));
        });
    });

    describe("POST, when valid password not provided", () => {
        test("When no password is provided, response code is 400", async () => {
            const response = await request(app)
                .post("/users")
                .send({ email: "emailtwo@email.com" });

            expect(response.statusCode).toBe(400);
        });

        test("When no password is provided, does not create a user", async () => {
            await request(app).post("/users").send({ email: "emailtwo@email.com" });

            const users = await User.find();
            expect(users.length).toEqual(0);
        });

        test("When a password under 8 characters is provided, response code is 400", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email: "thisisanemail@email.com", password: "Seven7?" });

            expect(response.statusCode).toBe(400);
        });

        test("When a password over 7 characters is provided with no capital letter, response code is 400", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email: "thisisanemail@email.com", password: "password123!" });

            expect(response.statusCode).toBe(400);
        });
        test("When a password over 7 characters is provided with no number, response code is 400", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email: "thisisanemail@email.com", password: "Password!" });

            expect(response.statusCode).toBe(400);
        });
        test("When a password over 7 characters is provided with no special character, response code is 400", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email: "thisisanemail@email.com", password: "Password123" });

            expect(response.statusCode).toBe(400);
        });
        
    });

    describe("POST, when valid email not provided", () => {
        test("missing email means response code is 400, account not created", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", password: "Mypass1?" });

            expect(response.statusCode).toBe(400);
            const users = await User.find();
            expect(users.length).toEqual(0);
        });

        test("email with no domain means response code is 500, account not created", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email: "emailaddress", password: "Mypass1?" });

            expect(response.statusCode).toBe(500);
            const users = await User.find();
            expect(users.length).toEqual(0);
        });

        test("email with @ sign but no domain means response code is 500, account not created", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email:"emailaddress@", password: "Mypass1?" });

            expect(response.statusCode).toBe(500);
            const users = await User.find();
            expect(users.length).toEqual(0);
        });

        test("email with . sign but no @ sign means response code is 500, account not created", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email:"emailaddresswebsite.com", password: "Mypass1?" });

            expect(response.statusCode).toBe(500);
            const users = await User.find();
            expect(users.length).toEqual(0);
        });

        test("email with @ sign but no domain means response code is 500, account not created", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email:"emailaddress@", password: "Mypass1?" });

            expect(response.statusCode).toBe(500);
            const users = await User.find();
            expect(users.length).toEqual(0);
        });

        test("email with @ and . sign but wrong order means response code is 500, account not created", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email:"emailaddress.@com", password: "Mypass1?" });

            expect(response.statusCode).toBe(500);
            const users = await User.find();
            expect(users.length).toEqual(0);
        });

        test("email with @ and . sign in correct order but no domain means response code is 500, account not created", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email:"emailaddress@.", password: "Mypass1?" });

            expect(response.statusCode).toBe(500);
            const users = await User.find();
            expect(users.length).toEqual(0);
        });

        test("email with @ and . sign in correct order but no top-level domain means response code is 500, account not created", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email:"emailaddress@website.", password: "Mypass1?" });

            expect(response.statusCode).toBe(500);
            const users = await User.find();
            expect(users.length).toEqual(0);
        });

        test("email with @ and . sign in correct order with only top-level domain means response code is 500, account not created", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email:"emailaddress@.com", password: "Mypass1?" });

            expect(response.statusCode).toBe(500);
            const users = await User.find();
            expect(users.length).toEqual(0);
        });


    });

    describe("POST, when email already in use provided", () => {
        test("returns 400, user not created", async () => {
            await request(app)
                .post("/users")
                .send({ name: "Emailer", email:"emailaddress@website.net", password: "Mypass1?" });

            const response = await request(app)
                .post("/users")
                .send({ name: "Emailer", email:"emailaddress@website.net", password: "Mypass1?" });

            expect(response.statusCode).toBe(400);
            const users = await User.find();
            expect(users.length).toEqual(1);
        });
    });
});
