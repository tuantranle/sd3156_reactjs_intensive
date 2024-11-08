// src/providers/OrderProvider.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

interface OrderContextType {
  createOrder: (productId: string, quantity: number) => Promise<string | null>;
  completeOrder: (orderNumber: string) => Promise<boolean>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within an OrderProvider');
  return context;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const createOrder = async (productId: string, quantity: number): Promise<string | null> => {
    try {
      const response = await axios.post(
        'https://ccmernapp-11a99251a1a7.herokuapp.com/api/shop/order/create',
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`, // Include token in headers
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        return response.data.data.orderNumber;
      }
      return null;
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  };

  const completeOrder = async (orderNumber: string): Promise<boolean> => {
    try {
      const response = await axios.post('https://ccmernapp-11a99251a1a7.herokuapp.com/api/shop/order/complete', {
        orderNumber },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`, // Include token in headers
            'Content-Type': 'application/json',
          },
        }
      );
      return response.status === 200;
    } catch (error) {
      console.error('Error completing order:', error);
      return false;
    }
  };

  return (
    <OrderContext.Provider value={{ createOrder, completeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
