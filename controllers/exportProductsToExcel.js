import productModel from "../models/productModel.js";
import xlsx from "xlsx";

const exportProductsToExcel = async (req, res) => {
  try {
    const products = await productModel.find({});

    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }
    const productData = products.map((product) => ({
      Title: product.title,
      Description: product.description,
      Category: product.category,
      Price: product.price,
      DiscountPercentage: product.discountPercentage,
      Rating: product.rating,
      Stock: product.stock,
      Tags: product.tags.join(", "),
      Brand: product.brand,
      SKU: product.sku,
      Weight: product.weight,
      Dimensions: product.dimensions,
      WarrantyInformation: product.warrantyInformation,
      ShippingInformation: product.shippingInformation,
      AvailabilityStatus: product.availabilityStatus,
      Reviews: product.reviews.join(", "),
      ReturnPolicy: product.returnPolicy,
      MinimumOrderQuantity: product.minimumOrderQuantity,
      Thumbnail: product.thumbnail,
      Images: product.images.join(", "),
      CreatedAt: product.createdAt,
      UpdatedAt: product.updatedAt,
    }));

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(productData);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Products");
    const excelBuffer = xlsx.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader("Content-Disposition", "attachment; filename=products.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(excelBuffer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error exporting products to Excel", error });
  }
};

export default exportProductsToExcel;
