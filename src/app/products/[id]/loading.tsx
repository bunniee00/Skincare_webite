import React from 'react';
import { Skeleton } from '@/components/common/Skeleton';

export default function ProductDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="mb-8 flex items-center gap-2">
        <Skeleton className="h-4 w-12 rounded-full bg-[#C9D5F5]/60" />
        <Skeleton className="h-4 w-16 rounded-full bg-[#C9D5F5]/60" />
        <Skeleton className="h-4 w-28 rounded-full bg-[#C9D5F5]/60" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Image Skeleton */}
        <div className="lg:col-span-6">
          <Skeleton className="aspect-square w-full rounded-[32px] bg-white/70 border-3 border-[#C9D5F5]" />
        </div>

        {/* Right Details Skeleton */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24 rounded-full bg-[#F7A8C8]/40" />
            <Skeleton className="h-6 w-20 rounded-full bg-[#BFD4F7]/40" />
          </div>

          <Skeleton className="h-10 w-4/5 rounded-2xl bg-[#F08C75]/25" />
          <Skeleton className="h-8 w-32 rounded-xl bg-[#2D2522]/20" />

          <div className="h-14 bg-white/60 rounded-full border border-[#C9D5F5] w-full" />

          <div className="space-y-2 pt-4">
            <Skeleton className="h-4 w-24 bg-[#C9D5F5]/60 rounded-full" />
            <Skeleton className="h-4 w-full bg-[#C9D5F5]/40 rounded-full" />
            <Skeleton className="h-4 w-5/6 bg-[#C9D5F5]/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
