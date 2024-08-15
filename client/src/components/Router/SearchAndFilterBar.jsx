import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SearchAndFilterBar = ({ categories, products, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        !selectedCategory || product.categoryId === selectedCategory;
      const matchesPrice =
        priceFilter === "low"
          ? product.price < 200
          : priceFilter === "high"
          ? product.price >= 200
          : true;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    });

    onFilter(filtered);
  }, [searchTerm, selectedCategory, priceFilter, products, onFilter]);

  return (
    <Box>
      <TextField
        className="form-color"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      <Select
        className="form-color"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        displayEmpty
      >
        <MenuItem value="">All categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <Select
        className="form-color"
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
        displayEmpty
      >
        <MenuItem value="">No filter</MenuItem>
        <MenuItem value="low">Low to High (under 200)</MenuItem>
        <MenuItem value="high">High to Low (over 200)</MenuItem>
      </Select>
    </Box>
  );
};

export default SearchAndFilterBar;
