"use client";

import { useCart } from '../../context/CartContext';
import styles from '../../style/AddToCartButton.module.scss';

export default function AddToCartButton({ issue }) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    const item = {
      id: issue.id,
      title: issue.name || issue.volume?.name || 'Sans Titre',
      price: 5.99, // Exemple
      cover: issue.image?.thumb_url || '',
    };
    addToCart(item);
  }

  return (
    <button className={styles.cartBtn} onClick={handleAddToCart}>
      Ajouter au panier
    </button>
  );
}
