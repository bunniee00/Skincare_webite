import React from 'react';
import { FlowerIcon, SparkleStar } from './DecorativeShapes';

interface MarqueeProps {
  className?: string;
}

export function Marquee({ className = '' }: MarqueeProps) {
  const items = [
    'GLOW & BLOOM',
    'CLEAN & VEGAN FORMULAS',
    'DERMATOLOGICALLY TESTED',
    'NATURAL BOTANICAL EXTRACTS',
    'CRUELTY-FREE BEAUTY',
    'DEEP HYDRATION & BARRIER CARE',
    'NEW SPRING COLLECTION',
  ];

  return (
    <div
      className={`w-full overflow-hidden bg-[#E9F2B9] border-y-2 border-[#d6e09c] py-2.5 select-none ${className}`}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Render twice for continuous loop */}
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center mx-5 gap-4">
            <span className="font-extrabold text-xs sm:text-sm tracking-widest uppercase text-[#2D2522]">
              {text}
            </span>
            {idx % 2 === 0 ? (
              <FlowerIcon className="w-4 h-4 shrink-0" petalColor="#F7A8C8" centerColor="#F4A28C" />
            ) : (
              <SparkleStar className="w-3.5 h-3.5 shrink-0" color="#F08C75" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
