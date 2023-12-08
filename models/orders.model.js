const mongoose = require('mongoose')

//--------------------Model/schema for Orders---------------
module.exports = mongoose.model('Orders', {
    amount: { type: String, name: 'Amount' },
    tax: { type: String, name: 'Tax' },
    totalAmount: { type: String, name: 'Total Amount' },
});

function generateOrderId() {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    return `ORD-${year}${month}${day}${hour}${minute}${second}${milliseconds}`;
}


module.exports.generateOrderId = generateOrderId;