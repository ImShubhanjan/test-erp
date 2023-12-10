const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Companies = require("../models/companies.model.js");
const Mills = require("../models/mills.model.js");
const Orders = require("../models/orders.model.js");
const Brokers = require("../models/brokers.model.js");
const millsController = require('./mills.controller.js');
const existingModels = ["mills", "orders", "brokers"];

async function getData(collectionName) {
  console.log(collectionName);
  const collectionData = await mongoose.connection.collection(`'${collectionName}'`).find({}).toArray();
  console.log(collectionData);
}

router.get("/", (req, res) => {
  res.send("Company");
});

router.post("/", async (req, res) => {
  try {
    const { companyName } = req.body;
    const uri = `mongodb+srv://pixdeep:pixdeep123@cluster0.y2cq1.mongodb.net/${companyName}?retryWrites=true&w=majority`;

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // Insert a sample document into a collection to trigger database creation
    const sampleCollection = mongoose.connection.collection('sample');
    await sampleCollection.insertOne({ key: 'value' }); 
    console.log(`Created DB with ${companyName}`);
    // for(const model of existingModels) {
    //   await getData(model);
    // }
    // await millsController.create(req, res);
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    mongoose.connection.close();
  }
});

module.exports = router;
