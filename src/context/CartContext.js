import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    let cartItems = await AsyncStorage.getItem("cart");
    cartItems = cartItems ? JSON.parse(cartItems) : [];
    setCartItems(cartItems);
    calculateTotalPrice(cartItems);
  };

  const addToCartItem = async (item) => {
    let cartItems = await AsyncStorage.getItem("cart");
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    let index = cartItems.findIndex((cart) => cart.id === item.id);
    if (index !== -1) {
      // Update existing item
      cartItems[index].quantity += item.quantity;
    } else {
      // Add new item
      item.quantity = item.quantity || 1;
      cartItems.push(item);
    }

    calculateTotalPrice(cartItems);
    setCartItems(cartItems);
    await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const deleteCartItem = async (id) => {
    let cartItems = await AsyncStorage.getItem("cart");
    cartItems = cartItems ? JSON.parse(cartItems) : [];
    
    // Remove item or update quantity if quantity is less than 1
    cartItems = cartItems.filter((item) => item.id !== id);

    setCartItems(cartItems);
    calculateTotalPrice(cartItems);
    await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const updateCartItemQuantity = async (id, quantityChange) => {
    let cartItems = await AsyncStorage.getItem("cart");
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    let index = cartItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      cartItems[index].quantity += quantityChange;

      if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
      }

      calculateTotalPrice(cartItems);
      setCartItems(cartItems);
      await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  const calculateTotalPrice = (cartItems) => {
    let totalSum = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    totalSum = totalSum.toFixed(2);
    setTotalPrice(totalSum);
  };

  const value = {
    cartItems,
    addToCartItem,
    deleteCartItem,
    updateCartItemQuantity,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
