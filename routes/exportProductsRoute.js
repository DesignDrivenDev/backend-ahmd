import express from "express";

import exportProductsToExcel from "../controllers/exportProductsToExcel.js";

const productExport = express.Router();

// Define the route for exporting products to Excel
productExport.get("/", exportProductsToExcel);

export default productExport;
