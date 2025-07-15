import express from "express";
import * as controller from "../controllers/exam.controller.js";

const router = express.Router();

// Exam routes
router.post("/", controller.createExam);
router.get("/", controller.getExams);
router.get("/:id", controller.getExamById);
router.put("/:id", controller.updateExam);
router.delete("/:id", controller.deleteExam);

export default router;
