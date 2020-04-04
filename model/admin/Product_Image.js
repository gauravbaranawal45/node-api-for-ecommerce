const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({
    
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('prod_image', product_schema);