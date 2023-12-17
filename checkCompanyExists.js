const mongoose = require('mongoose');
const { Company } = require('./models/companies.model');

async function checkForCompanyExistence(companyName) {
    console.log("inside check");
    const uri = 'mongodb+srv://pixdeep:pixdeep123@cluster0.y2cq1.mongodb.net/companyNames?retryWrites=true&w=majority'
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000,
    }).then(async () => {
        try {
            const company = await Company.findOne({ companyName });
            if (company) {
                console.log("Is there");
                return true;
            } else {
                console.log("Not there");
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    });
}

module.exports = checkForCompanyExistence;