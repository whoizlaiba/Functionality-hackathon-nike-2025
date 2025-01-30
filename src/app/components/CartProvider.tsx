"use client";
import React, { useState } from "react";
import { CartContext } from "./context";


interface Obj {
  productName: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  image: string;
status:string;
colors:string;
  id: number;
  
}

export interface Product extends Obj {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  // find(arg0: (products: Product) => boolean): unknown;
  quantity: number;
}

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [wish, setWish] = useState<Product[]>([]);
  // Function to add a product to the cart
  function addCart(product: Product) {
    const existingProduct = cart.find(
      (item) =>
        item.id === product.id 
    );

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  // Function to remove a product from the cart
  function delCart(product: Product) {
    const updatedCart = cart.filter(
      (item) =>
        item.id !== product.id 
    );
    setCart(updatedCart);
  }

  // Function to update the quantity of a product
  const updateQuantity = (
    id: number,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) return;
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id 
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  function addWish(product: Product) {
    const existingProduct = wish.find(
      (item) =>
        item.id === product.id 
    );

    if (existingProduct) {
      const updatedWish = wish.map((item) =>
        item.id === product.id 
          ? { ...item }
          : item
      );
      setWish(updatedWish);
    } else {
      setWish([...wish, { ...product }]);
    }
  }

  function delWish(product: Product) {
    const updatedWish = wish.filter(
      (item) =>
        item.id !== product.id 
    );
    setWish(updatedWish);
  }

  return (
    <CartContext.Provider
      value={{ cart, addCart, delCart, updateQuantity, wish, addWish, delWish }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
