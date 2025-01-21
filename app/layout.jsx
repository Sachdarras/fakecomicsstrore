// app/layout.jsx

import './globals.scss'; // ton style global
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';

export const metadata = {
  title: 'Mon E-commerce Comics',
  description: 'Site de vente de comics DC',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <NavBar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
