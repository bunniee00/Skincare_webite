'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/common/ProductCard';

interface BestsellersCarouselProps {
  products: Product[];
}

export function BestsellersCarousel({ products }: BestsellersCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const step = 304; // card width (280) + gap (24)
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  // Filter only bestsellers if not already filtered
  const bestsellers = products.filter(p => p.isBestSeller);
  const displayItems = bestsellers.length > 0 ? bestsellers : products.slice(0, 8);

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Title and Arrow Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#F7A8C8] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#2D2522] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F08C75]" />
            <span>Community Favorites</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F08C75] tracking-tight">
            Our Bestsellers
          </h2>
          <p className="text-sm text-[#6E625F] mt-1 font-medium">
            Formulated to deliver real glow without irritation. Tried, loved, and restocked.
          </p>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <Link
            href="/products?isBestSeller=true"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-extrabold text-[#F08C75] hover:text-[#F4A28C] mr-2"
          >
            <span>See All Bestsellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Previous products"
            className="w-11 h-11 rounded-full bg-[#C9D5F5] hover:bg-[#F4A28C] hover:text-white text-[#2D2522] flex items-center justify-center transition-all shadow-xs active:scale-95 border border-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Next products"
            className="w-11 h-11 rounded-full bg-[#F4A28C] hover:bg-[#F08C75] text-white flex items-center justify-center transition-all shadow-xs active:scale-95 border border-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 snap-x snap-mandatory"
      >
        {displayItems.map(product => (
          <div
            key={product.id}
            className="w-[260px] sm:w-[270px] md:w-[280px] flex-shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Mobile See All Button */}
      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/products?isBestSeller=true"
          className="inline-flex items-center gap-2 bg-[#F4A28C] text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-xs"
        >
          <span>See All Bestsellers</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}