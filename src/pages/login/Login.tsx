// Login.tsx
import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../providers/AuthProvider';
import VerificationCode from '../auth/Verify/VerificationCode';
import './login.scss';

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const { user, login, isVerificationStep, proceedToVerification } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if user is already authenticated
    if (user && user.token) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (values: { userName: string; password: string }) => {
    try {
      const response = await axios.post('https://ccmernapp-11a99251a1a7.herokuapp.com/api/auth/login', values);

      if (response.data.status === 200) {
        const userData = {
          userName: values.userName,
          isAdmin: values.userName === 'admin',
          token: '',
        };
        login(userData); // Set user in context, which also saves to localStorage
        proceedToVerification(); // Go to verification step if needed
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid username or password. Please try again.');
    }
  };

  if (isVerificationStep) {
    return <VerificationCode userName={user?.userName || ''} />;
  }

  return (
    <div className="login-container">
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
              <button type="submit" className="login-button">Login</button>
            </Form>
          )}
        </Formik>
        <div className="register-link">
          <p>Don’t have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
