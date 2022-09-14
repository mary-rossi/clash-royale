// Dependencies
const express = require("express");
const app = express();
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
    let randomCards = [];

    for (let i = 0; i < req.params.limit; i++) {
        const randomIndex = Math.floor(Math.random() * allCards.length)
        randomCards.push(allCards[randomIndex])
    };
    res.send(randomCards);
});


//Listener
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT} `));