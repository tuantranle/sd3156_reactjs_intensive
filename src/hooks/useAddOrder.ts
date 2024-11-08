// useCreateOrder.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './hooks';
import { addOrder } from '../redux/slices/productSlice';

const useAddOrder = (token: string) => {
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const createOrder = async (productId: string, quantity: number) => {
    setOrderLoading(true);
    setOrderError(null);

    try {
      const resultAction = await dispatch(addOrder({ productId, quantity, token }));
      if (addOrder.fulfilled.match(resultAction)) {
        const orderDetails = resultAction.payload;
        navigate('/complete-order', {
          state: {
            orderNumber: orderDetails.orderNumber,
            productId: productId,
            quantity: quantity,
          },
        });
      } else {
        setOrderError('Failed to create order.');
      }
    } catch (error) {
      setOrderError('Error creating order. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  return {
    createOrder,
    orderLoading,
    orderError,
  };
};

export default useAddOrder;
