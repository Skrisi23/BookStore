import React, { createContext, useState, useContext, useEffect } from 'react';
import { getMyCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, clearCart as apiClearCart } from '../api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart csak CartProvider-en belül használható');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    if (!currentUser?.id) {
      setCartData(null);
      return;
    }

    try {
      setLoading(true);
      const cart = await getMyCart(currentUser.id);
      setCartData(cart);
    } catch (error) {
      console.error('Kosár betöltési hiba:', error);
      setCartData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [currentUser?.id]);
  const addToCart = async (bookId, orderType = 'rental', quantity = 1) => {
    if (!currentUser?.id) {
      throw new Error('Bejelentkezés szükséges');
    }

    try {
      const result = await apiAddToCart(currentUser.id, bookId, orderType, quantity);
      if (result.success) {
        setCartData(result.cart);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Kosárba helyezési hiba:', error);
      return { success: false, message: 'Hiba történt' };
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (!currentUser?.id) {
      throw new Error('Bejelentkezés szükséges');
    }

    try {
      const result = await apiRemoveFromCart(cartItemId, currentUser.id);
      if (result.success) {
        setCartData(result.cart);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Törlési hiba:', error);
      return { success: false, message: 'Hiba történt' };
    }
  };

  const clearCart = async () => {
    if (!currentUser?.id) {
      throw new Error('Bejelentkezés szükséges');
    }

    try {
      const result = await apiClearCart(currentUser.id);
      if (result.success) {
        setCartData(result.cart);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Kosár kiürítési hiba:', error);
      return { success: false, message: 'Hiba történt' };
    }
  };

  const getTotalPrice = () => {
    return cartData?.total_price || 0;
  };

  const getItemCount = () => {
    return cartData?.total_items || 0;
  };

  const value = {
    cartData,
    cartItems: cartData?.items || [],
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getItemCount,
    refreshCart: loadCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};