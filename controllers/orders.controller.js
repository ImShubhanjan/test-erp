// const express = require('express')
// const router = express.Router()

// const Orders = require('../models/orders.model.js');
// // const Brokers = require('../models/brokers.model.js');
// // const Items = require('../models/items.model.js');
// const Mills = require('../models/mills.model.js');
// function formatDate(date) {
//     const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
//     // console.log(options);
//     return date.toLocaleDateString('en-GB', options);
// }
/**
 * 
 */

// //---------API to get Orders------------
// router.get('/', (request, response) => {    
//     Orders.find()
//         .populate('millId itemId brokerId')
//         .then(data => {
//             response.send(data)
//         })
//         .catch(error => {
//             console.log(error)
//         });
// });
// //-----------------API to filter based on fields in the schema------------
// router.get('/filter/:param', async (request, response) => {
//     const { param } = request.params;

//     const [field, value] = param.split('=');
//     if (field && value) {
//         const query = {};
//         query[field] = value;
//         try {
//             const orders = await Orders.find(query)
//                 .populate('millId itemId brokerId')
//                 .exec();

//             response.send(orders);
//         } catch (error) {
//             console.log(error);
//             response.status(500).send('Error fetching orders');
//         }
//     } else {
//         response.status(400).send('Invalid parameter format');
//     }
// });
// //---------Create Order -----------------------
// router.post('/', async (request, response) => {
//     orderId = Orders.generateOrderId();
//     try {
//         const orderDate = new Date();
//         const formattedOrderDate = formatDate(orderDate);
//         const newOrder = await Orders.create({
//             orderId,
//             ...request.body,
//             orderDate: formattedOrderDate,
//         });
//         return response.status(201).send(newOrder);
//     } catch (error) {
//         response.status(500).json({ error: "Error Creating Order" })
//     }
// });

// //---------------Edit order-----------------
// router.put('/:id', async (request, response) => {
//     try {
//         const updateDate = new Date();
//         const formattedOrderDate = formatDate(updateDate);
//         const updateBody = {
//             ...request.body,
//             updatedDate: formattedOrderDate,
//         }
//         console.log(updateBody);
//         const updateOrder = await Orders.findByIdAndUpdate(request.params.id, updateBody, { new: true });
//         if (!updateOrder)
//             return response.status(404).json({ error: "Order not found" });
//         response.json(updateOrder);
//     } catch (error) {
//         response.status(500).json({ error: 'Error Updating Order details' })
//     }
// })

// //---------Delete Order-----------------------
// router.delete('/:id', async (request, response) => {
//     try {
//         const deletedOrder = await Orders.findByIdAndDelete(request.params.id);
//         if (!deletedOrder)
//             return response.status(404).json({ error: 'Order not found' });
//         response.json({ message: 'Order deleted' });
//     } catch (error) {
//         response.status(500).json({ error: 'Error deleting Order' });
//     }
// })

// module.exports = router