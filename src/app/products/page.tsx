import React from 'react';
import { api } from '@/lib/api';
import { ProductFilterParams, SkinType } from '@/types';
import { ProductCard } from '@/components/common/ProductCard';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { SearchBar } from '@/components/catalog/SearchBar';
import { SortDropdown } from '@/components/catalog/SortDropdown';
import { Pagination } from '@/components/catalog/Pagination';
import { FlowerIcon, CloudIcon } from '@/components/common/DecorativeShapes';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;

  // Extract filter parameters
  const keyword = typeof resolvedParams.keyword === 'string' ? resolvedParams.keyword : undefined;
  const categoryId =
    typeof resolvedParams.categoryId === 'string'
      ? parseInt(resolvedParams.categoryId, 10)
      : undefined;
  const skinType =
    typeof resolvedParams.skinType === 'string'
      ? (resolvedParams.skinType as SkinType)
      : undefined;
  const brand = typeof resolvedParams.brand === 'string' ? resolvedParams.brand : undefined;
  const minPrice =
    typeof resolvedParams.minPrice === 'string'
      ? parseFloat(resolvedParams.minPrice)
      : undefined;
  const maxPrice =
    typeof resolvedParams.maxPrice === 'string'
      ? parseFloat(resolvedParams.maxPrice)
      : undefined;
  const isBestSeller =
    resolvedParams.isBestSeller === 'true'
      ? true
      : resolvedParams.isBestSeller === 'false'
      ? false
      : undefined;
  const isNew =
    resolvedParams.isNew === 'true'
      ? true
      : resolvedParams.isNew === 'false'
      ? false
      : undefined;
  const inStock =
    resolvedParams.inStock === 'true'
      ? true
      : resolvedParams.inStock === 'false'
      ? false
      : undefined;

  const page =
    typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page, 10) : 0;
  const size = 12; // 12 items per page for clean 3 & 4 col grids
  const sortBy =
    typeof resolvedParams.sortBy === 'string'
      ? (resolvedParams.sortBy as 'price' | 'name' | 'createdAt')
      : 'createdAt';
  const sortDir =
    typeof resolvedParams.sortDir === 'string'
      ? (resolvedParams.sortDir as 'asc' | 'desc')
      : 'desc';

  const filterParams: ProductFilterParams = {
    keyword,
    categoryId,
    skinType,
    brand,
    minPrice,
    maxPrice,
    isBestSeller,
    isNew,
    inStock,
    page,
    size,
    sortBy,
    sortDir,
  };

  // Concurrent fetch of categories and filtered products
  const [categories, pageData] = await Promise.all([
    api.getCategories(),
    api.filterProducts(filterParams),
  ]);

  const { content: products, totalElements, totalPages, pageNumber } = pageData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-8 relative">
        <div className="inline-flex items-center gap-1.5 bg-[#F7A8C8] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#2D2522] mb-2">
          <FlowerIcon className="w-3.5 h-3.5" petalColor="#F08C75" />
          <span>Curated Apothecary</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F08C75] tracking-tight">
          Explore All Formulations
        </h1>
        <p className="text-sm text-[#6E625F] mt-1 max-w-xl">
          Filtered by dermatological category, skin type, active ingredients, and botanical extracts.
        </p>
      </div>

      {/* Top Bar: Search + Sorting + Results Count */}
      <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-4 rounded-[24px] border-2 border-[#C9D5F5] shadow-xs">
        <SearchBar />

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs font-bold text-[#6E625F] whitespace-nowrap">
            <strong className="text-[#F08C75]">{totalElements}</strong> products found
          </span>
          <SortDropdown />
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Filter Sidebar */}
        <FilterSidebar categories={categories} />

        {/* Right Product Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="bg-white/80 rounded-[28px] border-2 border-[#C9D5F5] p-12 text-center flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#BFD4F7]/40 flex items-center justify-center mb-4">
                <CloudIcon className="w-10 h-10" color="#F4A28C" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2522]">No skincare matches found</h3>
              <p className="text-xs sm:text-sm text-[#6E625F] max-w-md mt-2 mb-6">
                We couldn&apos;t find any products matching your current filters. Try relaxing your filters or searching for something else.
              </p>
              <Link
                href="/products"
                className="bg-[#F4A28C] hover:bg-[#F08C75] text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-xs transition-colors"
              >
                Clear All Filters
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination currentPage={pageNumber} totalPages={totalPages} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
