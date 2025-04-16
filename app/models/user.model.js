import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  dob: Date,
  email: String,
  password: String,
  phoneNumber: String,
  idCard: String,
  userImage: String,
  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    nullables: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
