import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  parts: [
    {
      partNumber: String,
      score: Number,
      questions: [
        {
          questionNumber: String,
          correctAnswer: String,
          studentAnswer: String,
        },
      ],
    },
  ],
});

const Result = mongoose.model("Result", resultSchema);

export default Result;
