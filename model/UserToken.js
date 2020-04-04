const mongoose = require('mongoose')

const usertoken = new mongoose.Schema({
    uid:{
        type:mongoose.Schema.ObjectId
    },
    token:{
        type:String
    }
}
, {
    timestamps: true
}
)

module.exports = mongoose.model("userToken",usertoken)