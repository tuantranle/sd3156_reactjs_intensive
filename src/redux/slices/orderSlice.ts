// orderSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Order } from '../../models/order';

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://ccmernapp-11a99251a1a7.herokuapp.com/api/shop/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === 200) {
        return response.data.data.orders;
      } else {
        return rejectWithValue('Failed to load orders');
      }
    } catch (error) {
      return rejectWithValue('Error fetching orders');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearOrderError } = orderSlice.actions;

export default orderSlice.reducer;
