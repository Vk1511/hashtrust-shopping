import React, { useState } from 'react';
import "./SearchBox.css";


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="search-box-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search"
        className="search-input"
      />
      <button
        onClick={toggleFilter}
        style={{
          position: 'absolute',
          right: '10px',
          top: '5px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span role="img" aria-label="filter">
          🔍
        </span>
      </button>
    </div>
  );
};

export default SearchBar;
