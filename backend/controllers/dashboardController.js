const Book = require("../models/Book");
const Student = require("../models/Student");
const Issue = require("../models/Issue");


exports.getDashboard = async (req, res) => {

    try {

        const totalBooks = await Book.countDocuments();

        const totalStudents = await Student.countDocuments();

        const issuedBooks = await Issue.countDocuments({
            status: "Issued"
        });


        const books = await Book.find();


        let availableBooks = 0;


        books.forEach((book)=>{

            availableBooks += book.availableCopies;

        });



        res.status(200).json({

            success:true,

            data:{
                totalBooks,
                totalStudents,
                issuedBooks,
                availableBooks
            }

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};