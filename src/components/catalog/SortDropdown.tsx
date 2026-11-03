'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ArrowUpDown } from 'lucide-react';

export function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortDir = searchParams.get('sortDir') || 'desc';
  const currentKey = `${sortBy}:${sortDir}`;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newSortDir] = e.target.value.split(':');
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', newSortBy);
    params.set('sortDir', newSortDir);
    params.set('page', '0');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative inline-flex items-center">
      <div className="relative">
        <select
          value={currentKey}
          onChange={handleChange}
          aria-label="Sort products by"
          className="appearance-none bg-white border-2 border-[#C9D5F5] rounded-full pl-9 pr-8 py-2 text-xs font-bold text-[#2D2522] hover:border-[#F4A28C] focus:outline-hidden focus:border-[#F4A28C] transition-colors cursor-pointer shadow-xs"
        >
          <option value="createdAt:desc">Newest Arrivals</option>
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
          <option value="name:asc">Name: A to Z</option>
          <option value="name:desc">Name: Z to A</option>
          <option value="createdAt:asc">Oldest First</option>
        </select>
        <ArrowUpDown className="w-3.5 h-3.5 text-[#6E625F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}
