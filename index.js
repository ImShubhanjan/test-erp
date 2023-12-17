const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const m2s = require('mongoose-to-swagger');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const MillsSchema = require('./models/mills.model.js');

const swaggerSchema = m2s(MillsSchema);

const MillsRoutes = require('./controllers/mills.controller.js');
const OrdersRoutes = require('./controllers/orders.controller.js');
const BrokersRoutes = require('./controllers/brokers.controller.js');
const CompaniesRoutes = require('./controllers/companies.controller.js');



//Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Test ERP',
            version: '1.0.0',
            description: 'Testing the project ERP',
        },
        servers: [
            {
                url: 'http://localhost:8989',
            },
        ],
    },
    apis: ['./controllers/*.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// app.use('/api/orders', OrdersRoutes);
app.use('/api/mills', MillsRoutes);
app.use('/api/brokers', BrokersRoutes);
app.use('/api/companies', CompaniesRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.listen(8989, () => console.log("Server started on port 8989"));
