// import express from "express";
// import cors from "cors";
// import records from "./routes/record.js";
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// sets the port number we use
// const PORT = process.env.PORT || 5050;

const app = express();
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// app.use("/record", records);

app.get('/',(req,res) => {
    res.send('Hello from MERN stack!');
})

app.get("/test", (req, res) => {
    return res.status(200).json({ success: true, message: "Test successful. Server is successfully running!" })
})

module.exports = app;

// start the Express server
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });

// Should this be /db/db.js ?
// const mongoDbUrl = process.env.MONGODB_URL;
// await mongoose.connect(mongoDbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB.');
// }).catch(error => {
//     console.log(error);
// });