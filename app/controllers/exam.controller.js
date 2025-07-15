import db from "../models/index.js";

const Exam = db.exam;
const ExamSet = db.examSet;

export const createExam = async (req, res) => {
  try {
    const { code, name, questions } = req.body;
    const newExam = new Exam({
      code,
      name,
      questions,
    });
    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExam = async (req, res) => {
  try {
    const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedExam)
      return res.status(404).json({ message: "Exam not found" });
    res.status(200).json(updatedExam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const deletedExam = await Exam.findByIdAndDelete(req.params.id);
    if (!deletedExam)
      return res.status(404).json({ message: "Exam not found" });
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createExamSet = async (req, res) => {
  try {
    const { name, description, createdBy, numOfQuestions, examList } = req.body;
    const newExamSet = new ExamSet({
      name,
      description,
      createdBy,
      numOfQuestions,
      examList,
    });
    const savedExamSet = await newExamSet.save();
    res.status(201).json(savedExamSet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExamSets = async (req, res) => {
  try {
    const examSets = await ExamSet.find().populate("createdBy", "username");
    res.status(200).json(examSets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExamSetById = async (req, res) => {
  try {
    const examSet = await ExamSet.findById(req.params.id).populate(
      "createdBy",
      "username"
    );
    if (!examSet)
      return res.status(404).json({ message: "Exam set not found" });
    res.status(200).json(examSet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExamSet = async (req, res) => {
  try {
    const updatedExamSet = await ExamSet.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedExamSet)
      return res.status(404).json({ message: "Exam set not found" });
    res.status(200).json(updatedExamSet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExamSet = async (req, res) => {
  try {
    const deletedExamSet = await ExamSet.findByIdAndDelete(req.params.id);
    if (!deletedExamSet)
      return res.status(404).json({ message: "Exam set not found" });
    res.status(200).json({ message: "Exam set deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
  createExamSet,
  getExamSets,
  getExamSetById,
  updateExamSet,
  deleteExamSet,
};
