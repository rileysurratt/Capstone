// All Products
// add to cart button, details button
// name, price, quantity 
// TODO: add images to products

import { useState } from "react";
import { useEffect } from "react";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:3000/api/products/");
        const data = await response.json();

        setProducts(data);
        console.log(data)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/category/");
      const data = await response.json();

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchProducts();
  fetchCategories();
}, []);

return (
  <>
    {loading? (
      <h1>Loading...</h1>
    ) : (
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <h1>{category.name}</h1>
            <ul>
              {products.filter((product) => product.categoryId === category.id).map((product) => (
                  <li key={product.id}>
                    <h2>Name: {product.name}</h2>
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <button>Details</button>
                    <button>Add to cart</button>
                    {/* Add to cart button, details button */}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    )}
  </>
);
}

export default Catalog;