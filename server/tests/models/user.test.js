require("../mongodb_helper");
const User = require("../../models/user");


describe("User model", () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it("has all required fields", () => {
        const user = new User({
            name: "Reena",
            email: "reena@example.com",
            password: "12345678"
        });
        expect(user.name).toEqual("Reena");
        expect(user.email).toEqual("reena@example.com");
        expect(user.password).toEqual("12345678");
    });

    it("can save a user", async () => {
        const user = new User({
            name: "Reena",
            email: "reena@example.com",
            password: "12345678"
        });
    
        await user.save();
        const users = await User.find();
    
        expect(users[0].name).toEqual("Reena");
        expect(users[0].email).toEqual("reena@example.com");
        expect(users[0].password).toEqual("12345678");
      });

});
