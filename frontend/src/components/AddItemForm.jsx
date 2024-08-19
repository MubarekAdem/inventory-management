import React, { useState } from "react";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";

function AddItemForm({ onItemAdded }) {
  const [itemName, setItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemName || !selectedCategory || !price || !quantity) {
      alert("Please fill in all fields");
      return;
    }

    const token = localStorage.getItem("authToken"); // Ensure token is retrieved

    try {
      const response = await axios.post(
        "http://localhost:5000/api/items",
        {
          name: itemName,
          quantity: parseInt(quantity, 10),
          category: selectedCategory, // Category is now user-input text
          price: parseFloat(price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
        }
      );
      onItemAdded(response.data); // Notify parent component of the new item
      // Clear form fields
      setItemName("");
      setSelectedCategory("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.error("Error adding item:", error);
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
        <TextInput
          id="category"
          type="text"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
        />
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
        Add Item
      </Button>
    </form>
  );
}

export default AddItemForm;
