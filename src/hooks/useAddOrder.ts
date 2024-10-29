import { useDispatch } from 'react-redux';
import { addOrder } from '../redux/slices/productSlice';
import { Product } from '../models/product';

const useAddOrder = () => {
  const dispatch = useDispatch();

  const handleAddOrder = (order: Product) => {
    dispatch(addOrder(order));
  };

  return handleAddOrder;
};

export default useAddOrder;