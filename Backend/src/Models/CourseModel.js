const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true
    },
    // coursePrice: {    
    //     type: String,
    //     required: true
    // },
    courseImage: {
        type: String,
        required: true
    },
    coursePdf: {
        type: String,
        required: false
    },
    courseVideo: {
        type: String,
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Educator"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Course", CourseSchema);
