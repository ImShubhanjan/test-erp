const mongoose = require('mongoose');
const m2s = require('mongoose-to-swagger');

const Mills = require('./models/mills.model.js');

const swagSch = m2s(Mills);

module.exports = swagSch;