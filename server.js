const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(cors());
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

const pokedexRoute = require("./routes/pokedex");
app.use(express.json());

app.use('/pokedex', pokedexRoute);


app.listen(4200, () => console.log("Server is running"));