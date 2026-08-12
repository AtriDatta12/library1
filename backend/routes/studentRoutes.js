const express = require("express");

const router = express.Router();

const {
    addStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

// ================================
// Student Routes
// ================================

// Add Student
router.post("/", addStudent);

// Get All Students
router.get("/", getStudents);

// Get Single Student
router.get("/:id", getStudent);

// Update Student
router.put("/:id", updateStudent);

// Delete Student
router.delete("/:id", deleteStudent);

module.exports = router;