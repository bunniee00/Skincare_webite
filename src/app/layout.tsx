import type { Metadata } from 'next';
import { Poppins, Manrope } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Glow & Bloom | Pastel Skincare Storefront',
  description:
    'Joyful, dermatologist-approved pastel skincare. Gentle hydration, barrier serums, and sun care for your everyday glow.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${manrope.variable}`}>
      <body className="bg-[#FDF1E3] text-[#2D2522] min-h-screen flex flex-col font-sans selection:bg-[#F7A8C8] selection:text-[#2D2522]">
        <CartProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
