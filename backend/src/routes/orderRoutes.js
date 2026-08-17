const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// All order routes require authentication
router.post("/create/:userId", authMiddleware, orderController.createOrder);
router.get(
  "/get-all-order/:id",
  authMiddleware,
  orderController.getOrdersByUserId,
);
router.get(
  "/get-details-order/:id",
  authMiddleware,
  orderController.getOrderDetails,
);
router.get("/get-all-order", authMiddleware, orderController.getAllOrders);
router.delete("/cancel-order/:id", authMiddleware, orderController.cancelOrder);
router.put(
  "/update-order/:id",
  authMiddleware,
  orderController.updateOrderStatus,
);

module.exports = router;
