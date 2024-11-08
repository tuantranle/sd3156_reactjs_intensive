import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { completeOrder, clearOrderError, resetOrderComplete } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/store';
import './completeOrder.scss';

const CompleteOrder: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Extract order details from state
  const { orderNumber, productId, quantity } = state || {};

  const { orderLoading, orderError, orderComplete } = useAppSelector((state: RootState) => state.products);
  const token = useAppSelector((state: RootState) => state.auth.user?.token);

  useEffect(() => {
    if (!orderNumber) {
      navigate('/products'); // Redirect if no order number
    }

    if (orderComplete) {
      navigate('/orders'); // Redirect after successful completion
    }

    return () => {
      dispatch(resetOrderComplete()); // Reset completion state on unmount
      dispatch(clearOrderError()); // Clear errors
    };
  }, [orderNumber, orderComplete, navigate, dispatch]);

  const handleCompleteOrder = () => {
    if (orderNumber && token) {
      dispatch(completeOrder({ orderNumber, token }));
    }
  };

  if (!orderNumber) {
    return null;
  }

  return (
    <div className="complete-order">
      <h2>Order Confirmation</h2>
      <p><strong>Order Number:</strong> {orderNumber}</p>
      <p><strong>Product ID:</strong> {productId}</p>
      <p><strong>Quantity:</strong> {quantity}</p>
      {orderError && <div className="error-message">{orderError}</div>}
      <button
        onClick={handleCompleteOrder}
        className="complete-order-button"
        disabled={orderLoading}
      >
        {orderLoading ? 'Completing Order...' : 'Complete Order'}
      </button>
    </div>
  );
};

export default CompleteOrder;
