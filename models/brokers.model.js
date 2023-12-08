const mongoose = require('mongoose')

module.exports = mongoose.model('Brokers', {
    brokerId: { type: String, name: 'Broker Id' },
    brokerName: { type: String, required: true, name: 'Broker Name' },
    brokerLocation: { type: String, required: true, name: 'Broker Location' },
    brokerPhoneNumber: { type: String, required: true, name: 'Broker Phone Number' },
    commissionRate: { type: Number, required: true, name: 'Commission Rate' }
});