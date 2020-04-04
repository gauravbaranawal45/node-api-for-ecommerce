const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({
    
    product_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    size: {
        type: Array,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    subCat: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Products', product_schema);


