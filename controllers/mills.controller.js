const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const Mills = require("../models/mills.model.js");


router.get('/:companyName', async (req, res) => {
    try {
        const { companyName } = req.params;
        console.log(companyName);
        const connection = await mongoose.connect(`mongodb+srv://pixdeep:pixdeep123@cluster0.y2cq1.mongodb.net/${companyName}?retryWrites=true&w=majority`);

        const db = await mongoose.connection.useDb(companyName);
        console.log(db);
        const mills = await Mills.find();
        res.send(`mills from ${companyName}` + mills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/:companyName', async (req, res) => {
    try {
        const { companyName } = req.params;
        console.log(companyName);
        const connection = await mongoose.connect(`mongodb+srv://pixdeep:pixdeep123@cluster0.y2cq1.mongodb.net/${companyName}?retryWrites=true&w=majority`);
        const db = await mongoose.connection.useDb(companyName);
        console.log(db);
        const newMill = await Mills.create(req.body);
        res.status(201).send(newMill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// function formatDate(date) {
//   const options = {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//   };
//   return date.toLocaleDateString("en-GB", options);
// }
//-----------API to fetch all mill details--------------------
// router.get("/", (request, response) => {
//   Mills.find()
//     .then((data) => {
//       response.send(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

router.get('/:companyName', async (req, res) => {
    try {
        const { companyName } = req.params;

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// //------------API to fetch single mill based on Object Id---------------------
// router.get("/:id", async (request, response) => {
//   try {
//     const mill = await Mills.findById(request.params.id);
//     if (!mill) return response.status(404).json({ error: "Mill not found" });
//     response.json(mill);
//   } catch (error) {
//     response.status(500).json({ error: "Error getting Mill details" });
//   }
// });

// //------------API to create an mills according to models----------------------
// router.post("/", async (request, response) => {
//   const { millPhoneNumber, millEmail } = request.body;
//   try {
//     const millAddedDate = new Date();
//     const formattedmillDate = formatDate(millAddedDate);
//     //-----------Validating whether mill already exists or not-------------------
//     const existingMill = await Mills.findOne({
//       $or: [{ millEmail }, { millPhoneNumber }],
//     });
//     if (existingMill)
//       return response.status(400).json({ message: "Mill already exists" });
//     const newMill = await Mills.create({
//       ...request.body,
//       millAddedDate: formattedmillDate,
//     });
//     response.status(201).send(newMill);
//   } catch (error) {
//     response.status(500).json({ error: "Error Creating Mill" });
//   }
// });

// //-----------------API to update the existing Broker details -----------------------
// router.put("/:id", async (request, response) => {
//   try {
//     const updateDate = new Date();
//     const formattedmillDate = formatDate(updateDate);
//     const updateBody = {
//       ...request.body,
//       millUpdatedDate: formattedmillDate,
//     };
//     console.log(updateBody);
//     const updateMill = await Mills.findByIdAndUpdate(
//       request.params.id,
//       updateBody,
//       { new: true }
//     );
//     if (!updateMill)
//       return response.status(404).json({ error: "Mill not found" });
//     response.json(updateMill);
//   } catch (error) {
//     response.status(500).json({ error: "Error Updating Mill details" });
//   }
// });

// //--------------API to delete the mill based on Object id ------------------------
// router.delete("/:id", async (request, response) => {
//   try {
//     const deletedMill = await Mills.findByIdAndDelete(request.params.id);
//     if (!deletedMill)
//       return response.status(404).json({ error: "Mill not found" });
//     response.json({ message: "Mill deleted" });
//   } catch (error) {
//     response.status(500).json({ error: "Error deleting Mill" });
//   }
// });

module.exports = router;
