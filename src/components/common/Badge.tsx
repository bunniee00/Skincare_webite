import React from 'react';

type BadgeVariant = 'hit' | 'new' | 'periwinkle' | 'bubblegum' | 'lime' | 'peach' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'peach', className = '' }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    hit: 'bg-[#F0508A] text-white font-extrabold shadow-sm',
    new: 'bg-[#E9F2B9] text-[#2D2522] font-bold border border-[#d2df98]',
    periwinkle: 'bg-[#C9D5F5] text-[#2D2522] font-semibold',
    bubblegum: 'bg-[#F7A8C8] text-[#2D2522] font-semibold',
    lime: 'bg-[#E9F2B9] text-[#2D2522] font-semibold',
    peach: 'bg-[#F4A28C] text-white font-semibold',
    outline: 'border-2 border-[#C9D5F5] text-[#2D2522] bg-white/80 backdrop-blur-xs font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs uppercase tracking-wider select-none ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
