import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    operationName: {
      type: String,
      // enum: ["create", "update", "delete"],
      required: true,
    },
    operationMode: {
      type: String,
      // enum: ["product", "user", "other"],
      required: true,
    },
    oldLog: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    newLog: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
