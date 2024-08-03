import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";
import { config } from "./config/config.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import productExport from "./routes/exportProductsRoute.js";
import multer from "multer";

const app = express();
const upload = multer({
  dest: "uploads/",
});

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// connect to database
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/export-products", productExport);

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Please upload a file" });
    }

    const workbook = xlsx.readFile(file.path);
    const sheetNames = workbook.SheetNames;
    const sheet = workbook.Sheets[sheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    await Product.insertMany(data);

    res.status(200).json({ message: "Products imported successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.listen(config.port, (req, res) => {
  console.log(`Server is running on port http://localhost:${config.port}`);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});
