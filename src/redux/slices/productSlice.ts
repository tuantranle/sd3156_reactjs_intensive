// productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../models/product';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  orderLoading: boolean;
  orderError: string | null;
  orderComplete: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  orderLoading: false,
  orderError: null,
  orderComplete: false,
};

// Updated fetchProducts thunk to accept token
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://ccmernapp-11a99251a1a7.herokuapp.com/api/shop/products', {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });
      if (response.data.status === 200) {
        return response.data.data.products;
      } else {
        return rejectWithValue('Failed to load products');
      }
    } catch (error) {
      return rejectWithValue('Error fetching products');
    }
  }
);

// Updated addOrder thunk to accept token
export const addOrder = createAsyncThunk(
  'products/addOrder',
  async ({ productId, quantity, token }: { productId: string; quantity: number; token: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://ccmernapp-11a99251a1a7.herokuapp.com/api/shop/order/create',
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        }
      );
      if (response.data.status === 200) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to create order');
      }
    } catch (error) {
      return rejectWithValue('Error creating order');
    }
  }
);

export const completeOrder = createAsyncThunk(
  'products/completeOrder',
  async ({ orderNumber, token }: { orderNumber: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://ccmernapp-11a99251a1a7.herokuapp.com/api/shop/order/complete',
        { orderNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        return response.data.message; // Assuming message or success response
      } else {
        return rejectWithValue('Order completion failed');
      }
    } catch (error) {
      return rejectWithValue('Error completing order');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.orderError = null;
    },
    resetOrderComplete: (state) => {
      state.orderComplete = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products cases
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add order cases
      .addCase(addOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(addOrder.fulfilled, (state) => {
        state.orderLoading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload as string;
      })

      // Complete order cases
      .addCase(completeOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(completeOrder.fulfilled, (state) => {
        state.orderLoading = false;
        state.orderComplete = true;
      })
      .addCase(completeOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload as string;
      });
  },
});

export const { clearOrderError, resetOrderComplete  } = productSlice.actions;

export default productSlice.reducer;
