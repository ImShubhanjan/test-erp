const mongoose = require('mongoose')

module.exports = mongoose.model('Companies', {
    companyId: {type: String, name: 'Company ID'},
    companyName: {type: String, name: 'Company Name'},
    gstin: {type: String, name: 'GSTIN'},
    email: {type: String, name: 'Company Email'},
});