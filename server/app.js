const express = require('express');
const cors = require('cors');
const app = express();

const authenticationRouter = require("./routes/authentication")
const savingsGoalRouter = require("./routes/savings_goal");
const diaryEntryRouter = require("./routes/diaryEntry")
const usersRouter = require("./routes/users");
const financialAdviceRouter = require("./routes/financialAdvice")

app.use(cors());
app.use(express.json());


// initial test routes:
app.get('/',(req, res) => {
    res.send('Hello from MERN stack!');
})
app.get("/test", (req, res) => {
    return res.status(200).json({ success: true, message: "Test successful. Server is successfully running!" })
})

// -----------------------------------
// API ROUTES - uncomment or add when needed:
// -----------------------------------



app.use("/tokens", authenticationRouter);
app.use("/users", usersRouter);


app.use("/diary", diaryEntryRouter);


app.use("/", savingsGoalRouter);
app.use("/financial-advice", financialAdviceRouter);


module.exports = app;