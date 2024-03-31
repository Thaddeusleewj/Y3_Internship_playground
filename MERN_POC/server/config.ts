import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const MongoConfig = () => {
  // Getting value of the URI
  const mongoURI = process.env.MONGO_URI || "mongodb+srv://thaddeusleewj:z9N3Eif7Y5@pocdb.7nnimam.mongodb.net/?retryWrites=true&w=majority&appName=POCDB";
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error);
      console.log("URI: ", mongoURI)
    });
};

export default MongoConfig;
