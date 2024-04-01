import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const MongoConfig = () => {
  // Getting value of the URI
  const mongoURI = process.env.MONGO_URI || "";
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error);
      console.log("URI: ", mongoURI);
    });
};

export default MongoConfig;
