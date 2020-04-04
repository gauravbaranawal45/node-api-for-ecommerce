const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({

    uid: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    pid: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('inactiveCarts', product_schema);


