import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchAndFilterBar from "./SearchAndFilterBar";
import axios from 'axios';
import Cookies from 'js-cookie';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token"); 
      let guestId = Cookies.get("guestId"); 
      if (!token && !guestId) {
        const tempGuestId = `guest_${Date.now()}`;
        Cookies.set("guestId", tempGuestId);
        guestId = tempGuestId;
      }
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined, 
        },
        body: JSON.stringify({
          productId: productId,
          quantity: parseInt(quantity),
          guestId: guestId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }
      const result = await response.json();
      setMessage("Added to cart");
    } catch (error) {
      setMessage("Error adding to cart");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/`);
        const result = await response.json();
        setProducts(result);
        setFilteredProducts(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/`);
        const result = await response.json();
        setCategories(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleFilter = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  return (
    <>
      <SearchAndFilterBar categories={categories} products={products} onFilter={handleFilter} />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {categories.map((category) => (
            <div key={category.id}>
              <h1>{category.name}</h1>
              <div>
                {filteredProducts.filter(product => product.categoryId === category.id).map((product) => (
                  <Card key={product.id} sx={{ maxWidth: 350, maxHeight: 200 }}>
                    <h2>{product.name}</h2>
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <Button onClick={() => navigate(`/products/${product.id}`)}>Details</Button>
                    <Button onClick={() => addToCart(product.id)}>Add to cart</Button>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Catalog;
