// Dependencies
const express = require("express");
const app = express();
const cors = require('cors');
require ('dotenv').config();
const mongoose = require("mongoose");
const { response } = require("express");
const PORT = process.env.PORT;
const allCards = require("./data");

// Connect to MongoDB Atlas
// mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// Data connection error/success
// const db = mongoose.connection;
// db.on("error", (err) => console.log(err.message + " Is mongo not running?!"));
// db.on("connected", () => console.log("Mongo is connected."));
// db.on("disconnected", () => console.log("Mongo is disconnected."));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/************
Page templates
*************/

// Index, get- read
app.get("/", (req, res) => {
    res.render("index.ejs")
});

// New

// Delete, delete

// Update, patch/put

// Create, post

// Show

/*********
API Routes
**********/

// Index, get- read
app.get("/get-cards/:limit", async (req, res) => {
    const cards = allCards.slice(0, req.params.limit)
    res.send(cards)
});


//Listener
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT} `));