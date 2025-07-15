import express from "express";
import * as controller from "../controllers/exam.controller.js";

const router = express.Router();

// ExamSet routes
router.post("/", controller.createExamSet);
router.get("/", controller.getExamSets);
router.get("/:id", controller.getExamSetById);
router.put("/:id", controller.updateExamSet);
router.delete("/:id", controller.deleteExamSet);

export default router;
