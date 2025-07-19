import mongoose from "mongoose";

const roomMemberSchema = new mongoose.Schema({
  room:      { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  user:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  joinedAt:  { type: Date, default: Date.now },
  isHost:    { type: Boolean, default: false },
  status:    { type: String, enum: ["active", "break", "offline"], default: "active" }
});

export default mongoose.model("RoomMember", roomMemberSchema); 