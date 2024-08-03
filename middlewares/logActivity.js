import ActivityLog from "../models/activityLog.js";

const logActivity = async (
  operationName,
  operationMode,
  oldLog,
  newLog
  // userId
) => {
  try {
    const log = await ActivityLog.create({
      operationName,
      operationMode,
      oldLog,
      newLog,
      // user: userId,
    });
    await log.save();
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
};

export default logActivity;
