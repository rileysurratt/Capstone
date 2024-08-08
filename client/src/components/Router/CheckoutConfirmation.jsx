import React from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CheckoutForm from "./CheckoutForm";

const CheckoutConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, total } = location.state || { cartItems: [], total: 0 };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
        { cartItems, total },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log('Order successful!')
        navigate('/order-success'); 
      } else {
        console.error('Checkout failed:', response.data);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };


  return (
    <div>
      <h1>Please review your cart and confirm your checkout below</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.product.name} - {item.quantity} x ${item.product.price.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
      <h2>Total: ${total.toFixed(2)}</h2>
      <Button onClick={() => {handleCheckout}}>Checkout</Button>
      <Button onClick={() => navigate('/cart')}>Back to Cart</Button>
    </div>
  );
};

export default CheckoutConfirmation;
