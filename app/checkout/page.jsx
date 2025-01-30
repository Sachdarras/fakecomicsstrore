"use client";

import { useCart } from "../context/CartContext";
import styles from "../style/Checkout.module.scss";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  function handleInputChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleCheckout(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      alert("Merci de remplir tous les champs !");
      return;
    }

    alert("Commande validée ! 🎉");
    clearCart();
  }

  return (
    <main className={styles.checkoutPage}>
      <h2 className={styles.title}>Finaliser la commande</h2>

      {/* Affichage du panier */}
      <div className={styles.cartSummary}>
        {cart.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.cover} alt={item.title} className={styles.cover} />
              <div className={styles.details}>
                <h3>{item.title}</h3>
                <p>Prix : {item.price.toFixed(2)} €</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Formulaire */}
      {cart.length > 0 && (
        <form className={styles.form} onSubmit={handleCheckout}>
          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={form.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Adresse"
            value={form.address}
            onChange={handleInputChange}
          />

          <button type="submit" className={styles.checkoutButton}>
            Valider la commande
          </button>
        </form>
      )}
    </main>
  );
}
