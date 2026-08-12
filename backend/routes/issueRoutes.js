const express = require("express");

const router = express.Router();

const {
    issueBook,
    getIssuedBooks,
    returnBook,
    deleteIssue
} = require("../controllers/issueController");

// ===================================
// Issue Book
// ===================================
router.post("/", issueBook);

// ===================================
// Get All Issued Books
// ===================================
router.get("/", getIssuedBooks);

// ===================================
// Return Book
// ===================================
router.put("/:id", returnBook);

// ===================================
// Delete Issue Record
// ===================================
router.delete("/:id", deleteIssue);

module.exports = router;