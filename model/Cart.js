const mongoose = require("mongoose");

const cart_schema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.ObjectId
    },
    pid: {
        type: mongoose.Schema.ObjectId
    },
    qty:{
        type:Number
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Carts', cart_schema)
