const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/get-all", productController.getAllProducts);
router.get("/get-all-type", productController.getAllProductTypes);
router.get("/get-details/:id", productController.getProductDetails);

// Protected routes (Admin)
router.post("/create", authMiddleware, productController.createProduct);
router.put("/update/:id", authMiddleware, productController.updateProduct);
router.delete("/delete/:id", authMiddleware, productController.deleteProduct);
router.post(
  "/delete-many",
  authMiddleware,
  productController.deleteManyProducts,
);

module.exports = router;
