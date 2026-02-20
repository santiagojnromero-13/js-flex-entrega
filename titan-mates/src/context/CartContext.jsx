import { createContext, useMemo, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (!exists) return [...prev, { ...item, quantity }];
      return prev.map((p) =>
        p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
      );
    });
  };

  const removeItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);

  const totalQuantity = useMemo(
    () => cart.reduce((acc, p) => acc + p.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((acc, p) => acc + p.price * p.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}