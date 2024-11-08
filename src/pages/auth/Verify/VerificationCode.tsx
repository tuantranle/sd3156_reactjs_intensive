import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { verifyCode, resetError } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/modal/Modal';
import './verificationCode.scss';

interface VerificationCodeProps {
  userName: string;
}

const VerificationCode: React.FC<VerificationCodeProps> = ({ userName }) => {
  const [code, setCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, verificationMessage } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (verificationMessage === 'Verification successful! Redirecting to home.') {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        navigate('/'); // Redirect to home page on success
      }, 2000);

      return () => clearTimeout(timer);
    }

    return () => {
      dispatch(resetError()); // Reset messages on component unmount
    };
  }, [verificationMessage, dispatch, navigate]);

  const handleVerification = () => {
    dispatch(verifyCode({ userName, code }));
  };

  return (
    <div className="verification-card">
      <p>A verification code has been sent to your email. Please enter the code below to verify your email.</p>
      <input
        type="text"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="verification-input"
      />
      <button onClick={handleVerification} className="verification-button" disabled={isLoading}>
        {isLoading ? 'Verifying...' : 'Verify'}
      </button>
      {verificationMessage && <div className="verification-message">{verificationMessage}</div>}
      {showModal && (
        <Modal
          message="Verification successful! Redirecting to home."
          onClose={() => {
            setShowModal(false);
            navigate('/');
          }}
        />
      )}
    </div>
  );
};

export default VerificationCode;
