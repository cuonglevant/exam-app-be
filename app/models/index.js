import mongoose from "mongoose";
import User from "./user.model.js";
import Role from "./role.model.js";
import Exam from "./exam.model.js";
import ExamSet from "./examSet.model.js";
import Result from "./result.model.js";
import Student from "./student.model.js";

mongoose.Promise = global.Promise;

const db = {
  mongoose,
  user: User,
  role: Role,
  exam: Exam,
  examSet: ExamSet,
  result: Result,
  student: Student,
};

export default db;
