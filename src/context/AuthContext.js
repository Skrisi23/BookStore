
import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser } from '../api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth csak AuthProvider-en belül használható');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const result = await loginUser(username, password);
      if (result.success) {
        const userForStorage = { ...result.user };
        setCurrentUser(userForStorage);
        localStorage.setItem('currentUser', JSON.stringify(userForStorage));
        return { success: true, user: userForStorage };
      }
      return { success: false, message: result.message || 'Bejelentkezés sikertelen' };
    } catch (e) {
      return { success: false, message: 'Bejelentkezési hiba' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const isAdmin = () => {
    const name = (currentUser?.nev || currentUser?.name || '').toLowerCase();
    const email = (currentUser?.email || '').toLowerCase();
    const role = (currentUser?.role || '').toLowerCase();
    return role === 'admin' || name === 'admin' || email.includes('admin');
  };

  const value = {
    currentUser,
    login,
    logout,
    isAdmin,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
