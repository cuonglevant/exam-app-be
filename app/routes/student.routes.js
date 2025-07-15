import express from "express";
import * as controller from "../controllers/student.controller.js";

const router = express.Router();

// Student routes
router.post("/", controller.createStudent);
router.get("/", controller.getStudents);
router.get("/:id", controller.getStudentById);
router.get("/reg/:regNumber", controller.getStudentByRegNumber);
router.put("/:id", controller.updateStudent);
router.delete("/:id", controller.deleteStudent);
router.post("/:id/exams", controller.addExamToStudent);

export default router;
