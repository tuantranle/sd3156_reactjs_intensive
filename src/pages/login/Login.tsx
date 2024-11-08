import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { login, resetError, proceedToVerification } from '../../redux/slices/authSlice';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import VerificationCode from '../auth/Verify/VerificationCode';
import './login.scss';

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, isVerificationStep, user } = useAppSelector((state) => state.auth); // Access user state
  const userName = user?.userName || ''; // Get the username if it exists
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to home page
    if (user && user.token != '' ) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const handleLogin = async (values: { userName: string; password: string }) => {
    const result = await dispatch(login(values));
    
    // Proceed to verification if login was successful
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(proceedToVerification());
    }
  };

  if (isVerificationStep) {
    return <VerificationCode userName={userName} />; // Pass the actual username as a prop
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
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Login'}
              </button>
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
