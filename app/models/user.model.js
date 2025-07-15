import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  userImage: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  examSet: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamSet",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
