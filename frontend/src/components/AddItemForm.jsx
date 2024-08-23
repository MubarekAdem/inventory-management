import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Label, TextInput, Select } from "flowbite-react";

function AddItemForm({ onItemAdded, initialItem }) {
  const [itemName, setItemName] = useState(initialItem ? initialItem.name : "");
  const [selectedCategory, setSelectedCategory] = useState(
    initialItem ? initialItem.category : ""
  );
  const [price, setPrice] = useState(initialItem ? initialItem.price : "");
  const [quantity, setQuantity] = useState(
    initialItem ? initialItem.quantity : ""
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (initialItem) {
      setItemName(initialItem.name);
      setSelectedCategory(initialItem.category);
      setPrice(initialItem.price);
      setQuantity(initialItem.quantity);
    }
  }, [initialItem]);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemName || !selectedCategory || !price || !quantity) {
      alert("Please fill in all fields");
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      if (initialItem) {
        await axios.put(
          `http://localhost:5000/api/items/${initialItem._id}`,
          {
            name: itemName,
            quantity: parseInt(quantity, 10),
            category: selectedCategory,
            price: parseFloat(price),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/items",
          {
            name: itemName,
            quantity: parseInt(quantity, 10),
            category: selectedCategory,
            price: parseFloat(price),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onItemAdded(response.data);
      }

      setItemName("");
      setSelectedCategory("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <Label htmlFor="itemName" value="Item Name" />
        <TextInput
          id="itemName"
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="quantity" value="Quantity" />
        <TextInput
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="category" value="Category" />
        <Select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="price" value="Price" />
        <TextInput
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <Button gradientMonochrome="info" type="submit">
        {initialItem ? "Update Item" : "Add Item"}
      </Button>
    </form>
  );
}

export default AddItemForm;
