import React from 'react';

interface PastelPlaceholderProps {
  className?: string;
  category?: string;
  title?: string;
}

export function PastelPlaceholder({ className = '', category = 'Skincare', title }: PastelPlaceholderProps) {
  // Determine soft pastel gradient theme based on category or random
  const isCleanser = category.toLowerCase().includes('clean');
  const isSerum = category.toLowerCase().includes('serum') || category.toLowerCase().includes('toner');

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FDF1E3] via-[#BFD4F7]/40 to-[#C9D5F5]/60 select-none ${className}`}
    >
      {/* Background soft pastel ambient circles */}
      <div className="absolute top-2 right-2 w-20 h-20 bg-[#F7A8C8]/30 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-4 left-3 w-24 h-24 bg-[#E9F2B9]/40 rounded-full blur-xl pointer-events-none" />

      {/* Decorative bottle / jar illustration */}
      <svg
        viewBox="0 0 160 200"
        className="w-32 h-40 max-w-[80%] max-h-[80%] drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isSerum ? (
          // Dropper / Serum Bottle
          <>
            {/* Dropper bulb */}
            <path
              d="M72 16C72 11.5817 75.5817 8 80 8C84.4183 8 88 11.5817 88 16V26H72V16Z"
              fill="#F4A28C"
            />
            {/* Dropper collar */}
            <rect x="68" y="26" width="24" height="12" rx="4" fill="#C9D5F5" stroke="#F4A28C" strokeWidth="1.5" />
            {/* Bottle body */}
            <rect
              x="44"
              y="40"
              width="72"
              height="130"
              rx="24"
              fill="#FFFFFF"
              stroke="#C9D5F5"
              strokeWidth="2.5"
            />
            {/* Label */}
            <rect
              x="52"
              y="68"
              width="56"
              height="72"
              rx="12"
              fill="#FDF1E3"
              stroke="#F7A8C8"
              strokeWidth="1.5"
            />
            {/* Flower logo on bottle */}
            <circle cx="80" cy="94" r="8" fill="#F7A8C8" />
            <circle cx="80" cy="94" r="3.5" fill="#E9F2B9" />
            <rect x="62" y="112" width="36" height="4" rx="2" fill="#F08C75" />
            <rect x="68" y="120" width="24" height="3" rx="1.5" fill="#C9D5F5" />
          </>
        ) : isCleanser ? (
          // Cleanser Pump Bottle
          <>
            {/* Pump nozzle */}
            <path
              d="M60 12H84C86.2091 12 88 13.7909 88 16V24H76V32H68V24H60C57.7909 24 56 22.2091 56 20C56 15.5817 57.7909 12 60 12Z"
              fill="#F4A28C"
            />
            <rect x="66" y="28" width="16" height="12" rx="2" fill="#C9D5F5" />
            {/* Bottle shape */}
            <rect
              x="42"
              y="40"
              width="76"
              height="140"
              rx="28"
              fill="#FFFFFF"
              stroke="#BFD4F7"
              strokeWidth="2.5"
            />
            {/* Soft tint wave */}
            <path
              d="M44 95C55 90 65 102 80 96C95 90 105 100 116 95V150C116 165 100 178 80 178C60 178 44 165 44 150V95Z"
              fill="#BFD4F7"
              fillOpacity="0.4"
            />
            <circle cx="80" cy="74" r="9" fill="#F08C75" fillOpacity="0.8" />
            <rect x="60" y="126" width="40" height="4" rx="2" fill="#F08C75" />
          </>
        ) : (
          // Cream Jar
          <>
            {/* Jar Lid */}
            <rect
              x="36"
              y="48"
              width="88"
              height="24"
              rx="12"
              fill="#F4A28C"
              stroke="#F08C75"
              strokeWidth="2"
            />
            {/* Jar Base */}
            <path
              d="M42 72H118C123.523 72 128 76.4772 128 82V136C128 152.569 114.569 166 98 166H62C45.4315 166 32 152.569 32 136V82C32 76.4772 36.4772 72 42 72Z"
              fill="#FFFFFF"
              stroke="#C9D5F5"
              strokeWidth="2.5"
            />
            {/* Pastel Ribbon / Label */}
            <rect
              x="40"
              y="94"
              width="80"
              height="42"
              rx="8"
              fill="#FDF1E3"
              stroke="#F7A8C8"
              strokeWidth="1.5"
            />
            <circle cx="80" cy="115" r="7" fill="#F7A8C8" />
            <circle cx="80" cy="115" r="3" fill="#E9F2B9" />
          </>
        )}
      </svg>

      {/* Subtle label */}
      <span className="mt-2 text-[11px] font-medium tracking-wider text-[#6E625F] uppercase px-2.5 py-0.5 rounded-full bg-white/70 backdrop-blur-xs border border-[#C9D5F5]/60">
        {category}
      </span>
    </div>
  );
}
