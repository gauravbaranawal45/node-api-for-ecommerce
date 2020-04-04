const mongoose = require("mongoose");

const employee_schema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name id is required."
    },
    salry: {
        type: String,
        required: "Salry is require."
    },
    department: {
        type: String,
        required: "Department is require."
    }


},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Employees', employee_schema)
