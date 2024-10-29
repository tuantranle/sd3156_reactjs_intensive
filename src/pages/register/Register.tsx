// src/register/Register.tsx
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerificationCode from './VerificationCode'; // Import VerificationCode component
import { RegisterUser, User } from '../../models/user';
import './Register.scss';

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

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false); // Track if registration is successful
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>(''); // Track user's email for verification
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async (values: any) => {
    const { confirmPassword, ...submitValue } = values;
    try {
      const response = await axios.post('https://ccmernapp-11a99251a1a7.herokuapp.com/api/auth/register', submitValue);
      if (response.data.status === 200){
        setIsRegistered(true); // Set registration as successful
        setEmail(values.email); // Save email for verification purposes
        setUserName(values.userName);
        setErrorMessage(null);
      } else {
        setErrorMessage(response.data.message);
      }
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 500) {
        setErrorMessage('Server error: Please try again later.');
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="register-card">
      {isRegistered ? (
        <VerificationCode email={email} userName={userName} /> // Show verification component on success
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
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit" className="register-button">Register</button>
              </Form>
            )}
          </Formik>
          <div className="login-link">
            <p>Already have an account? <a href="/login">Log in</a></p>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
