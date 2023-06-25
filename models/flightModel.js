import mongoose from "mongoose";

const flightsSchema = new mongoose.Schema(
  {
    slug: { type: Number, required: true, unique: true },
    departure: { type: String, required: true },
    destination: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date },
    has_parking: Boolean,
  },
  {
    timestamps: true,
  }
);

const Flights = mongoose.model("Flights", flightsSchema);
export default Flights;
