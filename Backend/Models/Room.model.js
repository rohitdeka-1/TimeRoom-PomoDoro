import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  owner:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  capacity: { type: Number, default: 3 },
  isLive:   { type: Boolean, default: false },
  activity: { type: String, default: "Pomodoro" },
  createdAt:{ type: Date, default: Date.now },
  roomId:   { type: String },
});

export default mongoose.model("Room", roomSchema);


