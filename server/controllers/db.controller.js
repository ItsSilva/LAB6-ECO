const dbService = require("../services/db.service");

// 1. Products controllers
const getAllProducts = async (req, res) => {
  const { data, error } = await dbService.getAllProducts();
  if (error) return res.status(500).json({ error });
  res.json(data);
};

const getCheapProducts = async (req, res) => {
  const maxPrice = req.query.price || 50;
  const { data, error } = await dbService.getProductsUnderPrice(maxPrice);
  if (error) return res.status(500).json({ error });
  res.json(data);
};

const getFilteredProducts = async (req, res) => {
  const { minPrice = 30, category = "Electronics" } = req.query;
  const { data, error } = await dbService.getProductsByMultipleConditions(
    minPrice,
    category
  );
  if (error) return res.status(500).json({ error });
  res.json(data);
};

const getPaginatedProducts = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;
  const { data, error } = await dbService.getPaginatedProducts(
    parseInt(limit),
    parseInt(offset)
  );
  if (error) return res.status(500).json({ error });
  res.json(data);
};

const getUserProducts = async (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  const { data, error } = await dbService.getProductsByUserId(userId);
  if (error) return res.status(500).json({ error });
  res.json(data);
};

// 2. Users controllers
const getUserFields = async (req, res) => {
  const { data, error } = await dbService.getUsersSelectFields();
  if (error) return res.status(500).json({ error });
  res.json(data);
};

const getAllUsers = async (req, res) => {
  const { data, error } = await dbService.getAllUsers();
  if (error) return res.status(500).json({ error });
  res.json(data);
};

// 3. Orders controllers
const getOrdersByDate = async (req, res) => {
  const { data, error } = await dbService.getOrdersByDate();
  if (error) return res.status(500).json({ error });
  res.json(data);
};

// 4. Posts controllers
const searchPosts = async (req, res) => {
  const { term = "tutorial" } = req.query;
  const { data, error } = await dbService.getPostsByTitle(term);
  if (error) return res.status(500).json({ error });
  res.json(data);
};

module.exports = {
  getAllProducts,
  getCheapProducts,
  getFilteredProducts,
  getPaginatedProducts,
  getUserProducts,
  getUserFields,
  getAllUsers,
  getOrdersByDate,
  searchPosts,
};
