"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter(); // Hook pour la navigation

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
              <li key={item.id} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                {/* Afficher la couverture */}
                {item.cover && (
                  <img
                    src={item.cover}
                    alt={item.title}
                    style={{ width: '80px', height: 'auto', marginRight: '1rem', border: '2px solid #000' }}
                  />
                )}
                <div>
                  <strong>{item.title}</strong> x {item.quantity}
                  <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: "10px" }}>
                    Retirer
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p><strong>Total : {total.toFixed(2)} €</strong></p>
          
          {/* Boutons d'action */}
          <div style={{ marginTop: "1rem" }}>
            <button onClick={clearCart} style={{ marginRight: "10px" }}>
              Vider le panier
            </button>
            <button onClick={() => router.push("/checkout")} style={{ backgroundColor: "#f39c12", padding: "0.5rem 1rem", fontWeight: "bold", border: "2px solid #000" }}>
              Passer à la caisse
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
