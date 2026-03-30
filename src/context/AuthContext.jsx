
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { loginUser, registerUser, updateUserProfile, logoutUser, clearTokens } from '../api';

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

  // Automatikus kijelentkezés ha a refresh token is lejárt
  const handleForceLogout = useCallback(() => {
    setCurrentUser(null);
    clearTokens();
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const accessToken = localStorage.getItem('accessToken');
    if (savedUser && accessToken) {
      setCurrentUser(JSON.parse(savedUser));
    } else if (savedUser && !accessToken) {
      // Ha van user de nincs token, töröljük
      localStorage.removeItem('currentUser');
    }

    // Figyelünk az auth:logout eseményre (token refresh sikertelen)
    window.addEventListener('auth:logout', handleForceLogout);
    return () => {
      window.removeEventListener('auth:logout', handleForceLogout);
    };
  }, [handleForceLogout]);

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

  const register = async (name, email, password, lastName, firstName, defaultAddress) => {
    try {
      const result = await registerUser(name, email, password, lastName, firstName, defaultAddress);
      if (result.success) {
        // NEM jelentkeztetjük be automatikusan - email verifikáció szükséges!
        return { success: true, user: result.user, message: result.message };
      }
      return { success: false, message: result.message || 'Regisztráció sikertelen' };
    } catch (e) {
      return { success: false, message: 'Regisztrációs hiba' };
    }
  };

  const updateProfile = async (profileData) => {
    if (!currentUser?.id) return { success: false, message: 'Nincs bejelentkezett felhasználó' };
    try {
      const result = await updateUserProfile(currentUser.id, profileData);
      if (result.success && result.user) {
        const updatedUser = { ...currentUser, ...result.user };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        return { success: true, message: result.message, user: updatedUser };
      }
      return { success: false, message: result.message || 'Profil frissítése sikertelen' };
    } catch (e) {
      return { success: false, message: 'Profil frissítési hiba' };
    }
  };

  const logout = async () => {
    await logoutUser();
    setCurrentUser(null);
  };

  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    isAdmin,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
