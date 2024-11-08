import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './completeOrder.scss';

const CompleteOrder: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { orderNumber, productId, quantity } = state || {};

  const handleCompleteOrder = async () => {

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
