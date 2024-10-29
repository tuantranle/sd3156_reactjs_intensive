// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
// import orderReducer from './slices/orderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
