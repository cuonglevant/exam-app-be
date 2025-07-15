import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  regNumber: String,
  examsTaken: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "",
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
