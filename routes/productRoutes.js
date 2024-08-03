import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.post("/", authMiddleware, createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", authMiddleware, getProduct);
productRouter.put("/:id", authMiddleware, updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
