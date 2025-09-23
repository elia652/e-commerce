import { React, createContext, useState } from 'react';
import all_product from '../Components/Assets/Frontend_Assets/all_product';
export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < all_product.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItems);
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const getTotalValue = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let info = all_product.find((product) => product.id === Number(item));
        totalAmount += info.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const getTotal = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        total += cartItems[item];
      }
    }
    return total;
  };

  const contextValue = {
    getTotalValue,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotal,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
