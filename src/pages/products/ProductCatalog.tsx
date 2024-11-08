import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchProducts, clearOrderError } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/store';
import useAddOrder from '../../hooks/useAddOrder';
import './productCatalog.scss';

const ProductCatalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state: RootState) => state.products);
  const token = useAppSelector((state: RootState) => state.auth.user?.token); // Get token from auth slice
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Use custom hook for order creation
  const { createOrder, orderLoading, orderError } = useAddOrder(token ?? "");

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

  const handleCreateOrder = (productId: string) => {
    const quantity = quantities[productId] || 1;
    createOrder(productId, quantity); // Use custom hook to create the order
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
