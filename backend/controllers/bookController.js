const Book = require("../models/Book");

// Add Book
const addBook = async (req, res) => {

    try {

        const book = await Book.create(req.body);

        res.status(201).json({
            success: true,
            message: "Book Added Successfully",
            data: book
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Books
const getBooks = async (req, res) => {

    try {

        const books = await Book.find();

        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Single Book
const getBook = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {

            return res.status(404).json({
                success: false,
                message: "Book Not Found"
            });

        }

        res.status(200).json({
            success: true,
            data: book
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Book
const updateBook = async (req, res) => {

    try {

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!book) {

            return res.status(404).json({
                success: false,
                message: "Book Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Book Updated Successfully",
            data: book
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Book
const deleteBook = async (req, res) => {

    try {

        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {

            return res.status(404).json({
                success: false,
                message: "Book Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Book Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
};