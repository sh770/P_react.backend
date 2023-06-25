import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import flightsRouter from "./routes/flightsRoutes.js"

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => {
        console.log('connected to db');
    })
    .catch((err) => {
        console.log(err.message);
    });

const app = express();

// Add CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/flights',flightsRouter )

app.use((err, req, res, next)=>{
    res.status(500).send({ message: err.message});
})

const port = process.env.PORT || 4500;
app.listen(port, () => {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`The server started running at: ${currentTime}`);
    console.log(`server running on http://localhost:${port}`);
});

