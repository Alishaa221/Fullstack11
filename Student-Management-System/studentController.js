const Student = require('../models/student');

// Get all students
exports.getAllStudents = async (req, res) => {
    const students = await Student.find();
    res.status(200).json(students);
};

// Get a single student
exports.getStudentById = async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (student) {
        res.status(200).json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
};

// Create a new student
exports.createStudent = async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (student) {
        res.status(200).json({ message: 'Student deleted', student });
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
};