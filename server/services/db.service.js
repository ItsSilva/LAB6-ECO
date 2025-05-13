const supabase = require("./supabase.service");

// 1. Products table operations
const getAllProducts = async () => {
  const { data, error } = await supabase.from("products").select();
  if (error) {
    console.error("Error fetching products:", error);
    return { error };
  }
  return { data };
};

const getProductsUnderPrice = async (price) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .lt("price", price);

  if (error) {
    console.error("Error fetching products under price:", error);
    return { error };
  }
  return { data };
};

const getProductsByMultipleConditions = async (minPrice, category) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .gt("price", minPrice)
    .eq("category", category);

  if (error) {
    console.error("Error fetching products by conditions:", error);
    return { error };
  }
  return { data };
};

const getPaginatedProducts = async (limit = 10, offset = 0) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching paginated products:", error);
    return { error };
  }
  return { data };
};

const getProductsByUserId = async (userId) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user products:", error);
    return { error };
  }
  return { data };
};

// 2. Users table operations
const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select();
  if (error) {
    console.error("Error fetching users:", error);
    return { error };
  }
  return { data };
};

const getUsersSelectFields = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("username, email");

  if (error) {
    console.error("Error fetching user fields:", error);
    return { error };
  }
  return { data };
};

// 3. Orders table operations
const getOrdersByDate = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select()
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders by date:", error);
    return { error };
  }
  return { data };
};

// 4. Posts table operations
const getPostsByTitle = async (searchTerm) => {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .ilike("title", `%${searchTerm}%`);

  if (error) {
    console.error("Error searching posts:", error);
    return { error };
  }
  return { data };
};

module.exports = {
  getAllProducts,
  getProductsUnderPrice,
  getProductsByMultipleConditions,
  getPaginatedProducts,
  getProductsByUserId,
  getAllUsers,
  getUsersSelectFields,
  getOrdersByDate,
  getPostsByTitle,
};
