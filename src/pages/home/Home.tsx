// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import { User } from '../../models/user';

const Home = () => {
  const [userLoggedin, setuserLoggedin] = useState<User | null>(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setuserLoggedin(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome{userLoggedin ? `, ${userLoggedin.userName}` : ''}!</h1>
        <p>Discover quality products and manage your orders with ease.</p>
        <div className="button-group">
          <Link to="/products">
            <button className="primary-button">View Products</button>
          </Link>
          {userLoggedin && (
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
