const express = require("express");
const router = express.Router();
const dbController = require("../controllers/db.controller");

// Products routes
router.get("/products", dbController.getAllProducts);
router.get("/products/cheap", dbController.getCheapProducts);
router.get("/products/filtered", dbController.getFilteredProducts);
router.get("/products/paginated", dbController.getPaginatedProducts);
router.get("/products/user", dbController.getUserProducts);

// Users routes
router.get("/users/fields", dbController.getUserFields);
router.get("/users/all", dbController.getAllUsers);

// Orders routes
router.get("/orders/by-date", dbController.getOrdersByDate);

// Posts routes
router.get("/posts/search", dbController.searchPosts);

module.exports = router;
