// models/Service.js
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    provider: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    serviceName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
