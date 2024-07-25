// Single Product page
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [guestId, setGuestId] = useState(null); // State for guestId


  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${id}`
        );
        const result = await response.json();

        setProduct(result);
        // console.log(result);
        setLoading(false);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
        console.log(error);
        setMessage(null);
      }
    };
    getProduct();
  }, []);

    // Retrieve guestId cookie on component mount
    useEffect(() => {
        const existingGuestId = Cookies.get('guestId');
        if (existingGuestId) {
          setGuestId(existingGuestId);
        }
      }, []);

  // product id and quantity in the body of post request
  const addToCart = async () => {
    console.log("Add to Cart button clicked");
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      let guestId = Cookies.get("guestId"); // For guests
      if (!token && !guestId) {
        // Check if the guestId cookie exists, otherwise create a new guestId
        const tempGuestId = `guest_${Date.now()}`;
        console.log('tempGeustId', tempGuestId);
        
        // Set the guestId cookie with a max age of 7 days
        Cookies.set('guestId', tempGuestId);
    
        // Assign the guestId to the request object
        guestId = tempGuestId;
      } 
 
    //   let guestId = Cookies.get("guestId"); // For guests
    //   console.log('existing guestId', guestId)

    //   // If guestId does not exist, create and set a new one
    //   if (!guestId) {
    //     guestId = "guest_" + new Date().getTime();
    //     Cookies.set('guestId', guestId, { expires: 7 }); // Set guestId cookie with 7 days expiry
    //     console.log('created new guestId', guestId)
    //   }
    //   console.log('created new guestId', guestId)

      const response = await fetch(`http://localhost:3000/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined, // Include token if present
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: parseInt(quantity),
          guestId: guestId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }
      const result = await response.json();
      console.log("Add to cart result:", result);
      setMessage("Added to cart");
    } catch (error) {
      console.log(error);
      setMessage("Error adding to cart");
    }
  };

  return (
    <>
      <div>
        {error ? (
          <h1>{error}</h1>
        ) : product ? (
          <div>
            <Card>
              <CardContent>
                <h1>{product.name}</h1>
                <h5>Description: {product.description}</h5>
                <h5>Price: {product.price}</h5>
                <h5>
                  Availibility:{" "}
                  {product.quantity > 0 ? "In stock" : "Out of stock"}
                </h5>
                <input
                  type="number"
                  label="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                ></input>
                <button onClick={addToCart}>Add to cart</button>
                <button onClick={() => navigate("/catalog")}>
                  All products
                </button>
                {message && <p style={{ color: "green" }}>{message}</p>}
              </CardContent>
            </Card>
          </div>
        ) : (
          <h1>Loading ...</h1>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
