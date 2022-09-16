const mongoose = require("mongoose")
const Schema = mongoose.Schema

const deckSchema = new mongoose.Schema({
    cards: [{
        name: String,
        id: String,
        icon: String,
    }],
    name: String,
})

const Deck = mongoose.model("Deck", deckSchema)

Deck.create()

module.exports = Deck