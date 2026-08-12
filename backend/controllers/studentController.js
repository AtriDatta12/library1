const Student = require("../models/Student");

// ===============================
// Add Student
// ===============================
exports.addStudent = async (req, res) => {

    try {

        const student = await Student.create(req.body);

        res.status(201).json({
            success: true,
            message: "Student Added Successfully",
            data: student
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Get All Students
// ===============================
exports.getStudents = async (req, res) => {

    try {

        const students = await Student.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Get Student By ID
// ===============================
exports.getStudent = async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });

        }

        res.status(200).json({
            success: true,
            data: student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Update Student
// ===============================
exports.updateStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Student Updated Successfully",
            data: student
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Delete Student
// ===============================
exports.deleteStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Student Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};