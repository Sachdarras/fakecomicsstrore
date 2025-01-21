"use client";
// Indique qu'on est sur un composant client (car on va lire le contexte du panier)

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import styles from '../style/NavBar.module.scss';

export default function NavBar() {
  const { cart } = useCart();

  // Calculer le nombre total d'articles
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={styles.navbar}>
      {/* Logo ou titre du site */}
      <div className={styles.logo}>
        <Link href="/">DC Comics Store</Link>
      </div>

      {/* Liens de navigation */}
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/comics">Comics</Link>
        </li>
        <li>
          <Link href="/cart">
            Panier <span className={styles.cartCount}>({totalItems})</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
