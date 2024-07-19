import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    setTotal(total);
  };

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token)

      const response = await axios.get('http://localhost:3000/api/cart', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (Array.isArray(response.data)) {
        setCartItems(response.data);
        console.log('cartItems', cartItems)
        calculateTotal(response.data);
      } else {
        console.error('Expected an array of cart items but received:', response.data);
        setCartItems([]);
        setTotal(0);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div>
      <h1>Shopping Cart</h1>
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
    </div>
  );
};

export default Cart;
