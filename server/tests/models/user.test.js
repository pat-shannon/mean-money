require("../mongodb_helper");
const User = require("../../models/user");
const bcrypt = require('bcrypt');

describe("User model", () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it("User can set their required details", () => {
        const user = new User({
            name: "Reena",
            email: "reena@example.com",
            password: "12345678"
        });
        expect(user.name).toEqual("Reena");
        expect(user.email).toEqual("reena@example.com");
        expect(user.password).toEqual("12345678");
    });

    it("User can save their required details", async () => {
        const user = new User({
            name: "Reena",
            email: "reena@example.com",
            password: "12345678"
        });
    
        await user.save();
        const users = await User.find();
    
        expect(users[0].name).toEqual("Reena");
        expect(users[0].email).toEqual("reena@example.com");
        expect(bcrypt.compare(users[0].password, '12345678'));
    });
    
    it("Users's non-required details are set to default values", () => {
        const user = new User({
            name: "Reena",
            email: "reena@example.com",
            password: "12345678"
        });
        expect(user.currentSavings).toEqual(0);
        expect(user.disposableIncome).toEqual(0);
        expect(user.foodAndDrinkGoal).toEqual(0);
        expect(user.socialAndEntertainmentGoal).toEqual(0);
        expect(user.shoppingGoal).toEqual(0);
        expect(user.holidayAndTravelGoal).toEqual(0);
        expect(user.healthAndBeautyGoal).toEqual(0);
        expect(user.miscGoal).toEqual(0);
    });
    it("Users's non-required details are saved as default values", async () => {
        const user = new User({
            name: "Reena",
            email: "reena@example.com",
            password: "12345678"
        });
        await user.save();
        const users = await User.find();
        expect(users[0].currentSavings).toEqual(0);
        expect(users[0].disposableIncome).toEqual(0);
        expect(users[0].foodAndDrinkGoal).toEqual(0);
        expect(users[0].socialAndEntertainmentGoal).toEqual(0);
        expect(users[0].shoppingGoal).toEqual(0);
        expect(users[0].holidayAndTravelGoal).toEqual(0);
        expect(users[0].healthAndBeautyGoal).toEqual(0);
        expect(user.miscGoal).toEqual(0);
    });

    it("Users's non-required details are saved correctly", async () => {
        const user = new User({
            name: "Reena",
            email: "reena@example.com",
            password: "12345678",
            currentSavings: 2000,
            disposableIncome: 500,
            foodAndDrinkGoal: 80,
            socialAndEntertainmentGoal: 60,
            shoppingGoal: 20,
            holidayAndTravelGoal: 200,
            healthAndBeautyGoal: 40,
            miscGoal: 20
        });
        await user.save();
        const users = await User.find();
        expect(users[0].currentSavings).toEqual(2000);
        expect(users[0].disposableIncome).toEqual(500);
        expect(users[0].foodAndDrinkGoal).toEqual(80);
        expect(users[0].socialAndEntertainmentGoal).toEqual(60);
        expect(users[0].shoppingGoal).toEqual(20);
        expect(users[0].holidayAndTravelGoal).toEqual(200);
        expect(users[0].healthAndBeautyGoal).toEqual(40);
        expect(user.miscGoal).toEqual(20);
    });

    it("Email with no domain can't be saved", async () => {
        const user = new User({
            name: "User",
            email: "invalidemail",
            password: "12345678",
        })
        try{
            await user.save();
        } catch(error){
            expect(String(error)).toEqual('ValidationError: email: Invalid email format')
        }
    })

    it("Valid email address can be saved", async () => {
        const user = new User({
            name: "User",
            email: "validemail@emailsite.net",
            password: "Password123!",
        })
        await user.save();
        const users = await User.find();
        expect (users[0].name).toEqual("User");
        expect (users[0].email).toEqual("validemail@emailsite.net");
        expect(bcrypt.compare(users[0].password, 'Password123!'));
    })

    it("Email with no domain can't be saved", async () => {
        const user = new User({
            name: "User",
            email: "invalidemail",
            password: "12345678",
        })
        try{
            await user.save();
        } catch(error){
            expect(String(error)).toEqual('ValidationError: email: Invalid email format')
        }
    })
});
