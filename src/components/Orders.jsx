// client/src/components/Orders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the Express server
    axios.get('http://localhost:5000/orders').then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            User: {order.user}, Products:{' '}
            {order.products.map((product) => product.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
