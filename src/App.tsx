// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider, useAuth } from './providers/AuthProvider';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/userProfile/Profile';
import ProductCatalog from './pages/products/ProductCatalog';
import AdminOrders from './pages/AdminOrders';
import Register from './pages/register/Register';
import './App.scss';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Provider store={store}>
      <AuthProvider>
        <div className="page-container">
          <Header toggleTheme={toggleTheme} theme={theme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Provider>
  );
}

const Header: React.FC<{ toggleTheme: () => void; theme: string }> = ({ toggleTheme, theme }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h1><Link to="/">Demo Shop</Link></h1>
      </div>
      <div className="header-right">
        <div className="theme-toggle" onClick={toggleTheme}>
          <div className={`toggle-button ${theme}`} />
          <span className="theme-label">
            {theme === 'light' ? 'Light Theme' : 'Dark Theme'}
          </span>
        </div>
        {user ? (
          <>
            <Link to="/profile" className="profile-link">Profile</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-button">Login</Link>
        )}
      </div>
    </header>
  );
};

export default App;
