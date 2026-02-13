"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  // ✅ Subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // ✅ GST 18%
  const gstRate = 0.18;
  const gst = +(subtotal * gstRate).toFixed(2);

  // ✅ Optional Split (India standard)
  // const cgst = +(subtotal * 0.09).toFixed(2);
  // const sgst = +(subtotal * 0.09).toFixed(2);

  // ✅ Final Total
  const total = +(subtotal + gst).toFixed(2);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        subtotal,
        gst,
        total,
        showInvoice,
        setShowInvoice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
