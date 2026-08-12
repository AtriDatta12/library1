
const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
{
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },

    issueDate: {
        type: Date,
        default: Date.now
    },

    dueDate: {
        type: Date,
        required: true
    },

    returnDate: {
        type: Date,
        default: null
    },

    status: {
        type: String,
        enum: ["Issued", "Returned"],
        default: "Issued"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Issue", issueSchema);