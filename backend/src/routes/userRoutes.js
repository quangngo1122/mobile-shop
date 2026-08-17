const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.post("/sign-up", userController.signupUser);
router.post("/sign-in", userController.signinUser);
router.post("/refresh-token", userController.refreshToken);
router.post("/log-out", userController.logoutUser);

// Protected routes
router.get("/get-details/:id", authMiddleware, userController.getDetailsUser);
router.get("/getAll", authMiddleware, userController.getAllUsers);
router.put("/update-user/:id", authMiddleware, userController.updateUser);
router.delete("/delete-user/:id", authMiddleware, userController.deleteUser);
router.post("/delete-many", authMiddleware, userController.deleteManyUsers);

module.exports = router;
