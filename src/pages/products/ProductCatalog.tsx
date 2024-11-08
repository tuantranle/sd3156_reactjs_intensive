import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../../models/product';
import useAddOrder from '../../hooks/useAddOrder';
import './productCatalog.scss';
// import { useAuth } from '../../providers/AuthProvider';

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const { addOrder, loading: orderLoading, error: orderError } = useAddOrder();
  // const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ccmernapp-11a99251a1a7.herokuapp.com/api/shop/products', {
          headers: {
            // Authorization: `Bearer ${user?.token}`, // Include token in the headers
          },
        });

        if (response.data.status === 200) {
          const updatedProducts = response.data.data.products.map((product: Product) => ({
            ...product,
            img: `/products/${product.img}`, // Update img property to point to the correct path
          }));
          setProducts(updatedProducts);
        } else {
          setError('Failed to load products');
        }
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  const handleCreateOrder = (productId: string) => {
    const quantity = quantities[productId] || 1; // Default to 1 if no quantity is set
    addOrder(productId, quantity);
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-catalog">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={`/images/${product.img}`} alt={product.name} className="product-image" />
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
