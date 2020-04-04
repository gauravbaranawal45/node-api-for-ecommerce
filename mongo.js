const mongoose = require("mongoose");
require("dotenv").config();
var mongoDBErrors = require('mongoose-mongodb-errors')

mongoose.plugin(mongoDBErrors);
mongoose.Promise = global.Promise;

// console.log(process.env.MONGOURI);
mongoose.connect("mongodb+srv://admin:udm677dYoRxVGQNq@cluster0-bsmop.mongodb.net/react_ecomm_admin?retryWrites=true&w=majority", {useNewUrlParser: true,
  useUnifiedTopology: true});