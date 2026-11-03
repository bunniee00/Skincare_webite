import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Droplets, Sun, Sparkle, Shield, Heart } from 'lucide-react';
import { FlowerIcon, SparkleStar } from '@/components/common/DecorativeShapes';

export function CategoryBento() {
  const categories = [
    {
      id: 1,
      title: 'Gentle Cleansers',
      desc: 'Melt away daily impurities without stripping moisture',
      bg: 'bg-[#BFD4F7]/40',
      border: 'border-[#BFD4F7]',
      accent: 'text-[#2D2522]',
      tag: 'Step 01',
      tagBg: 'bg-[#BFD4F7]',
      href: '/products?categoryId=1',
    },
    {
      id: 2,
      title: 'Hydrating Toners',
      desc: 'Prep & balance your skin barrier with floral waters',
      bg: 'bg-[#F7A8C8]/30',
      border: 'border-[#F7A8C8]',
      accent: 'text-[#F0508A]',
      tag: 'Step 02',
      tagBg: 'bg-[#F7A8C8]',
      href: '/products?categoryId=2',
    },
    {
      id: 3,
      title: 'Targeted Serums',
      desc: 'Concentrated actives for brightening, calm & texture',
      bg: 'bg-[#E9F2B9]/50',
      border: 'border-[#d6e09c]',
      accent: 'text-[#2D2522]',
      tag: 'Step 03',
      tagBg: 'bg-[#E9F2B9]',
      href: '/products?categoryId=3',
    },
    {
      id: 4,
      title: 'Barrier Creams',
      desc: 'Cloud-light nourishment locking in hydration all day',
      bg: 'bg-[#F4A28C]/30',
      border: 'border-[#F4A28C]',
      accent: 'text-[#F08C75]',
      tag: 'Step 04',
      tagBg: 'bg-[#F4A28C] text-white',
      href: '/products?categoryId=4',
    },
    {
      id: 5,
      title: 'Dewy Sunscreens',
      desc: 'Ultra-light UV defense with zero white cast and silky glow',
      bg: 'bg-[#C9D5F5]/45',
      border: 'border-[#C9D5F5]',
      accent: 'text-[#2D2522]',
      tag: 'Step 05',
      tagBg: 'bg-[#C9D5F5]',
      href: '/products?categoryId=5',
    },
  ];

  return (
    <section className="py-16 bg-white/60 border-y-2 border-[#C9D5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#F7A8C8] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#2D2522] mb-3">
            <FlowerIcon className="w-4 h-4" petalColor="#F4A28C" />
            <span>Curated Skincare Steps</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F08C75] tracking-tight">
            Build Your Daily Glow Routine
          </h2>
          <p className="text-sm text-[#6E625F] mt-2">
            Every step is mindfully crafted to complement one another, keeping your skin calm and balanced.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`group relative p-6 rounded-[24px] border-2 ${cat.border} ${cat.bg} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between overflow-hidden ${
                idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="space-y-3 relative z-10">
                <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${cat.tagBg}`}>
                  {cat.tag}
                </span>
                <h3 className="text-xl font-bold text-[#2D2522] group-hover:text-[#F08C75] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#6E625F] leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-bold text-[#2D2522]">
                <span>Discover formulas</span>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-xs">
                  <ArrowRight className="w-4 h-4 text-[#F08C75]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
