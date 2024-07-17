// All Products

import { useState } from "react";
import { useEffect } from "react";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:3000/api/products/", {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();

        setProducts(data);
        console.log(data)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    fetchProducts();
  }, []);


    return (
      <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {products.map((product) =>  (
            <div key={product.id}>{product.name}</div>
          ) )}
        </div>
      )}
      </>
    );
  };
  
  export default Catalog;
  