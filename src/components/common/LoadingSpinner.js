// src/components/common/LoadingSpinner.js
import React from 'react';

function LoadingSpinner({ size = 'md', text = 'Betöltés...', fullPage = false }) {
  const sizeClass = size === 'sm' ? 'spinner-border-sm' : size === 'lg' ? 'spinner-border-lg' : '';

  const spinner = (
    <div className="text-center py-4">
      <div className={`spinner-border text-primary ${sizeClass}`} role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">{text}</span>
      </div>
      {text && <p className="mt-3 text-muted fw-bold">{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default LoadingSpinner;
