import React, { useContext, useReducer } from "react";
import { defaultStore } from "./defaultStore";
import { cartReducer } from "./CartReducer";
const ShopContext = React.createContext();

const GlobalShop = () => {
  return useContext(ShopContext);
};

const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, defaultStore);

  const viewDevice = (item, link) => {
    dispatch({ type: "VIEW_DEVICE", payload: { item, link } });
  };
  const setRecent = (item, link) => {
    dispatch({ type: "SET_RECENT", payload: { item, link } });
  };
  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  const increment = (item) => {
    dispatch({ type: "INCREMENT", payload: item });
  };
  const decrement = (item) => {
    dispatch({ type: "DECREMENT", payload: item });
  };
  const setTotalAmount = (amount) => {
    dispatch({ type: "SET_TOTAL_AMOUNT", payload: amount });
  };
  return (
    <ShopContext.Provider
      value={{
        viewDevice,
        state,
        addToCart,
        removeItem,
        setTotalAmount,
        clearCart,
        closeModal,
        increment,
        decrement,
        setRecent,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export { ShopProvider, GlobalShop };
