import fs from 'fs';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import Flights from './models/flightModel.js';


dotenv.config();

// Connect to DB
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to db');
    })
    .catch((err) => {
        console.log(err.message);
    });

const flights = JSON.parse(
    fs.readFileSync('./flights.json', "utf-8")
);


// Add data
const importData = async () => {
    try {
        await Flights.create(flights);
        console.log("Data Imported...");
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit();
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Flights.deleteMany();
        console.log("Data Destroyed...");
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}