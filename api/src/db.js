const mongoose = require("mongoose");
require("dotenv").config();
const { DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
