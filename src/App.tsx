// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/Profile';
import ProductCatalog from './pages/ProductCatalog';
import AdminOrders from './pages/AdminOrders';
import Register from './pages/register/Register';
import './App.scss';
import { User } from './models/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
  user: any; // Adjust type as needed, e.g., `{ isAdmin: boolean } | null`
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, user, adminOnly = false }: ProtectedRouteProps) => {
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;
  return <>{children}</>;
};

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState<User | null>(null); // User state

  const navigate = useNavigate();

  useEffect(() => {
   debugger;
    // const loggedUser = localStorage.getItem('user');
    // if(loggedUser){
    //   localStorage.setItem('user', JSON.stringify(loggedUser))
    // }

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

  const login = (user: User) => {
    debugger;
    setUser(user);
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <Provider store={store}>
      <AuthProvider>
        <div className="page-container">
        <header className="app-header">
            <div className="header-left">
              <h1>Demo Shop</h1>
            </div>
            <div className="header-right">
              <div className="theme-toggle" onClick={toggleTheme}>
                <div className={`toggle-button ${theme}`} />
                <span className="theme-label">
                  {theme === 'light' ? 'Light Theme' : 'Dark Theme'}
                </span>
              </div>
              {user ? (
                <button onClick={logout} className="logout-button">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="login-button">
                  Login
                </Link>
              )}
            </div>
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedRoute user={user}><Profile /></ProtectedRoute>} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/admin/orders" element={<ProtectedRoute user={user} adminOnly={true}><AdminOrders /></ProtectedRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Provider>
  );
}

export default App;
