const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true,
        trim:true
    },

    author:{
        type:String,
        required:true,
        trim:true
    },

    publisher:{
        type:String,
        required:true,
        trim:true
    },

    isbn:{
        type:String,
        required:true,
        unique:true
    },

    category:{
        type:String,
        required:true
    },

    totalCopies:{
        type:Number,
        required:true
    },

    availableCopies:{
        type:Number,
        required:true
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Book",bookSchema);