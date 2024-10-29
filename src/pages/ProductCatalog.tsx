import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setProducts } from '../redux/slices/productSlice';

// Define a type for the product
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductCatalog = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products) as Product[];

  useEffect(() => {
    // Simulate fetching product data (mock data)
    const fetchProducts = async () => {
      const mockProducts: Product[] = [
        { id: 1, name: 'Product 1', price: 100, description: 'Description for Product 1' },
        { id: 2, name: 'Product 2', price: 200, description: 'Description for Product 2' },
        { id: 3, name: 'Product 3', price: 300, description: 'Description for Product 3' },
      ];
      dispatch(setProducts(mockProducts));
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      <h1>Product Catalog</h1>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCatalog;