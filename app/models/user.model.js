import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  userImage: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    nullables: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
