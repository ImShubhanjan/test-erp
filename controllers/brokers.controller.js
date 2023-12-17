const express = require('express')
const router = express.Router()

const Brokers = require('../models/brokers.model.js');
const connectDatabase = require('../connection.js');
const makeSchemaForCompany = require('../makeSchemaForCompany.js')
const brokersModel = require('../models/brokers.model.js');

//-----------API to fetch all broker details--------------------
router.get('/:companyName', async (request, response) => {
    const { companyName } = request.params;
    try {
        console.log(companyName);
        const conn = await connectDatabase(companyName);
        const brokerModel = conn.model('Brokers', Brokers.schema);
        brokerModel.find()
            .then(data => {
                response.send(`brokers from ${companyName}` + data)
            })
            .catch(error => {
                console.log(error)
            });
    } catch (err) {
        console.log(companyName);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

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

//------------API to create an broker according to models----------------------
router.post('/:companyName', async (request, response) => {
    const { brokerPhoneNumber } = request.body;
    const { companyName } = request.params;
    try {
        console.log("broker.cont " + companyName);
        const conn = await connectDatabase(companyName);
        const brokersModel = conn.model('Brokers', Brokers.schema);

        //-----------Validating whether Broker already exists or not-------------------
        const existingBroker = await brokersModel.findOne({ brokerPhoneNumber });
        if (existingBroker)
            return response.status(400).json({ message: "Broker already exists" });
        const newBroker = await brokersModel.create(request.body)
        response.status(201).send(newBroker);
    } catch (error) {
        response.status(500).json({ error: "Error Creating Broker" })
    }
});

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

module.exports = router