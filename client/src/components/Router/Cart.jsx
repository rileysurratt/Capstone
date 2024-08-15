import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./Cart.css";
import Button from "@mui/material/Button";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotal(total);
  };

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      const guestId = Cookies.get("guestId"); // Get the guestId from cookies
      console.log("cart guestid", guestId);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          params: guestId ? { guestId } : {}, // Send guestId as query param if available
          withCredentials: true,
        }
      );

      console.log("API Response:", response.data); // Log the response data

      if (Array.isArray(response.data)) {
        setCartItems(response.data);
        console.log("cartItems", cartItems);
        calculateTotal(response.data);
      } else {
        console.error(
          "Expected an array of cart items but received:",
          response.data
        );
        setCartItems([]);
        setTotal(0);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const guestId = Cookies.get("guestId"); // Get the guestId from cookies

      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        params: guestId ? { guestId } : {}, // Send guestId as query param if available
        withCredentials: true,
      });

      setCartItems([]);
      setTotal(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const updateCartItemQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      const guestId = Cookies.get("guestId"); // Get the guestId from cookies

      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { productId, quantity },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          params: guestId ? { guestId } : {}, // Send guestId as query param if available
          withCredentials: true,
        }
      );

      fetchCartItems();
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const removeCartItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const guestId = Cookies.get("guestId"); // Get the guestId from cookies

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/${productId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          params: guestId ? { guestId } : {}, // Send guestId as query param if available
          withCredentials: true,
        }
      );

      fetchCartItems();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.product.name}</td>
                <td>
                  <input
                    className="cart-quantity-input"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateCartItemQuantity(
                        item.product.id,
                        parseInt(e.target.value)
                      )
                    }
                    min="1"
                  />
                </td>
                <td>${item.product.price.toFixed(2)}</td>
                <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="cart-button"
                    onClick={() => removeCartItem(item.product.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p style={{ marginTop: '15px', fontSize: '1.5rem'}}>Your cart is empty</p>
          <Button
            sx={{ backgroundColor: "#4d1b7b", color: "white" }}
            className="button-color mb-2 mt-2"
            onClick={() => navigate("/catalog")}
          >
            All Products
          </Button>
        </div>
      )}
      <div className="cart-total">
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
      {cartItems.length > 0 && (
        <div className="cart-actions">
          <button onClick={clearCart} className="cart-button">
            Clear Cart
          </button>
          <button
            onClick={() =>
              navigate("/checkout", { state: { cartItems, total } })
            }
            className="cart-button"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
