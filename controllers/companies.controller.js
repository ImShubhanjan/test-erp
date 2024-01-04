const express = require("express");
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const router = express.Router();

const Companies = require("../models/companies.model.js");
const Mills = require("../models/mills.model.js");
const Orders = require("../models/orders.model.js");
const Brokers = require("../models/brokers.model.js");
const millsController = require('./mills.controller.js');
const { saveToCompany, Company } = require("../models/companies.model.js");
const connectDatabase = require("../connection.js");
const existingModels = ["mills", "orders", "brokers"];

// Function to create models dynamically
const createModels = async (connection) => {
  try {
    const existingModels = ["mills", "orders", "brokers"];

    for (const modelName of existingModels) {
      const modelFilePath = path.join(__dirname, '..', 'models', `${modelName}.model.js`);

      if (fs.existsSync(modelFilePath)) {
        const modelFile = require(modelFilePath);
        const Model = connection.model(modelName, modelFile.schema);
        console.log(`Created ${modelName} model in the new database`);
      } else {
        console.error(`Model file not found for ${modelName}`);
      }

      // Create the model in the new database
      // const modelCollection = connection.collection(modelName.toLowerCase());

      // console.log(`Created ${modelName} model in the new database`);
    }
  } catch (error) {
    console.error("Error creating models:", error);
  }
};

router.get("/", (req, res) => {
  res.send("Company");
});

router.post("/", async (req, res) => {
  try {
    const { companyName, gstin, email } = req.body;
    const formattedCompanyName = companyName.replace(/\s/g, "_")
    //companyId is generated in the format companyName_ddmmyyyy_hhmmss
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/[\/ :]/g, "")
      .replace(/,/g, "_");
    const companyId = `${formattedCompanyName}_${formattedDate}`;
    console.log(companyId);
    const uri = `mongodb+srv://pixdeep:pixdeep123@cluster0.y2cq1.mongodb.net/${companyId}?retryWrites=true&w=majority`
    const connection = await mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const sampleCollection = connection.collection('Created Date');
    await sampleCollection.insertOne({ date: new Date().toLocaleString('en-GB') });
    console.log(`Created DB with ${companyId}`);
    saveToCompany({ companyId, companyName, gstin, email });
    // Create existing models in the new database
    await createModels(connection);
    res.send(`Created DB with ${companyId}`);
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
