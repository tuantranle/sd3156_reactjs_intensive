// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import { useAuth } from '../../providers/AuthProvider';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome {user?.userName ?? ''}!</h1>
        <p>Discover quality products and manage your orders with ease.</p>
        <div className="button-group">
          <Link to="/products">
            <button className="primary-button">View Products</button>
          </Link>
          {user && (
            <Link to="/profile">
              <button className="secondary-button">Your Profile</button>
            </Link>
          )}
        </div>
      </div>
      
      <div className="info-cards">
        <div className="info-card">
          <h3>Shop Now</h3>
          <p>Explore our catalog of amazing products tailored for you.</p>
          <Link to="/products">Go to Products</Link>
        </div>
        <div className="info-card">
          <h3>Order Management</h3>
          <p>View and manage your orders efficiently in one place.</p>
          <Link to="/profile">Go to Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
