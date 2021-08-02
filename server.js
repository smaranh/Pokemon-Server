import express from "express";
import mongoose from "mongoose";
import pkg from "dotenv";

const app = express();
const { config } = pkg;

config();
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

app.listen(4200, () => console.log("Server is running"));