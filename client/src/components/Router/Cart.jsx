import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();


  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    setTotal(total);
  };

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('token', token);
      const guestId = Cookies.get('guestId'); // Get the guestId from cookies
      console.log('cart guestid',guestId)

      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        params: guestId ? { guestId } : {  }, // Send guestId as query param if available
        withCredentials: true,
      });

      console.log('API Response:', response.data); // Log the response data

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

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const guestId = Cookies.get('guestId'); // Get the guestId from cookies

      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        params: guestId ? { guestId } : {}, // Send guestId as query param if available
        withCredentials: true,
      });

      setCartItems([]);
      setTotal(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const updateCartItemQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      const guestId = Cookies.get('guestId'); // Get the guestId from cookies

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
      console.error('Error updating cart item quantity:', error);
    }
  };

  const removeCartItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const guestId = Cookies.get('guestId'); // Get the guestId from cookies

      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${productId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        params: guestId ? { guestId } : {}, // Send guestId as query param if available
        withCredentials: true,
      });

      fetchCartItems();
    } catch (error) {
      console.error('Error removing cart item:', error);
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
              {item.product.name} - 
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateCartItemQuantity(item.product.id, parseInt(e.target.value))}
                min="1"
              />
              x ${item.product.price.toFixed(2)}
              <button onClick={() => removeCartItem(item.product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
      <h2>Total: ${total.toFixed(2)}</h2>
      {cartItems.length > 0 && (
        <div>
        <button onClick={clearCart}>Clear Cart</button>
        <button onClick={() => navigate('/checkout', { state: { cartItems, total } })}>Checkout</button>
        </div>
      )}

    </div>
  );
};


export default Cart;
