import db from "../models/index.js";

const Result = db.result;
const Student = db.student;
const Exam = db.exam;

export const createResult = async (req, res) => {
  try {
    const { code, student, score, parts } = req.body;

    // Verify that the exam and student exist
    const examExists = await Exam.findById(code);
    const studentExists = await Student.findById(student);

    if (!examExists) {
      return res.status(400).json({ message: "Exam not found" });
    }

    if (!studentExists) {
      return res.status(400).json({ message: "Student not found" });
    }

    const newResult = new Result({
      code,
      student,
      score,
      parts,
    });

    const savedResult = await newResult.save();

    // Populate the result with exam and student details
    const populatedResult = await Result.findById(savedResult._id)
      .populate("code", "name")
      .populate("student", "name regNumber");

    res.status(201).json(populatedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("code", "name")
      .populate("student", "name regNumber")
      .sort({ date: -1 });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate("code", "name")
      .populate("student", "name regNumber");

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResultsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const results = await Result.find({ student: studentId })
      .populate("code", "name")
      .populate("student", "name regNumber")
      .sort({ date: -1 });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResultsByExam = async (req, res) => {
  try {
    const { examId } = req.params;

    const results = await Result.find({ code: examId })
      .populate("code", "name")
      .populate("student", "name regNumber")
      .sort({ date: -1 });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateResult = async (req, res) => {
  try {
    const { code, student, score, parts } = req.body;

    // Verify that the exam and student exist if they are being updated
    if (code) {
      const examExists = await Exam.findById(code);
      if (!examExists) {
        return res.status(400).json({ message: "Exam not found" });
      }
    }

    if (student) {
      const studentExists = await Student.findById(student);
      if (!studentExists) {
        return res.status(400).json({ message: "Student not found" });
      }
    }

    const updatedResult = await Result.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("code", "name")
      .populate("student", "name regNumber");

    if (!updatedResult) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.status(200).json(updatedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const deletedResult = await Result.findByIdAndDelete(req.params.id);
    if (!deletedResult) {
      return res.status(404).json({ message: "Result not found" });
    }
    res.status(200).json({ message: "Result deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResultStatistics = async (req, res) => {
  try {
    const { examId } = req.params;

    const results = await Result.find({ code: examId });

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No results found for this exam" });
    }

    const scores = results.map((result) => result.score);
    const totalStudents = results.length;
    const averageScore =
      scores.reduce((sum, score) => sum + score, 0) / totalStudents;
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);

    // Grade distribution (assuming 0-100 scale)
    const gradeDistribution = {
      "A (90-100)": scores.filter((score) => score >= 90).length,
      "B (80-89)": scores.filter((score) => score >= 80 && score < 90).length,
      "C (70-79)": scores.filter((score) => score >= 70 && score < 80).length,
      "D (60-69)": scores.filter((score) => score >= 60 && score < 70).length,
      "F (0-59)": scores.filter((score) => score < 60).length,
    };

    res.status(200).json({
      totalStudents,
      averageScore: Math.round(averageScore * 100) / 100,
      highestScore,
      lowestScore,
      gradeDistribution,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentPerformance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const results = await Result.find({ student: studentId })
      .populate("code", "name")
      .sort({ date: -1 });

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No results found for this student" });
    }

    const scores = results.map((result) => result.score);
    const totalExams = results.length;
    const averageScore =
      scores.reduce((sum, score) => sum + score, 0) / totalExams;
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);

    res.status(200).json({
      totalExams,
      averageScore: Math.round(averageScore * 100) / 100,
      highestScore,
      lowestScore,
      recentResults: results.slice(0, 5), // Last 5 results
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createResult,
  getResults,
  getResultById,
  getResultsByStudent,
  getResultsByExam,
  updateResult,
  deleteResult,
  getResultStatistics,
  getStudentPerformance,
};
