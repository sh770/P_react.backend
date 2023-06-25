import express from "express";
import Flights from "../models/flightModel.js";

const flightsRouter = express.Router();

flightsRouter.get("/",async (req,res) =>{
    const flights = await Flights.find({});
    if (flights){
        res.send(flights)
    }
    
    else{
        res.status(401).send({message:"error"})
    }
})

flightsRouter.get("/flight/:id",async (req,res) =>{
    const flights = await Flights.findById( req.params.id );
    if (flights){
        res.send(flights)
        }
    
    else{
        res.status(401).send({message:"error"})
    }
})

export default flightsRouter;
