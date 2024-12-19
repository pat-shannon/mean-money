const express = require("express");
const UsersController = require("../controllers/users.js");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");
const passwordValidator = require("../middleware/passwordValidator.js")

// Routes here:

router.post("/", passwordValidator, UsersController.create);
router.get("/find/:email", UsersController.findByEmail);
router.get("/findById/:id", UsersController.findById);
router.post("/set-spending-goals", tokenChecker, UsersController.setSpendingGoals)
router.get("/find", tokenChecker, UsersController.findUser);
router.post("/quiz-result", tokenChecker, UsersController.saveQuizResult)
router.get("/quiz-result", tokenChecker, UsersController.getQuizResult)


module.exports = router;