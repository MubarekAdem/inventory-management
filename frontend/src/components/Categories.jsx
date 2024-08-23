import React, { useState, useEffect } from "react";
import { fetchCategories, addCategory } from "../services/api";
import { Button, TextInput } from "flowbite-react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        const addedCategory = await addCategory(newCategory);
        setCategories([...categories, addedCategory]);
        setNewCategory("");
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Manage Categories
      </h2>
      <div className="flex gap-4 mb-6">
        <TextInput
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1"
          styling="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <Button onClick={handleAddCategory} color="purple" className="w-36">
          Add Category
        </Button>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li
              key={category._id}
              className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
            >
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {category.name}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No categories available
          </p>
        )}
      </ul>
    </div>
  );
};

export default Categories;
