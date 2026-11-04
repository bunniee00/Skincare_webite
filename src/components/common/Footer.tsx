'use client';

import React from 'react';
import Link from 'next/link';
import { FlowerIcon, CloudIcon, SparkleStar } from './DecorativeShapes';
import { Heart, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-[#C9D5F5] bg-[#FDF1E3] relative overflow-hidden">
      {/* Decorative background clouds */}
      <div className="absolute -top-6 left-12 opacity-40 pointer-events-none">
        <CloudIcon className="w-24 h-16" color="#BFD4F7" />
      </div>
      <div className="absolute top-10 right-16 opacity-30 pointer-events-none">
        <CloudIcon className="w-32 h-20" color="#F7A8C8" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <FlowerIcon className="w-8 h-8" petalColor="#F08C75" centerColor="#E9F2B9" />
              <span className="font-extrabold text-2xl tracking-tight text-[#2D2522]">
                BUNN<span className="text-[#F08C75]">NIEE</span>
              </span>
            </div>
            <p className="text-sm text-[#6E625F] leading-relaxed">
              Joyful, pastel skincare formulated with dermatologist-approved gentle botanicals. Hydrate, protect, and fall in love with your everyday routine.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#E9F2B9] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#2D2522]">
              <SparkleStar className="w-3.5 h-3.5" color="#F08C75" />
              <span>100% Clean & Cruelty-Free</span>
            </div>
          </div>

          {/* Quick shop */}
          <div className="space-y-3">
            <h4 className="font-bold text-base text-[#2D2522] uppercase tracking-wider">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-sm text-[#6E625F]">
              <li>
                <Link href="/products?categoryId=1" className="hover:text-[#F08C75] transition-colors">
                  Purifying Cleansers
                </Link>
              </li>
              <li>
                <Link href="/products?categoryId=2" className="hover:text-[#F08C75] transition-colors">
                  Balancing Toners
                </Link>
              </li>
              <li>
                <Link href="/products?categoryId=3" className="hover:text-[#F08C75] transition-colors">
                  Potent Serums
                </Link>
              </li>
              <li>
                <Link href="/products?categoryId=4" className="hover:text-[#F08C75] transition-colors">
                  Barrier Moisturizers
                </Link>
              </li>
              <li>
                <Link href="/products?categoryId=5" className="hover:text-[#F08C75] transition-colors">
                  Invisible Sunscreens
                </Link>
              </li>
            </ul>
          </div>

          {/* Skin concerns */}
          <div className="space-y-3">
            <h4 className="font-bold text-base text-[#2D2522] uppercase tracking-wider">
              By Skin Type
            </h4>
            <ul className="space-y-2 text-sm text-[#6E625F]">
              <li>
                <Link href="/products?skinType=SENSITIVE" className="hover:text-[#F08C75] transition-colors">
                  Sensitive & Calming
                </Link>
              </li>
              <li>
                <Link href="/products?skinType=DRY" className="hover:text-[#F08C75] transition-colors">
                  Dry & Moisture Surge
                </Link>
              </li>
              <li>
                <Link href="/products?skinType=OILY" className="hover:text-[#F08C75] transition-colors">
                  Oily & Pore Refining
                </Link>
              </li>
              <li>
                <Link href="/products?skinType=COMBINATION" className="hover:text-[#F08C75] transition-colors">
                  Combination Balance
                </Link>
              </li>
              <li>
                <Link href="/products?isBestSeller=true" className="hover:text-[#F08C75] transition-colors">
                  Customer Bestsellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter pill card */}
          <div className="space-y-4 bg-white/70 backdrop-blur-xs p-6 rounded-[24px] border-2 border-[#C9D5F5] shadow-xs">
            <h4 className="font-bold text-base text-[#F08C75] flex items-center gap-1.5">
              <span>Join the Glow Club</span>
              <FlowerIcon className="w-4 h-4" petalColor="#F7A8C8" />
            </h4>
            <p className="text-xs text-[#6E625F] leading-relaxed">
              Subscribe for sweet surprises, seasonal skincare routines, and 15% off your first treat.
            </p>
            <form onSubmit={e => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your sweetest email..."
                  className="w-full bg-[#FDF1E3] border border-[#C9D5F5] rounded-full px-4 py-2.5 text-xs text-[#2D2522] placeholder:text-[#6E625F]/60 focus:outline-hidden focus:ring-2 focus:ring-[#F4A28C]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#F4A28C] hover:bg-[#F08C75] text-white font-bold py-2.5 rounded-full text-xs transition-colors shadow-xs"
              >
                Subscribe with Love
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-[#C9D5F5]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E625F] gap-4">
          <p>© {new Date().getFullYear()} Glow & Bloom Skincare Storefront. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-[#F0508A] text-[#F0508A]" />
            <span>for healthy, glowing skin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
