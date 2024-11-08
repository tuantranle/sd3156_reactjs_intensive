import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import './home.scss';

const Home = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        {user ? (
          <>
            <h1>Welcome {user.userName}!</h1>
            <p>Discover quality products and manage your orders with ease.</p>
            <div className="button-group">
              <Link to="/products">
                <button className="primary-button">View Products</button>
              </Link>
              <Link to="/profile">
                <button className="secondary-button">Your Profile</button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to Demo Shop!</h1>
            <p>Please log in to view products and create your orders.</p>
            <button onClick={handleLoginRedirect} className="primary-button">
              Log In to Continue
            </button>
          </>
        )}
      </div>

      {user && (
        <div className="info-cards">
          <div className="info-card">
            <h3>Shop Now</h3>
            <p>Explore our catalog of amazing products tailored for you.</p>
            <Link to="/products">Go to Products</Link>
          </div>
          <div className="info-card">
            <h3>Order Management</h3>
            <p>View and manage your orders efficiently in one place.</p>
            <Link to="/orders">Go to Orders</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
