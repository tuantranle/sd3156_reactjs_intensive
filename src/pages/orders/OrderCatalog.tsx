import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchOrders, clearOrderError } from '../../redux/slices/orderSlice';
import { RootState } from '../../redux/store';
import './orderCatalog.scss';

const OrderCatalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state: RootState) => state.orders);
  const token = useAppSelector((state: RootState) => state.auth.user?.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchOrders(token));
    }
    return () => {
      dispatch(clearOrderError()); // Clear any error on unmount
    };
  }, [dispatch, token]);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="order-catalog">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.orderNumber} className="order-item">
              <div className="order-header">
                <h3>Order #{order.orderNumber}</h3>
                <span className="status">{order.status}</span>
              </div>
              <div className="order-details">
                <p><strong>Customer:</strong> {order.customer}</p>
                <p><strong>Product:</strong> {order.product.name}</p>
                <p><strong>Category:</strong> {order.category.name}</p>
                <p><strong>SKU:</strong> {order.sku}</p>
                <p className="order-price">
                  <strong>Price:</strong> ${order.product.sale_price} <span>(Regular: ${order.product.regular_price})</span>
                </p>
                <p className="order-price amount-due"><strong>Amount Due:</strong> ${order.payment.amount - order.payment.received}</p>
              </div>
              <div className="order-timestamp">
                <p>Created: {new Date(order.created).toLocaleString()}</p>
                <p>Last Updated: {new Date(order.updated).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderCatalog;
