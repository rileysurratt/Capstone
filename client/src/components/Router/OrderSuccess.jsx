import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import './OrderSuccess.css';


const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger confetti when the component mounts
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

    return (
      <div className="order-success-container">
        <h1>Order Successful!</h1>
        <p>Thank you for your purchase. Your order is on its way!</p>
        <button className="checkout-button" onClick={() => navigate("/catalog")}>Return to Products</button>
      </div>
    );
  };

export default OrderSuccess;
