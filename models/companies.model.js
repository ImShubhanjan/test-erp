const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    companyId: { type: String, name: 'Company ID' },
    companyName: { type: String, name: 'Company Name' },
    gstin: { type: String, name: 'GSTIN' },
    email: { type: String, name: 'Company Email' },
})
const Company = mongoose.model('Companies', companySchema)
const uri = 'mongodb+srv://pixdeep:pixdeep123@cluster0.y2cq1.mongodb.net/companyNames?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function saveToCompany(companyData) {
    console.log("companyData", companyData);
    try {
        const { companyId, companyName, gstin, email } = companyData;
        console.log("companyData", companyId, companyName, gstin, email);
        const newCompany = new Company({
            companyId: companyId,
            companyName: companyName,
            gstin: gstin,
            email: email,
        });
        console.log("from companies.model.js " + newCompany);
        await newCompany.save();
        console.log("from companies.model.js company saved");
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    saveToCompany: saveToCompany,
    Company: Company
};