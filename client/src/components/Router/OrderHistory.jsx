import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderHistory.css'; // Import your CSS file

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
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
    <div className="order-history-container">
      <h1>Order History</h1>
      {orders.length > 0 ? (
        <table className="order-history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Price</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  <ul>
                    {order.orderItems.map((item) => (
                      <li key={item.id}>
                        {item.product.name} - {item.quantity} x ${item.product.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have no orders.</p>
      )}
    </div>
  );
};

export default OrderHistory;
