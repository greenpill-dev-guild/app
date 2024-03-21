"use client";
import React, { useState, useEffect, useContext } from "react";

import { IAllocationParams, ICartContextProps } from "../types";

export const CartContext = React.createContext<ICartContextProps | undefined>(
  undefined
);

export const CartContextProvider = ({ children }: { children: any }) => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [allocations, setAllocations] = useState<IAllocationParams>({});

  // Initialize cartItems from local storage on component mount
  useEffect(() => {
    const storedItems: string | null = localStorage.getItem("cartItems");
    const initialCartItems: string[] = storedItems
      ? JSON.parse(storedItems)
      : [];
    setCartItems(initialCartItems);
  }, []);

  // Function to add a shopping item (ID) to cart and local storage
  const addItemToCart = (itemId: string): void => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems, itemId];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  // Function to delete a shopping item (ID) from cart and local storage
  const deleteItemFromCart = (itemId: string): void => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (cartItem) => cartItem !== itemId
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const isInCart = (itemId: string): boolean => {
    return cartItems.includes(itemId);
  };

  const handleAllocationChange = (recipientId: string, value: number): void => {
    setAllocations((prevAllocations) => ({
      ...prevAllocations,
      [recipientId]: value,
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        deleteItemFromCart,
        isInCart,
        allocations, // Include allocations in the context
        handleAllocationChange, // Include handleAllocationChange in the context
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to easily access the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
