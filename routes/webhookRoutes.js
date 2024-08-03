import express from "express";
import webhookModel from "../models/webhookModel.js";

const webhookRouter = express.Router();

webhookRouter.post("/", async (req, res) => {
  const { url, event } = req.body;
  try {
    const newWebhook = await webhookModel.create({ url, event });
    res.status(201).json(newWebhook);
  } catch (error) {
    res.status(500).json({ message: "Error creating webhook", error });
  }
});

webhookRouter.get("/", async (req, res) => {
  try {
    const webhooks = await webhookModel.find();
    res.status(200).json(webhooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching webhooks", error });
  }
});

webhookRouter.delete("/:id", async (req, res) => {
  try {
    await webhookModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Webhook deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting webhook", error });
  }
});

export default webhookRouter;
