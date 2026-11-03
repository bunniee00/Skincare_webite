'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, X } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentKeyword = searchParams.get('keyword') || '';
  const [keyword, setKeyword] = useState(currentKeyword);

  useEffect(() => {
    setKeyword(currentKeyword);
  }, [currentKeyword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (keyword.trim()) {
      params.set('keyword', keyword.trim());
      params.set('page', '0'); // reset to first page
    } else {
      params.delete('keyword');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    setKeyword('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('keyword');
    params.set('page', '0');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search cleanser, serum, retinol, brand..."
        className="w-full bg-white border-2 border-[#C9D5F5] rounded-full pl-11 pr-10 py-2.5 text-xs sm:text-sm text-[#2D2522] placeholder:text-[#6E625F]/60 focus:outline-hidden focus:border-[#F4A28C] focus:ring-2 focus:ring-[#F4A28C]/30 shadow-xs transition-all"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E625F]" />
      {keyword && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#C9D5F5] text-[#2D2522] flex items-center justify-center hover:bg-[#F4A28C] hover:text-white transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </form>
  );
}
