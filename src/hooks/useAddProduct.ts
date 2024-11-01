import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/slices/productSlice';
import { Product } from '../models/product'; // Import the Product type

const useAddProduct = () => {
  const dispatch = useDispatch();

  const handleAddProduct = (product: Product) => { // Explicitly type `product`
    //dispatch(addProduct(product));
  };

  return handleAddProduct;
};

export default useAddProduct;
