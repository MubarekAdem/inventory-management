import React, { useState } from "react";
import { FaMoon } from "react-icons/fa"; // Import moon icon from react-icons

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="dark-mode-toggle bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none"
    >
      <FaMoon className="text-gray-800 dark:text-gray-200" />
    </button>
  );
}

export default DarkModeToggle;
