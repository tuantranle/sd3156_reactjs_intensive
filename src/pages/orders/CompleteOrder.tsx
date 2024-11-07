// src/pages/orders/CompleteOrder.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOrder } from '../../providers/OrderProvider';
import './completeOrder.scss';

const CompleteOrder: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { completeOrder } = useOrder();
  const { orderNumber, productId, quantity } = state || {};

  const handleCompleteOrder = async () => {
    const success = await completeOrder(orderNumber);
    if (success) {
      alert('Order completed successfully!');
      navigate('/products'); // Redirect to products page after completing the order
    } else {
      alert('Failed to complete the order. Please try again.');
    }
  };

  if (!orderNumber) {
    navigate('/products'); // Redirect if no order number
    return null;
  }

  return (
    <div className="complete-order">
      <h2>Order Confirmation</h2>
      <p><strong>Order Number:</strong> {orderNumber}</p>
      <p><strong>Product ID:</strong> {productId}</p>
      <p><strong>Quantity:</strong> {quantity}</p>
      <button onClick={handleCompleteOrder} className="complete-order-button">
        Complete Order
      </button>
    </div>
  );
};

export default CompleteOrder;
