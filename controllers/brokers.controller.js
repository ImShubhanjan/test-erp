// const express = require('express')
// const router = express.Router()

// const Brokers = require('../models/brokers.model.js');

// //-----------API to fetch all broker details--------------------
// router.get('/', (request, response) => {
//     Brokers.find()
//         .then(data => {
//             response.send(data)
//         })
//         .catch(error => {
//             console.log(error)
//         });
// });

// //------------API to fetch single broker based on Object Id---------------------
// router.get('/:id', async (request, response) => {
//     try {
//         const broker = await Brokers.findById(request.params.id);
//         if (!broker)
//             return response.status(404).json({ error: "Broker not found" });
//         response.json(broker);
//     } catch (error) {
//         response.status(500).json({ error: 'Error getting Broker details' })
//     }
// });

// //------------API to create an broker according to models----------------------
// router.post('/', async (request, response) => {
//     const { brokerPhoneNumber } = request.body;
//     try {
//         //-----------Validating whether Broker already exists or not-------------------
//         const existingBroker = await Brokers.findOne({ brokerPhoneNumber });
//         if (existingBroker)
//             return response.status(400).json({ message: "Broker already exists" });
//         const brokerId = Brokers.generateBrokerId(request.body.brokerName, request.body.brokerLocation, request.body.brokerPhoneNumber);
//         console.log(brokerId);
//         const newBroker = await Brokers.create({
//             brokerId,
//             ...request.body,
//         });
//         response.status(201).send(newBroker);
//     } catch (error) {
//         response.status(500).json({ error: "Error Creating Broker" })
//     }
// });

// //-----------------API to update the existing Broker details -----------------------
// router.put('/:id', async (request, response) => {
//     try {
//         const updateBroker = await Brokers.findByIdAndUpdate(request.params.id, request.body, { new: true });
//         if (!updateBroker)
//             return response.status(404).json({ error: "Broker not found" });
//         response.json(updateBroker);
//     } catch (error) {
//         response.status(500).json({ error: 'Error Updating Broker details' })
//     }
// });

// //--------------API to delete the Broker based on Object id ------------------------
// router.delete('/:id', async (request, response) => {
//     try {
//         const deletedBroker = await Brokers.findByIdAndDelete(request.params.id);
//         if (!deletedBroker)
//             return response.status(404).json({ error: 'Broker not found' });
//         response.json({ message: 'Broker deleted' });
//     } catch (error) {
//         response.status(500).json({ error: 'Error deleting Broker' });
//     }
// });

// module.exports = router