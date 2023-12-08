const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

const MillsRoutes = require('./controllers/mills.controller.js');
const OrdersRoutes = require('./controllers/orders.controller.js');
const BrokersRoutes = require('./controllers/brokers.controller.js');
const CompaniesRoutes = require('./controllers/companies.controller.js');



// app.use('/api/orders', OrdersRoutes);
app.use('/api/mills', MillsRoutes);
// app.use('/api/brokers', BrokersRoutes);
app.use('/api/companies', CompaniesRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.listen(8989, () => console.log("Server started on port 8989"));


