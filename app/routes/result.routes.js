import express from "express";
import * as controller from "../controllers/result.controller.js";

const router = express.Router();

// Result routes
router.post("/", controller.createResult);
router.get("/", controller.getResults);
router.get("/:id", controller.getResultById);
router.get("/student/:studentId", controller.getResultsByStudent);
router.get("/exam/:examId", controller.getResultsByExam);
router.put("/:id", controller.updateResult);
router.delete("/:id", controller.deleteResult);

// Statistics routes
router.get("/statistics/exam/:examId", controller.getResultStatistics);
router.get("/statistics/student/:studentId", controller.getStudentPerformance);

export default router;
