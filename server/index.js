// docs: https://github.com/motdotla/dotenv#%EF%B8%8F-usage
require("dotenv").config();

const app = require("./app.js");
const { connectToDatabase } = require("./db/db.js");

function listenForRequests() {
    const port = process.env.PORT || 9000;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

connectToDatabase().then(() => {
    listenForRequests();
});

module.exports = app;