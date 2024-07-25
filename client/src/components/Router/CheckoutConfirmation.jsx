import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, total } = location.state || { cartItems: [], total: 0 };

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
      <button>Checkout!</button>
      <button onClick={() => navigate('/cart')}>Back to Cart</button>
    </div>
  );
};

export default CheckoutConfirmation;
