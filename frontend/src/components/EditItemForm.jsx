import React, { useState } from "react";
import axios from "axios";

function EditItemForm({ item, categories, shops, onItemUpdated, onCancel }) {
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.price);
  const [shop, setShop] = useState(item.shop);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedItem = {
      ...item,
      name,
      category,
      quantity,
      price,
      shop,
    };

    try {
      await axios.put(
        `http://localhost:5000/api/items/${item._id}`,
        updatedItem
      );
      onItemUpdated(updatedItem);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <h3>Edit Item</h3>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Shop:</label>
        <select value={shop} onChange={(e) => setShop(e.target.value)} required>
          {shops.map((shop) => (
            <option key={shop._id} value={shop._id}>
              {shop.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Update Item</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditItemForm;
