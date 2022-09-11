// Dependencies
const express = require("express");
const app = express();
require ('dotenv').config();
const mongoose = require("mongoose");
const PORT = process.env.PORT

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

// Routes
// Index

// New

// Delete

// Update

// Create

// Show

// Listener
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT} `));