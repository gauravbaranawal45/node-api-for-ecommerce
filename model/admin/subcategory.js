const mongoose = require('mongoose')

const usertoken = new mongoose.Schema({
    cat_id: {
        type: mongoose.Schema.ObjectId
    },
    name: {
        type: String
    },
    status: {
        type: String
    }
}
    , {
        timestamps: true
    }
)

module.exports = mongoose.model("subcategory", usertoken)