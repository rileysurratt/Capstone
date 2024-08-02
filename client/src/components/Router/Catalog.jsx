// All Products
// add to cart button, details button
// name, price, quantity
// TODO: add images to products

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchAndFilterBar from "./SearchAndFilterBar";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";


const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/`);
        const result = await response.json();

        setProducts(result);
        // console.log(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
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

  return (
    <>
      <SearchAndFilterBar categories={categories} products={products} />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {categories.map((category) => (
            <div key={category.id}>
              <h1>{category.name}</h1>
              <div>
                {products
                  .filter((product) => product.categoryId === category.id)
                  .map((product) => (
                    <Card
                      key={product.id}
                      sx={{ maxWidth: 350, maxHeight: 200 }}
                    >
                      <CardContent>
                        <h2>{product.name}</h2>
                        <p>Price: {product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                        {/* Add to cart button, details button */}
                        <Button
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          Details
                        </Button>
                        <Button>Add to cart</Button>
                      </CardContent>
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
