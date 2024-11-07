// src/hooks/useAddOrder.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../providers/OrderProvider';
import { useAuth } from '../providers/AuthProvider';

const useAddOrder = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { createOrder } = useOrder();
  const { user } = useAuth();
  const navigate = useNavigate();

  const addOrder = async (productId: string, quantity: number) => {
    if (!user?.token) {
      setError('User is not authenticated');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderNumber = await createOrder(productId, quantity);
      if (orderNumber) {
        // Redirect to CompleteOrder page with order details in state
        navigate('/complete-order', { state: { orderNumber, productId, quantity } });
      } else {
        setError('Failed to create order. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while creating the order.');
    } finally {
      setLoading(false);
    }
  };

  return { addOrder, loading, error };
};

export default useAddOrder;
