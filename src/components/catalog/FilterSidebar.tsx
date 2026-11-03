'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SlidersHorizontal, X, RotateCcw, Check } from 'lucide-react';
import { Category, SKIN_TYPES, SkinType } from '@/types';
import { FlowerIcon } from '@/components/common/DecorativeShapes';

interface FilterSidebarProps {
  categories: Category[];
  availableBrands?: string[];
}

export function FilterSidebar({ categories, availableBrands = [] }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Current filter values from URL
  const selectedCategory = searchParams.get('categoryId') || '';
  const selectedSkinType = searchParams.get('skinType') || '';
  const selectedBrand = searchParams.get('brand') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const inStock = searchParams.get('inStock') === 'true';
  const isNew = searchParams.get('isNew') === 'true';
  const isBestSeller = searchParams.get('isBestSeller') === 'true';

  const defaultBrands = [
    'The Ordinary',
    'CeraVe',
    'Beauty of Joseon',
    'COSRX',
    "Paula's Choice",
    'La Roche-Posay',
    "Kiehl's",
  ];
  const brands = availableBrands.length > 0 ? availableBrands : defaultBrands;

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === '' || value === 'ALL') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set('page', '0'); // reset page
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleBooleanParam = (key: string, currentVal: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentVal) {
      params.delete(key);
    } else {
      params.set(key, 'true');
    }
    params.set('page', '0');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePriceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const min = formData.get('minPrice') as string;
    const max = formData.get('maxPrice') as string;

    const params = new URLSearchParams(searchParams.toString());
    if (min) params.set('minPrice', min);
    else params.delete('minPrice');

    if (max) params.set('maxPrice', max);
    else params.delete('maxPrice');

    params.set('page', '0');
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(pathname);
    setMobileDrawerOpen(false);
  };

  const activeCount = [
    selectedCategory,
    selectedSkinType,
    selectedBrand,
    minPrice,
    maxPrice,
    inStock ? 'inStock' : null,
    isNew ? 'isNew' : null,
    isBestSeller ? 'isBestSeller' : null,
  ].filter(Boolean).length;

  const filterContent = (
    <div className="space-y-6">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-[#C9D5F5]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#F08C75]" />
          <h3 className="font-extrabold text-base text-[#2D2522]">Filters</h3>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#F0508A] text-white text-[10px] font-black flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs font-bold text-[#F08C75] hover:text-[#F4A28C] flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-black uppercase tracking-wider text-[#6E625F] block">
          Category
        </label>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => updateParam('categoryId', null)}
            className={`text-left px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              !selectedCategory
                ? 'bg-[#F4A28C] text-white shadow-xs'
                : 'text-[#2D2522] hover:bg-white/70'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() =>
                updateParam(
                  'categoryId',
                  selectedCategory === String(cat.id) ? null : String(cat.id)
                )
              }
              className={`text-left px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center justify-between ${
                selectedCategory === String(cat.id)
                  ? 'bg-[#F4A28C] text-white shadow-xs'
                  : 'text-[#2D2522] hover:bg-white/70'
              }`}
            >
              <span>{cat.name}</span>
              {selectedCategory === String(cat.id) && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Skin Type Filter */}
      <div className="space-y-2.5 pt-4 border-t border-[#C9D5F5]/60">
        <label className="text-xs font-black uppercase tracking-wider text-[#6E625F] block">
          Skin Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SKIN_TYPES.map(st => {
            const active = selectedSkinType === st.value || (!selectedSkinType && st.value === 'ALL');
            return (
              <button
                key={st.value}
                type="button"
                onClick={() => updateParam('skinType', st.value === 'ALL' ? null : st.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  active
                    ? 'bg-[#C9D5F5] text-[#2D2522] border-2 border-[#2D2522] shadow-xs'
                    : 'bg-white border border-[#C9D5F5] text-[#6E625F] hover:bg-[#FDF1E3]'
                }`}
              >
                {st.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-2.5 pt-4 border-t border-[#C9D5F5]/60">
        <label className="text-xs font-black uppercase tracking-wider text-[#6E625F] block">
          Brand
        </label>
        <div className="flex flex-col gap-1 max-h-44 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => updateParam('brand', null)}
            className={`text-left px-3 py-1 rounded-full text-xs font-semibold ${
              !selectedBrand ? 'font-bold text-[#F08C75]' : 'text-[#6E625F] hover:text-[#2D2522]'
            }`}
          >
            All Brands
          </button>
          {brands.map(brand => (
            <button
              key={brand}
              type="button"
              onClick={() => updateParam('brand', selectedBrand === brand ? null : brand)}
              className={`text-left px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center justify-between ${
                selectedBrand === brand
                  ? 'font-bold text-[#F08C75] bg-white/70'
                  : 'text-[#6E625F] hover:text-[#2D2522]'
              }`}
            >
              <span>{brand}</span>
              {selectedBrand === brand && <Check className="w-3.5 h-3.5 text-[#F08C75]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2.5 pt-4 border-t border-[#C9D5F5]/60">
        <label className="text-xs font-black uppercase tracking-wider text-[#6E625F] block">
          Price Range ($)
        </label>
        <form onSubmit={handlePriceSubmit} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="minPrice"
              defaultValue={minPrice}
              placeholder="Min"
              min="0"
              step="1"
              className="w-full bg-white border border-[#C9D5F5] rounded-full px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#F4A28C] focus:outline-hidden"
            />
            <input
              type="number"
              name="maxPrice"
              defaultValue={maxPrice}
              placeholder="Max"
              min="0"
              step="1"
              className="w-full bg-white border border-[#C9D5F5] rounded-full px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#F4A28C] focus:outline-hidden"
            />
          </div>
          <button
            type="submit"
            className="w-full py-1.5 rounded-full bg-[#E9F2B9] hover:bg-[#dfeaa3] text-[#2D2522] font-bold text-xs transition-colors"
          >
            Apply Price
          </button>
        </form>
      </div>

      {/* Quick Toggles: In Stock, New, Bestseller */}
      <div className="space-y-2 pt-4 border-t border-[#C9D5F5]/60">
        <label className="text-xs font-black uppercase tracking-wider text-[#6E625F] block">
          Availability & Badges
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-[#2D2522] select-none">
          <input
            type="checkbox"
            checked={inStock}
            onChange={() => toggleBooleanParam('inStock', inStock)}
            className="w-4 h-4 rounded-md accent-[#F4A28C] cursor-pointer"
          />
          <span>In Stock Only</span>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-[#2D2522] select-none">
          <input
            type="checkbox"
            checked={isNew}
            onChange={() => toggleBooleanParam('isNew', isNew)}
            className="w-4 h-4 rounded-md accent-[#F4A28C] cursor-pointer"
          />
          <span>New Arrivals (Fresh)</span>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-[#2D2522] select-none">
          <input
            type="checkbox"
            checked={isBestSeller}
            onChange={() => toggleBooleanParam('isBestSeller', isBestSeller)}
            className="w-4 h-4 rounded-md accent-[#F4A28C] cursor-pointer"
          />
          <span>Community Bestsellers (HIT)</span>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="w-full bg-white border-2 border-[#C9D5F5] rounded-full py-2.5 px-4 font-bold text-xs text-[#2D2522] flex items-center justify-center gap-2 shadow-xs hover:border-[#F4A28C]"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#F08C75]" />
          <span>Filters & Skin Types</span>
          {activeCount > 0 && (
            <span className="bg-[#F0508A] text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Sticky Sidebar */}
      <aside aria-label="Product filters" className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-white/70 backdrop-blur-md rounded-[24px] p-6 border-2 border-[#C9D5F5] shadow-xs">
          {filterContent}
        </div>
      </aside>

      {/* Mobile Modal Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-xs bg-[#FDF1E3] p-6 overflow-y-auto border-r-4 border-[#C9D5F5] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-extrabold text-base text-[#F08C75]">Filter Routine</span>
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2D2522]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {filterContent}
              </div>

              <div className="mt-8 pt-4 border-t border-[#C9D5F5]">
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="w-full bg-[#F4A28C] hover:bg-[#F08C75] text-white font-extrabold py-3 rounded-full text-xs shadow-md"
                >
                  Show Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
