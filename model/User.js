const mongoose = require("mongoose");

const post_schema = new mongoose.Schema({
    name: {
        type: String
    },
    email_number: {
        type: String
    },
    password: {
        type: String
    },
    token:{
        type:String
    }
}
    , {
        timestamps: true
    }
);


module.exports = mongoose.model("users", post_schema);