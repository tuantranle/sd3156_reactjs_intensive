// src/pages/AdminOrders.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const AdminOrders = () => {
  const orders = useSelector((state: RootState) => state.products.orders);

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{order.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrders;
