import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './providers/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>,
  document.getElementById('root')
);