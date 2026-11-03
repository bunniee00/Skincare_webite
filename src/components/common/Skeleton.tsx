import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-[#C9D5F5]/40 rounded-[16px] ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-[24px] bg-[#BFD4F7]/25 border-2 border-[#C9D5F5]/60 p-3.5 space-y-3">
      {/* Image skeleton */}
      <Skeleton className="w-full aspect-square rounded-[20px] bg-[#C9D5F5]/35" />
      {/* Periwinkle name bar skeleton */}
      <div className="w-full bg-[#C9D5F5]/50 rounded-[18px] p-3 flex items-center justify-between gap-3">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/3 bg-white/60" />
          <Skeleton className="h-4 w-3/4 bg-white/70" />
          <Skeleton className="h-4 w-1/4 bg-[#F08C75]/30" />
        </div>
        <Skeleton className="w-10 h-10 rounded-full bg-[#F4A28C]/40 shrink-0" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
