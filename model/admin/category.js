const mongoose = require('mongoose')

const usertoken = new mongoose.Schema({
    name: {
        type: String
    },
    status:{
    	type: String
    },
}
    , {
        timestamps: true
    }
)

module.exports = mongoose.model("category", usertoken)