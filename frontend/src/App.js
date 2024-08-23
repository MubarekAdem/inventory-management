import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { fetchItems, fetchCategories } from "./services/api";
import ItemList from "./components/ItemList";
import Navbar from "./components/Navbar";
import AuthContext from "./AuthContext";
import AddItemForm from "./components/AddItemForm";
import AuthForm from "./components/AuthForm";
import ProfileModal from "./components/ProfileModal";
import Categories from "./components/Categories";
import { HiBell, HiUser, HiMoon } from "react-icons/hi";
import SearchBar from "./components/SearchBar";

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

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true" || savedMode === null;
  });

  useEffect(() => {
    const rootElement = document.getElementById("root");
    const contentElement = document.querySelector(".content");

    if (darkMode) {
      document.body.classList.add("dark", "bg-gray-900", "text-white");
      rootElement.classList.add("dark", "bg-gray-900", "text-white");
      if (contentElement) {
        contentElement.classList.add("dark", "bg-gray-900", "text-white");
      }
    } else {
      document.body.classList.remove("dark", "bg-gray-900", "text-white");
      rootElement.classList.remove("dark", "bg-gray-900", "text-white");
      if (contentElement) {
        contentElement.classList.remove("dark", "bg-gray-900", "text-white");
      }
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

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

  function handleCategoryClick(categoryId) {
    setSelectedCategory(categoryId);
    setView("itemList");
  }

  const openProfileModal = () => setIsProfileOpen(true);
  const closeProfileModal = () => setIsProfileOpen(false);

  return (
    <div>
      <div className="App flex">
        {isAuthenticated ? (
          <>
            <Navbar
              onShowAllItems={handleShowAllItems}
              onShowCategories={handleShowCategories}
              onAddItem={handleAddItem}
              onLogout={handleLogout}
              onProfileClick={openProfileModal}
              darkMode={darkMode}
            />
            <ProfileModal
              isOpen={isProfileOpen}
              onClose={closeProfileModal}
              user={{ name: "User Name", email: "user@example.com" }}
              onLogout={handleLogout}
            />
            <div className="content flex-grow p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4"></div>
                <div className="flex space-x-4 justify-end items-center">
                  <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300 ${
                      darkMode ? "bg-white text-black" : "bg-black text-white"
                    }`}
                  >
                    <HiMoon size={16} />
                  </button>
                  <button
                    onClick={openProfileModal}
                    className="p-2 rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700"
                  >
                    <HiBell className="text-black dark:text-white" size={16} />
                  </button>
                  <button
                    onClick={openProfileModal}
                    className="p-2 rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700"
                  >
                    <HiUser className="text-black dark:text-white" size={16} />
                  </button>
                </div>
              </div>
              <Routes>
                <Route
                  path="/items"
                  element={
                    <ItemList
                      items={
                        selectedCategory
                          ? items.filter(
                              (item) => item.category === selectedCategory
                            )
                          : items
                      }
                      categories={categories}
                    />
                  }
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
                    <Categories
                      categories={categories}
                      onCategoryClick={handleCategoryClick}
                    />
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
    </div>
  );
};

export default App;
