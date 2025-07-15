import db from "../models/index.js";

const Student = db.student;

export const createStudent = async (req, res) => {
  try {
    const { name, regNumber } = req.body;

    // Check if student with this registration number already exists
    const existingStudent = await Student.findOne({ regNumber });
    if (existingStudent) {
      return res
        .status(400)
        .json({
          message: "Student with this registration number already exists",
        });
    }

    const newStudent = new Student({
      name,
      regNumber,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("examsTaken");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "examsTaken"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentByRegNumber = async (req, res) => {
  try {
    const student = await Student.findOne({
      regNumber: req.params.regNumber,
    }).populate("examsTaken");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { name, regNumber } = req.body;

    // Check if another student with this registration number exists
    if (regNumber) {
      const existingStudent = await Student.findOne({
        regNumber,
        _id: { $ne: req.params.id },
      });
      if (existingStudent) {
        return res
          .status(400)
          .json({
            message: "Student with this registration number already exists",
          });
      }
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addExamToStudent = async (req, res) => {
  try {
    const { examId } = req.body;
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Add exam to student's examsTaken if not already present
    if (!student.examsTaken.includes(examId)) {
      student.examsTaken.push(examId);
      await student.save();
    }

    res.status(200).json({ message: "Exam added to student successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createStudent,
  getStudents,
  getStudentById,
  getStudentByRegNumber,
  updateStudent,
  deleteStudent,
  addExamToStudent,
};
