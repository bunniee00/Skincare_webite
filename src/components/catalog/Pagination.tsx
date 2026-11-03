'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number; // 0-based
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (pageIndex: number) => {
    if (pageIndex < 0 || pageIndex >= totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(pageIndex));
    router.push(`${pathname}?${params.toString()}`);
  };

  // Generate page numbers
  const pages = [];
  const maxButtons = 5;
  let start = Math.max(0, currentPage - Math.floor(maxButtons / 2));
  let end = Math.min(totalPages - 1, start + maxButtons - 1);
  if (end - start < maxButtons - 1) {
    start = Math.max(0, end - maxButtons + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12 py-4">
      {/* Prev Button */}
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 0}
        aria-label="Previous page"
        className="w-10 h-10 rounded-full border-2 border-[#C9D5F5] bg-white text-[#2D2522] flex items-center justify-center hover:bg-[#FDF1E3] hover:border-[#F4A28C] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Number Buttons */}
      {start > 0 && (
        <>
          <button
            type="button"
            onClick={() => goToPage(0)}
            className="w-10 h-10 rounded-full border-2 border-[#C9D5F5] bg-white text-xs font-bold text-[#2D2522] hover:bg-[#FDF1E3]"
          >
            1
          </button>
          {start > 1 && <span className="text-xs text-[#6E625F] px-1">...</span>}
        </>
      )}

      {pages.map(p => {
        const isActive = p === currentPage;
        return (
          <button
            key={p}
            type="button"
            onClick={() => goToPage(p)}
            className={`w-10 h-10 rounded-full text-xs font-extrabold transition-all shadow-xs ${
              isActive
                ? 'bg-[#F4A28C] text-white border-2 border-[#F08C75] scale-105'
                : 'bg-white border-2 border-[#C9D5F5] text-[#2D2522] hover:bg-[#FDF1E3] hover:border-[#F4A28C]'
            }`}
          >
            {p + 1}
          </button>
        );
      })}

      {end < totalPages - 1 && (
        <>
          {end < totalPages - 2 && <span className="text-xs text-[#6E625F] px-1">...</span>}
          <button
            type="button"
            onClick={() => goToPage(totalPages - 1)}
            className="w-10 h-10 rounded-full border-2 border-[#C9D5F5] bg-white text-xs font-bold text-[#2D2522] hover:bg-[#FDF1E3]"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        aria-label="Next page"
        className="w-10 h-10 rounded-full border-2 border-[#C9D5F5] bg-white text-[#2D2522] flex items-center justify-center hover:bg-[#FDF1E3] hover:border-[#F4A28C] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
