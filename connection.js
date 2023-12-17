const mongoose = require('mongoose');
const checkForCompanyExistence = require('./checkCompanyExists.js');

async function connectDatabase(companyName) {
    try {
        console.log("checking");
        const isCompany = await checkForCompanyExistence(companyName);
        console.log("isCompany", isCompany);
        if (isCompany) {
            console.log("checking done");
            console.log("inside connection.js with " + companyName);
            const uri = `mongodb+srv://pixdeep:pixdeep123@cluster0.y2cq1.mongodb.net/${companyName}?retryWrites=true&w=majority`
            const connection = await mongoose.createConnection(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                connectTimeoutMS: 30000,
                socketTimeoutMS: 30000,
            });
            console.log("connection done");
            // Creating a sample document in a collection
            const sampleCollection = connection.collection('sample');
            await sampleCollection.insertOne({ key: 'value' });
            const db = await mongoose.connection.useDb(companyName);
            console.log("db changed");
            return connection;
        } else {
            console.log("returning null");
            return null;
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = connectDatabase