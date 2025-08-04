import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },  
  resetPasswordToken: {type: String},
  resetPasswordExpiry: {type: Date},
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);

