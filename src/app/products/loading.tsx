import React from 'react';
import { ProductCardSkeleton } from '@/components/common/Skeleton';
import { Skeleton } from '@/components/common/Skeleton';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="mb-8 space-y-3">
        <Skeleton className="h-6 w-36 rounded-full bg-[#F7A8C8]/40" />
        <Skeleton className="h-10 w-72 rounded-2xl bg-[#F08C75]/20" />
        <Skeleton className="h-4 w-96 rounded-full bg-[#C9D5F5]/50" />
      </div>

      {/* Top Bar Skeleton */}
      <div className="mb-6 h-16 bg-white/60 rounded-[24px] border-2 border-[#C9D5F5]/60 flex items-center justify-between px-6">
        <Skeleton className="h-10 w-64 rounded-full bg-[#C9D5F5]/40" />
        <Skeleton className="h-9 w-40 rounded-full bg-[#C9D5F5]/40" />
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="bg-white/60 rounded-[24px] p-6 border-2 border-[#C9D5F5]/60 space-y-6">
            <Skeleton className="h-6 w-24 bg-[#C9D5F5]/60 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full bg-[#C9D5F5]/30 rounded-full" />
              <Skeleton className="h-5 w-4/5 bg-[#C9D5F5]/30 rounded-full" />
              <Skeleton className="h-5 w-3/4 bg-[#C9D5F5]/30 rounded-full" />
            </div>
            <div className="space-y-2 pt-4 border-t border-[#C9D5F5]/40">
              <Skeleton className="h-6 w-28 bg-[#C9D5F5]/60 rounded-full" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-14 bg-[#C9D5F5]/40 rounded-full" />
                <Skeleton className="h-6 w-16 bg-[#C9D5F5]/40 rounded-full" />
                <Skeleton className="h-6 w-20 bg-[#C9D5F5]/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
