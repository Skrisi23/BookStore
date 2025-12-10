import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book, type = 'purchase') => {
    
    const existingItem = cartItems.find(
      item => item.id === book.id && item.type === type
    );

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === book.id && item.type === type
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        ...book,
        type,
        quantity: 1,
        price: type === 'rental' ? book.rentalPrice : book.price
      }]);
    }
  };

  const removeFromCart = (bookId, type) => {
    setCartItems(cartItems.filter(
      item => !(item.id === bookId && item.type === type)
    ));
  };

  const updateQuantity = (bookId, type, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId, type);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === bookId && item.type === type
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};