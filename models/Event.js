import mongoose from "mongoose";

const { Schema } = mongoose;

const EventSchema = new Schema({
  type: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
  data: { type: Schema.Types.Mixed },
  userId: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);
