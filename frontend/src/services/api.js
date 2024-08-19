import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch items
export const fetchItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items`, {
      headers: getAuthHeaders(), // Use the getAuthHeaders function
    });
    return response.data; // Return the fetched items
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error; // Propagate error for handling in the calling function
  }
};

// Fetch categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`, {
      headers: getAuthHeaders(), // Use the getAuthHeaders function
    });
    return response.data; // Return the fetched categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Propagate error for handling in the calling function
  }
};

// Sign-in function
export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error signing in:", error.response?.data || error.message);
    throw error;
  }
};

// Sign-up function
export const signUp = async (
  firstName,
  lastName,
  email,
  password,
  phoneNumber
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error.response?.data || error.message);
    throw error;
  }
};

// Add function for deleting an item
export const deleteItem = async (itemId) => {
  try {
    await axios.delete(`http://localhost:5000/api/items/${itemId}`, {
      headers: getAuthHeaders(), // Include auth headers
    });
    fetchItems(); // Update items after deletion
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

// Add function for updating an item
export const updateItem = async (id, item) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/items/${id}`, item, {
      headers: getAuthHeaders(), // Use the getAuthHeaders function
    });
    return response.data; // Return the updated item
  } catch (error) {
    console.error("Error updating item:", error);
    throw error; // Propagate error for handling in the calling function
  }
};
