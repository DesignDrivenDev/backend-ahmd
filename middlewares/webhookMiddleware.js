// import axios from "axios";
// import webhookModel from "../models/webhookModel.js";

// export const triggerWebhooks = async (event, payload) => {
//   try {
//     const webhooks = await webhookModel.find({ event });
//     webhooks.forEach((webhook) => {
//       axios.post(webhook.url, payload).catch((err) => {
//         console.error(`Error sending webhook to ${webhook.url}:`, err.message);
//       });
//     });
//   } catch (error) {
//     console.error("Error fetching webhooks:", error.message);
//   }
// };

import webhookModel from "../models/webhookModel.js";

const triggerWebhooks = async (event, payload) => {
  try {
    const webhooks = await webhookModel.find({ event });
    webhooks.forEach((webhook) => {
      fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        })
        .catch((err) => {
          console.error(
            `Error sending webhook to ${webhook.url}:`,
            err.message
          );
        });
    });
  } catch (error) {
    console.error("Error fetching webhooks:", error.message);
  }
};
export default triggerWebhooks;
