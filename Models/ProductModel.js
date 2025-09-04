const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductModel = new Schema({
  productName: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: false },
  availability: { type: String, required: true },
  status: { type: String, required: true },
  details: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, required: true },
  tag: { type: String, required: true },
  image_1: { type: String, required: true },
  image_2: { type: String, required: true },
  image_3: { type: String, required: true },
});

module.exports = mongoose.model("ProductModel", ProductModel);
