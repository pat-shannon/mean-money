const express = require('express');
const cors = require('cors');
const app = express();
const authenticationRouter = require("./routes/authentication")

app.use(cors());
app.use(express.json());

// initial test routes:
app.get('/',(req,res) => {
    res.send('Hello from MERN stack!');
})
app.get("/test", (req, res) => {
    return res.status(200).json({ success: true, message: "Test successful. Server is successfully running!" })
})

// -----------------------------------
// API ROUTES - uncomment or add when needed:
// -----------------------------------
// app.use("/users", usersRouter);
app.use("/tokens", authenticationRouter);


module.exports = app;