import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchProducts, addOrder, clearOrderError } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/store';
import './productCatalog.scss';

const ProductCatalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products, loading, error, orderLoading, orderError } = useAppSelector((state: RootState) => state.products);
  const token = useAppSelector((state: RootState) => state.auth.user?.token); // Get token from auth slice
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (token) {
      dispatch(fetchProducts(token)); // Pass token to fetchProducts
    }
    return () => {
      dispatch(clearOrderError());
    };
  }, [dispatch, token]);

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  const handleCreateOrder = async (productId: string) => {
    const quantity = quantities[productId] || 1;
    if (token) {
      const resultAction = await dispatch(addOrder({ productId, quantity, token })); // Await the dispatch result
      if (addOrder.fulfilled.match(resultAction)) {
        const orderDetails = resultAction.payload; // Access order details from payload
        navigate('/complete-order', {
          state: {
            orderNumber: orderDetails.orderNumber, // Example order number from response
            productId: productId,
            quantity: quantity,
          },
        });
      }
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-catalog">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={`/images/products/${product.img}`} alt={product.name} className="product-image" />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">Price: ${product.sale_price}</p>
          <label className="quantity-label">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantities[product.id] || 1}
            onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
            className="quantity-input"
          />
          <button
            onClick={() => handleCreateOrder(product.id)}
            className="create-order-button"
            disabled={orderLoading}
          >
            {orderLoading ? 'Creating Order...' : 'Create Order'}
          </button>
          {orderError && <div className="error-message">{orderError}</div>}
        </div>
      ))}
    </div>
  );
};

export default ProductCatalog;
