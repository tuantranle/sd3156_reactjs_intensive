// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/Profile';
import ProductCatalog from './pages/ProductCatalog';
import AdminOrders from './pages/AdminOrders';
import Register from './pages/register/Register';
import './App.scss'; // Import the global styling

interface ProtectedRouteProps {
  children: React.ReactNode; // Explicitly type `children` as React.ReactNode
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;
  return <>{children}</>;
};

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Routes>
        </div>
      </AuthProvider>
    </Provider>
  );
}

export default App;
