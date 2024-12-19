const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");

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
    });

    describe("POST, when password is missing", () => {
        test("response code is 400", async () => {
            const response = await request(app)
                .post("/users")
                .send({ email: "emailtwo@email.com" });

            expect(response.statusCode).toBe(400);
        });

        test("does not create a user", async () => {
            await request(app).post("/users").send({ email: "emailtwo@email.com" });

            const users = await User.find();
            expect(users.length).toEqual(0);
        });
    });

    describe("POST, when email is missing", () => {
        test("response code is 400", async () => {
            const response = await request(app)
                .post("/users")
                .send({ password: "1234password" });

            expect(response.statusCode).toBe(400);
        });

        test("does not create a user", async () => {
            await request(app).post("/users").send({ password: "1234password" });

            const users = await User.find();
            expect(users.length).toEqual(0);
        });
    });
});
