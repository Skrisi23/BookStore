// src/pages/LoginPage.js
import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

function LoginPage({ onLoginSuccess }) {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          {showRegister ? (
            <Register
              onSuccess={onLoginSuccess}
              onSwitchToLogin={() => setShowRegister(false)}
            />
          ) : (
            <Login
              onSuccess={onLoginSuccess}
              onSwitchToRegister={() => setShowRegister(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
