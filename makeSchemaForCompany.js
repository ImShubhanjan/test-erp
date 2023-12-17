const mongoose = require('mongoose');
const connectDatabase = require('./connection');

async function makeSchemaForCompany(companyName, modelName) {
    console.log("inside make schema company")
    const conn = await connectDatabase(companyName);
    const modelForComp = conn.model(`${modelName}`, modelName.schema);
    console.log("---->>>" + modelForComp);
    return modelForComp;
}

module.exports = makeSchemaForCompany;