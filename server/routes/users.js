const express = require("express");
const UsersController = require("../controllers/users.js");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");

// Routes here:

router.post("/", UsersController.create);
router.get("/find/:email", UsersController.findByEmail);
router.get("/findById/:id", UsersController.findById);
router.post("/set-spending-goals", tokenChecker, UsersController.setSpendingGoals)


module.exports = router;