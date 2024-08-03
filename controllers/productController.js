import logActivity from "../middlewares/logActivity.js";
import triggerWebhooks from "../middlewares/webhookMiddleware.js";
import productModel from "../models/productModel.js";

// Create a new product
export const createProduct = async (req, res) => {
  const {
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    minimumOrderQuantity,
    thumbnail,
    images,
  } = req.body;

  const userId = req.user.id; // Get the user ID from the JWT token

  try {
    const newProduct = await productModel.create({
      title,
      description,
      category,
      price,
      discountPercentage,
      rating,
      stock,
      tags,
      brand,
      sku,
      weight,
      dimensions,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      reviews,
      returnPolicy,
      minimumOrderQuantity,
      thumbnail,
      images,
      createdBy: userId,
    });

    await triggerWebhooks("product.created", newProduct);

    await logActivity("product-create", "product", {}, newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("createdBy", "name email");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a single product
export const getProduct = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("createdBy", "name email");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const {
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    minimumOrderQuantity,
    thumbnail,
    images,
  } = req.body;

  const userId = req.user.id; // Get the user ID from the JWT token

  try {
    const oldProduct = await productModel.findById(req.params.id);
    if (!oldProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the logged-in user is the creator of the product
    if (oldProduct.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this product" });
    }

    const updatedProductData = {
      title: title || oldProduct.title,
      description: description || oldProduct.description,
      category: category || oldProduct.category,
      price: price || oldProduct.price,
      discountPercentage: discountPercentage || oldProduct.discountPercentage,
      rating: rating || oldProduct.rating,
      stock: stock || oldProduct.stock,
      tags: tags || oldProduct.tags,
      brand: brand || oldProduct.brand,
      sku: sku || oldProduct.sku,
      weight: weight || oldProduct.weight,
      dimensions: dimensions || oldProduct.dimensions,
      warrantyInformation:
        warrantyInformation || oldProduct.warrantyInformation,
      shippingInformation:
        shippingInformation || oldProduct.shippingInformation,
      availabilityStatus: availabilityStatus || oldProduct.availabilityStatus,
      reviews: reviews || oldProduct.reviews,
      returnPolicy: returnPolicy || oldProduct.returnPolicy,
      minimumOrderQuantity:
        minimumOrderQuantity || oldProduct.minimumOrderQuantity,
      thumbnail: thumbnail || oldProduct.thumbnail,
      images: images || oldProduct.images,
    };

    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      updatedProductData,
      { new: true }
    );

    await logActivity("product-update", "product", oldProduct, updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  // const userId = req?.user?.id; // Get the user ID from the JWT token

  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the logged-in user is the creator of the product
    // if (product.createdBy.toString() !== userId) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not authorized to delete this product" });
    // }

    await productModel.findByIdAndDelete(req.params.id);
    await logActivity("product-delete", "product", product, {});
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// import productModel from "../models/productModel.js";

// // Create a new product
// export const createProduct = async (req, res) => {
//   const { name, description, price, category } = req.body;
//   const userId = req.user.sub; // Get the user ID from the JWT token

//   try {
//     const newProduct = await productModel.create({
//       name,
//       description,
//       price,
//       category,
//       createdBy: userId,
//     });

//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating product", error });
//   }
// };

// // Get all products
// export const getProducts = async (req, res) => {
//   try {
//     const products = await productModel
//       .find()
//       .populate("createdBy", "name email");
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products", error });
//   }
// };

// // Get a single product
// export const getProduct = async (req, res) => {
//   try {
//     const product = await productModel
//       .findById(req.params.id)
//       .populate("createdBy", "name email");
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching product", error });
//   }
// };

// // Update a product
// export const updateProduct = async (req, res) => {
//   const { name, description, price, category } = req.body;
//   const userId = req.user.sub; // Get the user ID from the JWT token

//   try {
//     const product = await productModel.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Check if the logged-in user is the creator of the product
//     if (product.createdBy.toString() !== userId) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to update this product" });
//     }

//     product.name = name || product.name;
//     product.description = description || product.description;
//     product.price = price || product.price;
//     product.category = category || product.category;

//     await product.save();
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating product", error });
//   }
// };

// // Delete a product
// export const deleteProduct = async (req, res) => {
//   const userId = req.user.sub; // Get the user ID from the JWT token

//   try {
//     const product = await productModel.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Check if the logged-in user is the creator of the product
//     if (product.createdBy.toString() !== userId) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to delete this product" });
//     }

//     await productModel.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Product deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting product", error });
//   }
// };
