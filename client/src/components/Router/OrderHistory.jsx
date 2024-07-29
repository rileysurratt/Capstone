import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders: {error.message}</div>;

  return (
    <div>
      <h1>Order History</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h2>Order #{order.id}</h2>
              <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item.id}>
                    {item.product.name} - {item.quantity} x ${item.product.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no orders.</p>
      )}
    </div>
  );
};

export default OrderHistory;
