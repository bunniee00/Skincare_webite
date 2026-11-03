'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Sparkles, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { FlowerIcon } from './DecorativeShapes';

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, toggleCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop All', href: '/products' },
    { label: 'New In', href: '/products?isNew=true' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <aside aria-label="Announcement" className="bg-[#F7A8C8] text-[#2D2522] py-1.5 px-4 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#F08C75]" />
        <span>Free Worldwide Shipping on all orders over $40 • 100% Gentle & Dermatologically Approved</span>
        <Sparkles className="w-3.5 h-3.5 text-[#F08C75]" />
      </aside>

      {/* Main Navbar */}
      <header className="sticky top-3 z-40 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all">
        <div className="bg-[#F4A28C] text-white rounded-[26px] shadow-md border-2 border-white/60 px-4 sm:px-6 py-3 flex items-center justify-between backdrop-blur-md">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-xs transition-transform group-hover:rotate-12">
              <FlowerIcon className="w-6 h-6" petalColor="#F08C75" centerColor="#E9F2B9" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight leading-none text-white drop-shadow-xs">
                BUNNIEE
              </span>
              <span className="text-[10px] font-medium tracking-widest text-[#FDF1E3] uppercase">
                Pastel Skincare
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/20 p-1.5 rounded-full border border-white/30 backdrop-blur-xs">
            {navLinks.map(link => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    active
                      ? 'bg-white text-[#F08C75] shadow-xs'
                      : 'text-white hover:bg-white/20 hover:text-[#FDF1E3]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Search Icon Shortcut */}
            <Link
              href="/products"
              aria-label="Search catalog"
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-transform active:scale-95"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Cart Icon Button with Counter Badge */}
            <button
              type="button"
              onClick={toggleCart}
              aria-label={`Open shopping cart with ${totalItems} items`}
              className="relative w-11 h-10 rounded-full bg-white text-[#F08C75] hover:bg-[#FDF1E3] flex items-center justify-center transition-all shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1 bg-[#F0508A] text-white text-[11px] font-extrabold rounded-full min-w-5 h-5 px-1 flex items-center justify-center shadow-md animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle mobile navigation menu"
              className="md:hidden w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-[#F4A28C] border-2 border-white rounded-[24px] p-4 shadow-xl flex flex-col gap-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-[16px] text-base font-bold transition-colors ${
                  isActive(link.href)
                    ? 'bg-white text-[#F08C75]'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 bg-[#E9F2B9] text-[#2D2522] px-4 py-2.5 rounded-[16px] text-base font-extrabold flex items-center justify-between"
            >
              <span>View Cart</span>
              <span className="bg-[#F0508A] text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems} items
              </span>
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
