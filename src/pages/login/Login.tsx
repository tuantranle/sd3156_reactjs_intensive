// src/pages/Login.tsx
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

interface LoginProps {
  onLogin: (user: { isAdmin: boolean }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (values: { userName: string; password: string }) => {
    try {
      
      const response = await axios.post('https://ccmernapp-11a99251a1a7.herokuapp.com/api/auth/login', values);
      
      if (response.data.status === 200) {
        localStorage.setItem('user', JSON.stringify(values.userName)); // Save user details

        const user = { isAdmin: credentials.username === 'admin', userName: values.userName };
        onLogin(user); // Update the user state in App
        
        // Redirect to the homepage
        navigate('/');
      } else {
        // Handle cases where status is 200 but token is missing
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setErrorMessage('Invalid username or password. Please try again.');
      } else {
        setErrorMessage('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <Formik
        initialValues={{ userName: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label htmlFor="userName">Username</label>
              <Field name="userName" type="text" placeholder="Enter your username" />
              <ErrorMessage name="userName" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" placeholder="Enter your password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit" className="login-button">Login</button>
          </Form>
        )}
      </Formik>
      <div className="register-link">
        <p>Don’t have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
