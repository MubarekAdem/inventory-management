import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { fetchItems, fetchCategories } from "./services/api";
import ItemList from "./components/ItemList";
import Navbar from "./components/Navbar";
import AuthContext from "./AuthContext";
import AddItemForm from "./components/AddItemForm";
import AuthForm from "./components/AuthForm";
import ProfileModal from "./components/ProfileModal";
import "./App.css";
import "flowbite/dist/flowbite.css";
const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [view, setView] = useState("itemList");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  const handleAuthSuccess = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    navigate("/items");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchItemsData();
      fetchCategoriesData();
    }
  }, [isAuthenticated]);

  const fetchItemsData = async () => {
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchCategoriesData = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  function handleShowAllItems() {
    setSelectedCategory(null);
    setView("itemList");
  }

  function handleShowCategories() {
    setView("categories");
  }

  function handleAddItem() {
    navigate("/add-item");
  }

  function handleItemAdded(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
    navigate("/items");
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
    setView("itemList");
  }

  const openProfileModal = () => setIsProfileOpen(true);
  const closeProfileModal = () => setIsProfileOpen(false);

  return (
    <div className="App flex">
      {isAuthenticated ? (
        <>
          <Navbar
            onShowAllItems={handleShowAllItems}
            onShowCategories={handleShowCategories}
            onAddItem={handleAddItem}
            onLogout={handleLogout}
            onProfileClick={openProfileModal}
          />
          <ProfileModal
            isOpen={isProfileOpen}
            onClose={closeProfileModal}
            user={{ name: "User Name", email: "user@example.com" }}
            onLogout={handleLogout}
          />
          <div className="content flex-grow p-4">
            <Routes>
              <Route
                path="/items"
                element={<ItemList items={items} categories={categories} />}
              />
              <Route
                path="/add-item"
                element={
                  <AddItemForm
                    onItemAdded={handleItemAdded}
                    categories={categories}
                  />
                }
              />
              <Route
                path="/categories"
                element={
                  <div className="categories">
                    <h2>Categories</h2>
                    {categories.length > 0 ? (
                      categories.map((category, index) => (
                        <div
                          key={index}
                          className="category"
                          onClick={() => handleCategoryClick(category)}
                        >
                          {category}
                        </div>
                      ))
                    ) : (
                      <p>No categories available</p>
                    )}
                  </div>
                }
              />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route
            path="/signin"
            element={<AuthForm onAuthSuccess={handleAuthSuccess} />}
          />
          <Route
            path="/signup"
            element={<AuthForm onAuthSuccess={handleAuthSuccess} />}
          />
          <Route
            path="*"
            element={<AuthForm onAuthSuccess={handleAuthSuccess} />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
