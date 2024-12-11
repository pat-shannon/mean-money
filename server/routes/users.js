const express = require("express");
const UsersController = require("../controllers/users.js");
const router = express.Router();

// Routes here:

router.post("/", UsersController.create);
router.get("/find/:email", UsersController.findByEmail);
router.get("/findById/:id", UsersController.findById);


module.exports = router;