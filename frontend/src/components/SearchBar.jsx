// SearchBar.js
import React from "react";

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search items..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="p-1 border rounded "
    />
  );
}

export default SearchBar;
