const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload");
const {
  AddProduct,
  GetAllProducts,
  GetProductById,
  EditProduct,
  DeleteProduct,
} = require("../Controllers/ProductController");

router.post(
  "/add-product",
  upload.fields([
    { name: "image_1", maxCount: 1 },
    { name: "image_2", maxCount: 1 },
    { name: "image_3", maxCount: 1 },
  ]),
  AddProduct
);
router.get("/get-products", GetAllProducts);
router.get("/get-product/:id", GetProductById);
router.put(
  "/edit-product/:id",
  upload.fields([
    { name: "image_1", maxCount: 1 },
    { name: "image_2", maxCount: 1 },
    { name: "image_3", maxCount: 1 },
  ]),
  EditProduct
);
router.delete("/delete-product/:id", DeleteProduct);

module.exports = router;
