// Helper function to display results
function displayResults(data) {
  const resultContainer = document.getElementById("result-container");
  resultContainer.textContent = JSON.stringify(data, null, 2);
}

// Helper function to make API requests
async function fetchFromAPI(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayResults(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    displayResults({ error: error.message });
  }
}

// Initialize event listeners
document.addEventListener("DOMContentLoaded", () => {
  // 1. Get All Products
  document.getElementById("get-all-products").addEventListener("click", () => {
    fetchFromAPI("/api/products");
  });

  // 2. Get Products Under Price
  document
    .getElementById("get-cheap-products")
    .addEventListener("click", () => {
      const maxPrice = document.getElementById("max-price").value;
      fetchFromAPI(`/api/products/cheap?price=${maxPrice}`);
    });

  // 3. Get User Fields
  document.getElementById("get-user-fields").addEventListener("click", () => {
    fetchFromAPI("/api/users/fields");
  });

  // 4. Get Orders By Date
  document
    .getElementById("get-orders-by-date")
    .addEventListener("click", () => {
      fetchFromAPI("/api/orders/by-date");
    });

  // 5. Get Filtered Products
  document
    .getElementById("get-filtered-products")
    .addEventListener("click", () => {
      const minPrice = document.getElementById("min-price").value;
      const category = document.getElementById("category").value;
      fetchFromAPI(
        `/api/products/filtered?minPrice=${minPrice}&category=${encodeURIComponent(
          category
        )}`
      );
    });

  // 6. Search Posts
  document.getElementById("search-posts").addEventListener("click", () => {
    const searchTerm = document.getElementById("search-term").value;
    fetchFromAPI(`/api/posts/search?term=${encodeURIComponent(searchTerm)}`);
  });

  // 7. Paginated Products
  document
    .getElementById("get-paginated-products")
    .addEventListener("click", () => {
      const limit = document.getElementById("limit").value;
      const page = document.getElementById("page").value;
      fetchFromAPI(`/api/products/paginated?limit=${limit}&page=${page}`);
    });

  // 8. Get User Products
  document.getElementById("get-user-products").addEventListener("click", () => {
    const userId = document.getElementById("user-id").value;
    fetchFromAPI(`/api/products/user?userId=${userId}`);
  });

  // 9. Get All Users
  document.getElementById("get-all-users").addEventListener("click", () => {
    fetchFromAPI("/api/users/all");
  });
});
