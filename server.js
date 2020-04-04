
const express = require("express")
const app = express();
require('express-async-errors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan")
const cors = require("cors")
//database connection
require("./mongo");

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })).use(morgan()).use(cors())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

//Routes
app.use("/data", require("./routes/route"))
app.use("/admin", require("./routes/AdminRoute"))
app.use(express.static(__dirname + '/upload'));

//for not found route
app.use((req, res, next) => {
    req.status = 404;
    const error = new Error("Routes not found.")
    next(error);
})

//error handler
if (app.get("env") === "production") {
    app.use((error, req, res, next) => {
        res.status(req.status || 500).send({
            message: error.message
        });
    });
}
app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
        message: error.message,
        stack: error.stack
    });
});



const port = 8000;
app.listen(port, function () {
    console.log("servers is " + port);
})