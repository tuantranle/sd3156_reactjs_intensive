import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { useAuth } from '../providers/AuthProvider';

const useAddOrder = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // const { user } = useAuth();
  const navigate = useNavigate();

  const addOrder = async (productId: string, quantity: number) => {
    // if (!user?.token) {
    //   setError('User is not authenticated');
    //   return;
    // }

    setLoading(true);
    setError(null);

    try {
     
    } catch (err) {
      setError('An error occurred while creating the order.');
    } finally {
      setLoading(false);
    }
  };

  return { addOrder, loading, error };
};

export default useAddOrder;
