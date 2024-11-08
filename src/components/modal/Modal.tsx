import React from 'react';
import './Modal.scss';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <p>{message}</p>
      <button onClick={onClose}>OK</button>
    </div>
  </div>
);

export default Modal;
