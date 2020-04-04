const mongoose = require("mongoose");

const profile_schema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:"User id is required."
    },
    address :{
        type:String,
        required:"Address is require."
    },
    state :{
        type:String,
        required:"State is require."
    },
    country:{
        type:String,
        required:"Country is require."
    }
    
             
},
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Profile',profile_schema)
