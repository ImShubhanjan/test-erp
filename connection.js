const mongoose = require('mongoose');

async function connectDatabase(companyName) {
    try {


        console.log("inside connection.js with " + companyName);
        const uri = `mongodb+srv://pixdeep:pixdeep123@cluster0.y2cq1.mongodb.net/${companyName}?retryWrites=true&w=majority`
        const connection = await mongoose.createConnection(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
        });
        console.log("connection done");
        const db = await mongoose.connection.useDb(companyName);
        console.log("db changed");
        return connection;
    } catch(err) {
        console.log(err);
    }
}

module.exports = connectDatabase