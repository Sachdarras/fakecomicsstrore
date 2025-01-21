"use client"; 
// Indique qu’on est dans un composant client 
// (car on va utiliser useState, etc.)

import { createContext, useContext, useState, useEffect } from "react";

// Crée un contexte vide
const CartContext = createContext(null);

// Hook perso pour consommer le contexte plus facilement
export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  // État local du panier
  const [cart, setCart] = useState([]);

  // Charger le panier depuis localStorage (au montage)
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fonctions pour gérer le panier
  function addToCart(item) {
    // item = { id, title, prix, etc. }
    setCart((prev) => {
      // On peut vérifier si l'item est déjà présent
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        // On peut incrémenter la quantité par exemple
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        // On ajoute l'item avec quantity = 1
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((p) => p.id !== itemId));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
