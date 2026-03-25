// src/components/common/ToastContainer.js
import React from 'react';
import { useToast } from '../../context/ToastContext';
import './ToastContainer.css';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <i className="bi bi-check-circle-fill"></i>;
      case 'error':
        return <i className="bi bi-x-circle-fill"></i>;
      case 'warning':
        return <i className="bi bi-exclamation-triangle-fill"></i>;
      case 'info':
      default:
        return <i className="bi bi-info-circle-fill"></i>;
    }
  };

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast show toast-${toast.type}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body d-flex align-items-center">
            <span className="toast-icon me-2">
              {getIcon(toast.type)}
            </span>
            <span className="flex-grow-1">{toast.message}</span>
            <button
              type="button"
              className="btn-close btn-close-white ms-2"
              onClick={() => removeToast(toast.id)}
              aria-label="Close"
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
