const mongoose = require("mongoose");

const EducatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "Educator", "Admin"],
        default: "Educator",
        required: true
    },
   
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Educator", EducatorSchema);
