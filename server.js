// Dependencies
const express = require("express");
const app = express();
require ("dotenv").config();
const mongoose = require("mongoose");
const { response } = require("express");
const PORT = process.env.PORT;
const allCards = require("./models/data");
const Card = require("./models/deck");
const Deck = require("./models/deck");

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
app.use(express.static('public')); 

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.render('error');
});

// Commented out this line because it was causing our req.body to be empty on POST requests
// app.use(express.urlencoded({ extended: true }));

// Using express.json() instead -- https://stackoverflow.com/questions/24543847/req-body-empty-on-posts
app.use(express.json());

/************
Page templates
*************/

// Render Index Page
app.get("/", (req, res) => {
    res.render("index.ejs")
});

// Render Saved Decks Page
app.get("/saved-decks", (req, res) => {
    res.render("savedDecks.ejs")
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

// GET / Read / One deck
app.get("/deck", async (req, res) => {
    // read deck from database
    res.send(deck);
});

// GET / Read / All decks
app.get("/decks/all", async (req, res) => {
    const allDecks = await Deck.find();
    res.send(allDecks)
})

// POST / Create / Save - referred jenniferbland.com mongodb
app.post("/deck/save", (req, res) => {
    const myDeck = new Deck(req.body);

    myDeck.save()
        .then(deck => {
            res.send(deck)
        })
        .catch(err => {
            res.status(400).send("Unable to save to database:", err)
        })
})

// PATCH / Update / Edit
app.patch("/deck/edit", async (req, res) => {
    // edit deck that's in database
    const deckToEdit = new Deck(req.body.deck);
    deckToEdit.updateOne({ name: req.body.nameUpdate })
        .then(response => {
            res.send({
                response: response,
                newDeck: {
                    ...req.body.deck,
                    name: req.body.nameUpdate
                }
            });
        })
        .catch(err => {
            res.send.status(400).send("Failed to update:", err)
        });
})

// DELETE / Remove
app.delete("/deck/delete/:id", (req, res) => {
    // delete deck from database
    Deck.deleteOne({ _id: req.params.id })
        .then(id => res.send(id))
        .catch(err => res.status(400).send("Failed to delete:", err))
})


//Listener
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT} `));