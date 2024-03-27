import express from "express";
import db from "../db/connection.js";

// Convert id's of each object into a string
import { ObjectId } from "mongodb";

// Instance of the express router
const router = express.Router();

// Getting a list of all records
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  // Retrieving all records in the records table and converting to an array
  let results = await collection.find({}).toArray();

  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("records");
  // Creating a query object to find the record by its ID
  let query = { _id: new ObjectId(req.params.id) };
  // Searching for record that matches query param
  let result = await collection.findOne(query);

  if (!result) {
    res.send("Not found!").status(404);
  } else {
    res.send(result).status(200);
  }
});

// Create a new record
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };

    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);

    res.send(result).status(204);
  } catch (err) {
    res.status(500).send("Error adding record");
  }
});

// Update a record by id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);

    res.send(result).send(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating records");
  }
});

export default router;
