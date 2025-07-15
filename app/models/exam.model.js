import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  code: String,
  name: {
    type: String,
    required: true,
  },
  parts: [
    {
      partNumber: String,
      score: Number,
      questions: [
        {
          questionNumber: String,
          correctAnswer: String,
        },
      ],
    },
  ],
});

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
