import mongoose from "mongoose";

const pomodoroSessionSchema = new mongoose.Schema({
  room:        { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  startedBy:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startTime:   { type: Date, required: true },
  endTime:     { type: Date },
  type:        { type: String, enum: ["work", "break"], default: "work" },
  completed:   { type: Boolean, default: false }
});

export default mongoose.model("PomodoroSession", pomodoroSessionSchema); 