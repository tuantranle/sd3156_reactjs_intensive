import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RegisterUser, User } from '../../models/user';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isVerificationStep: boolean;
  verificationMessage: string | null;
  isRegistered: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isLoading: false,
  error: null,
  isVerificationStep: false,
  verificationMessage: null,
  isRegistered: false,
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterUser, { rejectWithValue }) => {
    try {
      const { confirmPassword, ...registerValues } = userData; // Exclude confirmPassword

      const response = await axios.post('https://ccmernapp-11a99251a1a7.herokuapp.com/api/auth/register', registerValues);
      if (response.data.status === 200) {
        return { ...userData, token: '', isAdmin: false }; // Return a User object without token and isAdmin
      } else {
        return rejectWithValue(response.data.message || 'Unexpected registration issue');
      }
    } catch (error) {
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Registration failed. Please try again later.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { userName: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://ccmernapp-11a99251a1a7.herokuapp.com/api/auth/login', credentials);
      if (response.data.status === 200) {
        const user: User = {
          userName: credentials.userName,
          isAdmin: credentials.userName === 'admin',
          token: '',
        };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } else {
        return rejectWithValue(response.data.message || 'Unexpected login issue');
      }
    } catch (error) {
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Login failed. Please try again later.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyCode = createAsyncThunk(
  'auth/verifyCode',
  async ({ userName, code }: { userName: string; code: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://ccmernapp-11a99251a1a7.herokuapp.com/api/auth/verify', { userName, code });
      if (response.status === 200) {

        const token = response.data.data.token;
        const user: User = {
          userName,
          isAdmin: userName === 'admin',
          token,
        };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } else {
        return rejectWithValue('Verification failed. Please check the code and try again.');
      }
    } catch (error) {
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Verification failed. Please try again later.';
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
      state.verificationMessage = null;
    },
    proceedToVerification: (state) => {
      state.isVerificationStep = true;
    },
    logout: (state) => {
      state.user = null;
      state.isVerificationStep = false;
      state.error = null;
      state.verificationMessage = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isRegistered = false;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isRegistered = true; // Set isRegistered to true on success
        state.user = action.payload; // Store the registered user for verification
        state.verificationMessage = 'Please check your email to complete verification.';
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isVerificationStep = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyCode.pending, (state) => {
        state.isLoading = true;
        state.verificationMessage = null;
      })
      .addCase(verifyCode.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isVerificationStep = false;
        state.verificationMessage = 'Verification successful! Redirecting to home.';
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.isLoading = false;
        state.verificationMessage = action.payload as string;
      });
  },
});

export const { resetError, proceedToVerification, logout } = authSlice.actions;

export default authSlice.reducer;
