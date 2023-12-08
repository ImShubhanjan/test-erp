const mongoose = require('mongoose')

module.exports = mongoose.model('Mills', {
    millName: { type: String, name: 'Mill Name' },
    millAddress: { type: String, name: 'Mill Address' },
    millGSTIN: { type: String, name: 'Mill GSTIN' },
    millPhoneNumber: { type: String, name: 'Mill Phone Number' },
    millState: { type: String, name: 'Mill State' },
})