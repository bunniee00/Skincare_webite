'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { FlowerIcon, CloudIcon, SparkleStar } from '@/components/common/DecorativeShapes';
import { Badge } from '@/components/common/Badge';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-hero-stripes border-b-2 border-[#C9D5F5]">
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-6 lg:left-20 opacity-70 animate-pulse pointer-events-none">
        <CloudIcon className="w-20 h-12 lg:w-28 lg:h-16" color="#BFD4F7" />
      </div>
      <div className="absolute top-1/4 right-8 lg:right-24 opacity-80 pointer-events-none">
        <FlowerIcon className="w-10 h-10 lg:w-14 lg:h-14" petalColor="#F7A8C8" centerColor="#E9F2B9" />
      </div>
      <div className="absolute bottom-6 left-1/3 opacity-50 pointer-events-none">
        <SparkleStar className="w-6 h-6" color="#F08C75" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Section Label */}
            <div className="inline-flex items-center gap-2 bg-[#E9F2B9] border-2 border-[#d6e297] px-4 py-1.5 rounded-full shadow-xs">
              <FlowerIcon className="w-4 h-4" petalColor="#F08C75" centerColor="#FFFFFF" />
              <span className="font-extrabold text-xs tracking-wider uppercase text-[#2D2522]">
                NEW COLLECTION 2026
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#F08C75]" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F08C75] tracking-tight leading-[1.15] drop-shadow-xs">
              Sweet Botanicals for Your Everyday{' '}
              <span className="relative inline-block text-[#2D2522]">
                Dewy Glow
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#F7A8C8]"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M0 15 Q 50 0 100 15"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#6E625F] max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Dermatologically tested formulas packed with nourishing ceramides, gentle plant extracts, and cloud-soft textures tailored for all skin types.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#F4A28C] hover:bg-[#F08C75] text-white font-extrabold px-8 py-4 rounded-full text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/products?isBestSeller=true"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-[#2D2522] border-2 border-[#C9D5F5] font-bold px-7 py-4 rounded-full text-base transition-all shadow-xs hover:border-[#F4A28C]"
              >
                <span>View Bestsellers</span>
                <Badge variant="hit" className="text-[10px] px-2 py-0.5">HIT</Badge>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#6E625F] font-semibold">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E9F2B9] border border-[#2D2522]" />
                <span>100% Clean Actives</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F7A8C8] border border-[#2D2522]" />
                <span>Cruelty-Free</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C9D5F5] border border-[#2D2522]" />
                <span>Derm Approved</span>
              </div>
            </div>
          </div>

          {/* Right Column: Blob-Shaped Image Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-80 sm:w-88 sm:h-96 lg:w-96 lg:h-[430px]">
              {/* Decorative aura */}
              <div className="absolute inset-0 bg-[#F7A8C8]/40 rounded-[48px] blur-2xl transform rotate-6 scale-95" />
              <div className="absolute inset-0 bg-[#BFD4F7]/60 rounded-[48px] blur-xl transform -rotate-3 scale-95" />

              {/* Blob frame with your photo */}
              <div
                className="relative w-full h-full border-4 border-white shadow-2xl overflow-hidden"
                style={{
                  borderRadius: '60% 40% 55% 45% / 50% 55% 45% 50%',
                  background: '#FDF1E3',
                }}
              >
<Image
  src="/hero.jpeg"
  alt="Bunniee skincare collection"
  fill
  priority
  sizes="(max-width: 1024px) 288px, 384px"
  className="object-cover object-center"
/>
                {/* Floating Pill Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <span className="inline-block bg-[#E9F2B9] text-[#2D2522] border-2 border-[#2D2522] font-black text-xs px-3.5 py-1 rounded-full shadow-md transform rotate-6">
                    ★ FRESH DROP ★
                  </span>
                </div>

                {/* Floating Rating Pill */}
                <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-xs border-2 border-[#C9D5F5] px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform -rotate-3">
                  <Star className="w-4 h-4 fill-[#F4A28C] text-[#F4A28C]" />
                  <span className="text-xs font-extrabold text-[#2D2522]">4.9 / 5.0</span>
                  <span className="text-[10px] text-[#6E625F]">(2,400+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}