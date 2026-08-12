const Issue = require("../models/Issue");
const Book = require("../models/Book");
const Student = require("../models/Student");

// =======================================
// Issue Book
// =======================================
exports.issueBook = async (req, res) => {

    try {

        const { student, book, dueDate } = req.body;

        // Check Student
        const studentData = await Student.findById(student);

        if (!studentData) {

            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });

        }

        // Check Book
        const bookData = await Book.findById(book);

        if (!bookData) {

            return res.status(404).json({
                success: false,
                message: "Book Not Found"
            });

        }

        // Check Availability
        if (bookData.availableCopies <= 0) {

            return res.status(400).json({
                success: false,
                message: "Book Not Available"
            });

        }

        // Create Issue Record
        const issue = await Issue.create({

            student,
            book,
            dueDate

        });

        // Reduce Available Copies
        bookData.availableCopies -= 1;

        await bookData.save();

        res.status(201).json({

            success: true,
            message: "Book Issued Successfully",
            data: issue

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// =======================================
// Get All Issued Books
// =======================================
exports.getIssuedBooks = async (req, res) => {

    try {

        const issues = await Issue.find()

            .populate("student")

            .populate("book")

            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,
            count: issues.length,
            data: issues

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// =======================================
// Return Book
// =======================================
exports.returnBook = async (req, res) => {

    try {

        const issue = await Issue.findById(req.params.id);

        if (!issue) {

            return res.status(404).json({

                success: false,
                message: "Issue Record Not Found"

            });

        }

        if (issue.status === "Returned") {

            return res.status(400).json({

                success: false,
                message: "Book Already Returned"

            });

        }

        issue.status = "Returned";

        issue.returnDate = new Date();

        await issue.save();

        const book = await Book.findById(issue.book);

        if (book) {

            book.availableCopies += 1;

            await book.save();

        }

        res.status(200).json({

            success: true,
            message: "Book Returned Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// =======================================
// Delete Issue Record
// =======================================
exports.deleteIssue = async (req, res) => {

    try {

        const issue = await Issue.findByIdAndDelete(req.params.id);

        if (!issue) {

            return res.status(404).json({

                success: false,
                message: "Issue Record Not Found"

            });

        }

        res.status(200).json({

            success: true,
            message: "Issue Record Deleted"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};