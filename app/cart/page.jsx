"use client";

import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calculer le total
  const total = cart.reduce((sum, item) => sum + (item.quantity * (item.price || 0)), 0);

  return (
    <main>
      <h1>Votre Panier</h1>

      {cart.length === 0 ? (
        <p>Panier vide.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} style={{ marginBottom: '1rem' }}>
                <div>
                  {/* Afficher la couverture */}
                  {item.cover && (
                    <img
                      src={item.cover}
                      alt={item.title}
                      style={{ width: '80px', marginRight: '1rem', border: '2px solid #000' }}
                    />
                  )}
                  <strong>{item.title}</strong> x {item.quantity}
                </div>
                <button onClick={() => removeFromCart(item.id)}>Retirer</button>
              </li>
            ))}
          </ul>
          <p>Total : {total.toFixed(2)} €</p>
          <button onClick={clearCart}>Vider le panier</button>
        </div>
      )}
    </main>
  );
}
