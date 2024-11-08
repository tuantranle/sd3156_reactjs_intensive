import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Order } from '../../models/order';
// import { useAuth } from '../../providers/AuthProvider';
import './orderCatalog.scss';

const OrderCatalog: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://ccmernapp-11a99251a1a7.herokuapp.com/api/shop/orders', {
          headers: {
            // Authorization: `Bearer ${user?.token}`,
          },
        });
        debugger;
        if (response.data.status === 200) {
          setOrders(response.data.data.orders);
        } else {
          setError('Failed to load orders');
        }
      } catch (error) {
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    // if (user?.token) {
    //   fetchOrders();
    // }
  }, []);

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
