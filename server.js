// Dependencies
const express = require("express");
const app = express();
require ("dotenv").config();
const mongoose = require("mongoose");
const { response } = require("express");
const PORT = process.env.PORT;
const allCards = require("./models/data");
const Card = require("./models/deck");

// Connect to MongoDB Atlas
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Data connection error/success
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " Is mongo not running?!"));
db.on("connected", () => console.log("Mongo is connected."));
db.on("disconnected", () => console.log("Mongo is disconnected."));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

/************
Page templates
*************/

// Render Index Page
app.get("/", (req, res) => {
    res.render("index.ejs")
});

// Render Saved Decks Page
app.get("/saved-decks", (req, res) => {
    // res.render("saved-decks.ejs")
});


/*********
API Routes
**********/

// GET / Read
app.get("/cards/:limit", async (req, res) => {
    let randomCards = [];

    for (let i = 0; i < req.params.limit; i++) {
        const randomIndex = Math.floor(Math.random() * allCards.length)
        randomCards.push(allCards[randomIndex])
    };
    res.send(randomCards);
});

// GET / Read
app.get("/deck", async (req, res) => {
    // read deck from database
    res.send(deck);
});

// POST / Create / Save
app.post("/deck/save", async () => {
    // save deck to database
})

// PATCH / Update / Edit
app.patch("/deck/edit", async () => {
    // edit deck that's in database
})

// DELETE / Remove
app.delete("/deck/delete", async () => {
    // delete deck from database
})


//Listener
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT} `));