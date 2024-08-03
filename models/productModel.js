import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number },
    comment: { type: String },
    reviewerName: { type: String },
    reviewerEmail: { type: String },
  },
  {
    timestamps: true,
  }
);

const dimensionsSchema = new mongoose.Schema(
  {
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Please provide product title"] },
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
    },
    price: { type: Number, required: [true, "Please provide product price"] },
    discountPercentage: { type: Number },
    rating: { type: Number },
    stock: { type: Number },
    tags: [String],
    brand: { type: String },
    sku: { type: String },
    weight: { type: Number },
    dimensions: { type: dimensionsSchema },
    warrantyInformation: { type: String },
    shippingInformation: { type: String },
    availabilityStatus: { type: String },
    reviews: [reviewSchema],
    returnPolicy: { type: String },
    minimumOrderQuantity: { type: Number },
    thumbnail: { type: String },
    images: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: [true, "Please provide product name"] },
//     description: {
//       type: String,
//       required: [true, "Please provide product description"],
//     },
//     price: { type: Number, required: [true, "Please provide product price"] },
//     category: {
//       type: String,
//       required: [true, "Please provide product category"],
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const productModel = mongoose.model("Product", productSchema);

// export default productModel;
