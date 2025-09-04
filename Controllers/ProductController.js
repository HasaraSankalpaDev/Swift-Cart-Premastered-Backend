const ProductModel = require("../Models/ProductModel");

// AddProduct
const AddProduct = async (req, res) => {
  const {
    productName,
    originalPrice,
    discountedPrice,
    availability,
    status,
    details,
    brand,
    type,
    tag,
  } = req.body;

  // Validate required fields

  const requiredFields = [];

  // Check if required fields are provided
  if (!productName) requiredFields.push("Product Name");
  if (!originalPrice) requiredFields.push("Original Price");
  if (!availability) requiredFields.push("Availability");
  if (!status) requiredFields.push("Status");
  if (!details) requiredFields.push("Details");
  if (!brand) requiredFields.push("Brand");
  if (!type) requiredFields.push("Type");
  if (!tag) requiredFields.push("Tag");
  if (!req.files || !req.files.image_1) {
    requiredFields.push("Image 01");
  }
  if (!req.files || !req.files.image_2) {
    requiredFields.push("Image 02");
  }
  if (!req.files || !req.files.image_3) {
    requiredFields.push("Image 03");
  }

  // Return Error Response
  if (requiredFields.length > 0) {
    return res.status(400).json({
      error: ` ${requiredFields} field(s) are required!`,
    });
  }

  try {
    // Create product with correct field names & types
    const newProduct = new ProductModel({
      productName,
      originalPrice,
      discountedPrice,
      availability,
      status,
      details,
      brand,
      type,
      tag,
      image_1: req.files.image_1?.[0]?.filename || "",
      image_2: req.files.image_2?.[0]?.filename || "",
      image_3: req.files.image_3?.[0]?.filename || "",
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Get all products
const GetAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();

    if (products.length === 0) {
      return res.status(404).json({ error: "No products found." });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
};

// Get product by ID
const GetProductById = async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required." });
  }

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    } else {
      return res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: "Product not found for the provided Id." });
  }
};

// Edit Product
const EditProduct = async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required." });
  }

  try {
    const existingProduct = await ProductModel.findById(productId);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ error: "Can not find product for the provided Id" });
    }

    const {
      productName,
      originalPrice,
      discountedPrice,
      availability,
      status,
      details,
      brand,
      type,
      tag,
    } = req.body;

    const updatedProductDetails = {
      productName,
      originalPrice,
      discountedPrice,
      availability,
      status,
      details,
      brand,
      type,
      tag,
      image_1: req.files?.image_1?.[0]?.filename || existingProduct.image_1,
      image_2: req.files?.image_2?.[0]?.filename || existingProduct.image_2,
      image_3: req.files?.image_3?.[0]?.filename || existingProduct.image_3,
    };

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updatedProductDetails,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Failed to update product." });
    }

    return res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update product." });
  }
};

// Delete Product
const DeleteProduct = async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required." });
  }

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    return res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete product." });
  }
};

module.exports = {
  AddProduct,
  GetAllProducts,
  GetProductById,
  EditProduct,
  DeleteProduct,
};
