import React, { useState, useEffect } from "react";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchCategories(); // Call your API service function
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories",
        { name: newCategoryName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setNewCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="categories-container">
      <h2>Categories</h2>
      <form onSubmit={handleAddCategory}>
        <div>
          <label>Category Name:</label>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Category</button>
      </form>
      <ul>
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </ul>
    </div>
  );
}

export default Categories;
