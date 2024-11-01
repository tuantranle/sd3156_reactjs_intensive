// src/pages/ProductCatalog.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../../models/product'
import './ProductCatalog.scss';
import { useAuth } from '../../providers/AuthProvider';

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ccmernapp-11a99251a1a7.herokuapp.com/api/shop/products', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
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

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-catalog">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={`/images/${product.img}`} alt={product.name} className="product-image" />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">
            ${product.sale_price}{' '}
            <span className="regular-price">${product.regular_price}</span>
          </p>
          <p className="product-description">Rating: {product.rating} ⭐ | In stock: {product.in_stock}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductCatalog;
