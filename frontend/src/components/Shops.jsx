import React, { useState, useEffect } from "react";
import axios from "axios";

function Shops() {
  const [shops, setShops] = useState([]);
  const [newShopName, setNewShopName] = useState("");
  const [newShopLocation, setNewShopLocation] = useState("");

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/shops");
        setShops(response.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };
    fetchShops();
  }, []);

  const handleAddShop = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/shops", {
        name: newShopName,
        location: newShopLocation,
      });
      setShops([...shops, response.data]);
      setNewShopName("");
      setNewShopLocation("");
    } catch (error) {
      console.error("Error adding shop:", error);
    }
  };

  return (
    <div className="shops-container">
      <h2>Shops</h2>
      <form onSubmit={handleAddShop}>
        <div>
          <label>Shop Name:</label>
          <input
            type="text"
            value={newShopName}
            onChange={(e) => setNewShopName(e.target.value)}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={newShopLocation}
            onChange={(e) => setNewShopLocation(e.target.value)}
          />
        </div>
        <button type="submit">Add Shop</button>
      </form>
      <ul>
        {shops.map((shop) => (
          <li key={shop._id}>
            {shop.name} - {shop.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Shops;
