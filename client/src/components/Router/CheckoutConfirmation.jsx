import React from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CheckoutForm from "./CheckoutForm";
import './CheckoutConfirmation.css';

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

  console.log('checkout confirmed')

  return (
    <div className="checkout-container">
      <h1>Please review your cart and confirm your checkout below</h1>
      {cartItems.length > 0 ? (
        <table className="checkout-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>${item.product.price.toFixed(2)}</td>
                <td>${(item.product.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your cart is empty</p>
      )}
      <div className="checkout-total">
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
      <div className="checkout-actions">
        <Button onClick={() => navigate('/payment')} className="checkout-button">Confirm Checkout</Button>
        <Button onClick={() => navigate('/cart')} className="checkout-button">Back to Cart</Button>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
