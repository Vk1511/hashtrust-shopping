import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/features/products/productsSlice";
import "./SearchBox.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTimer, setSearchTimer] = useState("");

  const handleSearch = (event) => {
    clearTimeout(searchTimer);
    const timeout = setTimeout(() => {
      if (event.length) {
        dispatch(fetchProducts(`?search=${event}`));
      } else {
        dispatch(fetchProducts(``));
      }
    }, 500);
    setSearchTimer(timeout);
  };

  return (
    <div className="search-box-container">
      <input
        type="text"
        // value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search"
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
