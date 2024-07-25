import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SearchAndFilterBar = ({ categories, products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
      const matchesPrice = 
        priceFilter === 'low' ? product.price < 200 :
        priceFilter === 'high' ? product.price >= 200 :
        true;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    }).sort((a, b) => {
      if (priceFilter === 'low') {
        return a.price - b.price;
      } else if (priceFilter === 'high') {
        return b.price - a.price;
      }
      return 0;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceFilter, products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <Box>
      <TextField
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search products..."
        disabled={loading}
      />
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        displayEmpty
        disabled={loading}
      >
        <MenuItem value="">All categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={priceFilter}
        onChange={handlePriceFilterChange}
        displayEmpty
        disabled={loading}
      >
        <MenuItem value="">No filter</MenuItem>
        <MenuItem value="low">Low to High (under 200)</MenuItem>
        <MenuItem value="high">High to Low (over 200)</MenuItem>
      </Select>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? <p>Loading...</p> : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              {product.name} ({product.category}) - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default SearchAndFilterBar;
