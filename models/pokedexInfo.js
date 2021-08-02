const mongoose = require("mongoose");

const pokedexInfo = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    caughtDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('PokedexInfo', pokedexInfo);