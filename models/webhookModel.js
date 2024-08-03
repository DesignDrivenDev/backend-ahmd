import mongoose from "mongoose";

const webhookSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    event: { type: String, required: true },
  },
  { timestamps: true }
);

const webhookModel = mongoose.model("Webhook", webhookSchema);

export default webhookModel;
