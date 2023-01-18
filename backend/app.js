import express from "express";
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
const port = 3001;

const url =
  "mongodb+srv://Hassan:Dontfeelblue23@cluster0.ojoja.mongodb.net/?retryWrites=true&w=majority";
// Connection URI
const uri =
  "mongodb+srv://Hassan:Dontfeelblue23@cluster0.ojoja.mongodb.net/?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } catch (err) {
    console.log("Some error occoured", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.status(200).json({ "Hello World": "Great" });
});

app.listen(port, () => {
  console.log(`Connected on port ${port}`);
});
