const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Companies = require("../models/companies.model.js");
// const Mills = require("../models/mills.model.js");
// const Orders = require("../models/orders.model.js");
// const Brokers = require("../models/brokers.model.js");
const millsController = require('./mills.controller.js');
const { saveToCompany, Company } = require("../models/companies.model.js");
const connectDatabase = require("../connection.js");
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
    const { companyId, companyName, gstin, email } = req.body;

    const uri = `mongodb+srv://pixdeep:pixdeep123@cluster0.y2cq1.mongodb.net/${companyName}?retryWrites=true&w=majority`
    const connection = await mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // const sampleCollection = mongoose.conn.collection('sample');
    // await sampleCollection.insertOne({ key: 'value' });
    // const newCompany = await companiesModel.create(req.body);
    // res.status(201).send(newCompany);

    // const uri = `mongodb+srv://pixdeep:pixdeep123@cluster0.y2cq1.mongodb.net/${companyName}?retryWrites=true&w=majority`;

    // const connection = await mongoose.createConnection(uri,
    //   {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     connectTimeoutMS: 30000,
    //     socketTimeoutMS: 30000,
    //   });

    // const db = await mongoose.connection.useDb(companyName);
    // console.log("db changed");
    // const sampleCollection = mongoose.connection.collection('sample');
    // await sampleCollection.insertOne({ key: 'value' });
    // const companiesModel = mongoose.connection.model('Companies', Companies.schema)
    // const newCompany = await companiesModel.create(req.body);
    const sampleCollection = connection.collection('sample');
    await sampleCollection.insertOne({ key: 'value' });
    console.log(`Created DB with ${companyName}`);
    saveToCompany({ companyId, companyName, gstin, email });
    res.send(`Created DB with ${companyName}`);
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
