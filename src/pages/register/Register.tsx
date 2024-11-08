import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { register, resetError } from '../../redux/slices/authSlice';
import VerificationCode from '../auth/Verify/VerificationCode';
import * as Yup from 'yup';
import './register.scss';
import { RegisterUser } from '../../models/user';

const RegisterSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm password is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
});

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, isRegistered, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(resetError()); // Clear errors on unmount
    };
  }, [dispatch]);

  const handleRegister = (values: RegisterUser) => {
    dispatch(register(values));
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {isRegistered && user?.userName ? (
          <VerificationCode userName={user.userName} /> // Pass userName from Redux user object
        ) : (
          <>
            <h2>Register</h2>
            <Formik
              initialValues={{
                userName: '',
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
              }}
              validationSchema={RegisterSchema}
              onSubmit={handleRegister}
            >
              {() => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" type="text" placeholder="Enter your first name" />
                    <ErrorMessage name="firstName" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" type="text" placeholder="Enter your last name" />
                    <ErrorMessage name="lastName" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="userName">Username</label>
                    <Field name="userName" type="text" placeholder="Enter your username" />
                    <ErrorMessage name="userName" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" placeholder="Enter your email" />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" placeholder="Enter your password" />
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field name="confirmPassword" type="password" placeholder="Confirm your password" />
                    <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                  </div>
                  {error && <div className="error-message">{error}</div>}
                  <button type="submit" className="register-button" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                  </button>
                </Form>
              )}
            </Formik>
            <div className="login-link">
              <p>Already have an account? <a href="/login">Log in</a></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
