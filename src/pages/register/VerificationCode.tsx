// src/register/VerificationCode.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import './VerificationCode.scss';

interface VerificationCodeProps {
  email: string;
  userName: string;
}

const VerificationCode: React.FC<VerificationCodeProps> = ({ email, userName }) => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleVerification = async () => {
    try {
      const response = await axios.post('https://ccmernapp-11a99251a1a7.herokuapp.com/api/auth/verify', {
        userName,
        code,
      });
      if (response.status === 200) {
        setShowModal(true); // Show success modal on verification
      }
    } catch (error) {
      setMessage('Verification failed. Please check the code and try again.');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/login'); // Redirect to login after modal is closed
  };

  return (
    <div className="verification-card">
      <h3>Email Verification</h3>
      <p>A verification code has been sent to <strong>{email}</strong>. Please enter the code below to verify your email.</p>
      <input
        type="text"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="verification-input"
      />
      <button onClick={handleVerification} className="verification-button">Verify</button>
      {message && <div className="verification-message">{message}</div>}
      {showModal && <Modal message="Verification successful! Redirecting to login." onClose={handleModalClose} />}
    </div>
  );
};

export default VerificationCode;
