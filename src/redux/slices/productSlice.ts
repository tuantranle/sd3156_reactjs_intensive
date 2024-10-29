import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductState {
  products: Product[];
  orders: Product[];
}

const initialState: ProductState = {
  products: [],
  orders: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    addOrder: (state, action: PayloadAction<Product>) => {
      state.orders.push(action.payload);
    },
  },
});

export const { setProducts, addProduct, addOrder } = productSlice.actions;
export default productSlice.reducer;