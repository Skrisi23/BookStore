
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUsers } from '../api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
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
      // Ha van dedikált login endpoint, azt használd:
      // const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/Users/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password })
      // });
      // if (!res.ok) return { success: false, message: 'Hibás felhasználónév vagy jelszó' };
      // const userData = await res.json();

      // Átmeneti megoldás: lekérjük a felhasználókat, és kliens oldalon ellenőrzünk,
      // amíg nincs kész a login endpoint.
      const users = await getUsers();
      const user = Array.isArray(users) ? users.find(u => u.username === username) : null;
      if (!user) return { success: false, message: 'Hibás felhasználónév vagy jelszó' };

      // FIGYELEM: Jelszó ellenőrzést backendnek kell végeznie!
      // Itt csak demonstráció, hogy ne mock adatra támaszkodjunk.

      const userWithoutSensitive = { ...user };
      delete userWithoutSensitive.password;
      setCurrentUser(userWithoutSensitive);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutSensitive));
      return { success: true, user: userWithoutSensitive };
    } catch (e) {
      return { success: false, message: 'Bejelentkezés sikertelen' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const isAdmin = () => {
    return currentUser?.role === 'admin';
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
