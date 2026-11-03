import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { ProductImage } from '@/components/common/ProductImage';
import { Badge } from '@/components/common/Badge';
import { AddToCartSection } from '@/components/product/AddToCartSection';
import { FlowerIcon, SparkleStar } from '@/components/common/DecorativeShapes';
import { ChevronRight, ShieldCheck, Droplet, Sparkles, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  let product;
  try {
    product = await api.getProductById(id);
  } catch (error) {
    notFound();
  }

  if (!product) {
    notFound();
  }

  const isAvailable = product.stock > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-semibold text-[#6E625F] overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-[#F08C75] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C9D5F5]" />
        <Link href="/products" className="hover:text-[#F08C75] transition-colors">
          Catalog
        </Link>
        {product.category && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#C9D5F5]" />
            <Link
              href={`/products?categoryId=${product.category.id}`}
              className="hover:text-[#F08C75] transition-colors"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-[#C9D5F5]" />
        <span className="text-[#2D2522] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main 2-Column Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Big Rounded Image Frame */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-square w-full rounded-[32px] overflow-hidden bg-white/70 border-3 border-[#C9D5F5] shadow-md p-4">
            <ProductImage
              imageUrl={product.imageUrl}
              alt={product.name}
              category={product.category?.name}
              priority
              className="rounded-[24px]"
            />

            {/* Badges Overlay */}
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
              {product.isBestSeller && (
                <Badge variant="hit" className="text-xs px-3 py-1 shadow-sm">
                  HIT BESTSELLER
                </Badge>
              )}
              {product.isNew && (
                <Badge variant="new" className="text-xs px-3 py-1 shadow-sm">
                  NEW ARRIVAL
                </Badge>
              )}
            </div>

            {/* Volume Overlay */}
            {product.volume && (
              <div className="absolute bottom-6 right-6 z-10 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-[#2D2522] border border-[#C9D5F5]">
                {product.volume}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Product Details & Add to Cart */}
        <div className="lg:col-span-6 space-y-6">
          {/* Brand & Category row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black uppercase tracking-wider text-[#F08C75] bg-[#F7A8C8]/30 px-3 py-1 rounded-full">
              {product.brand}
            </span>
            {product.category && (
              <span className="text-xs font-bold text-[#2D2522] bg-[#BFD4F7]/40 px-3 py-1 rounded-full">
                {product.category.name}
              </span>
            )}
            <span className="text-xs font-bold text-[#2D2522] bg-[#E9F2B9] px-3 py-1 rounded-full">
              For {product.skinType.toLowerCase()} skin
            </span>
          </div>

          {/* Product Title in Coral */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F08C75] tracking-tight leading-tight">
            {product.name}
          </h1>

          {/* Price & Stock Row */}
          <div className="flex items-baseline gap-4">
            <span className="text-3xl sm:text-4xl font-black text-[#2D2522]">
              {formatPrice(product.price)}
            </span>

            {/* Stock status pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold">
              {isAvailable ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Section (Interactive Client Component) */}
          <AddToCartSection product={product} />

          {/* Description Section */}
          <div className="space-y-2 pt-4 border-t-2 border-[#C9D5F5]/60">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#2D2522]">
              Description
            </h2>
            <p className="text-sm text-[#6E625F] leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Ingredients Section */}
          {product.ingredients && (
            <div className="space-y-2 pt-4 border-t-2 border-[#C9D5F5]/60">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#2D2522] flex items-center gap-2">
                <FlowerIcon className="w-4 h-4" petalColor="#F08C75" />
                <span>Full Ingredients List</span>
              </h2>
              <div className="bg-white/80 rounded-[20px] p-4 border border-[#C9D5F5] text-xs text-[#6E625F] leading-relaxed font-mono">
                {product.ingredients}
              </div>
            </div>
          )}

          {/* Guarantees Box */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t-2 border-[#C9D5F5]/60">
            <div className="bg-white/70 p-3.5 rounded-[18px] border border-[#C9D5F5] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E9F2B9] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#2D2522]" />
              </div>
              <span className="text-xs font-bold text-[#2D2522]">Dermatologist Tested</span>
            </div>
            <div className="bg-white/70 p-3.5 rounded-[18px] border border-[#C9D5F5] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F7A8C8] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#F08C75]" />
              </div>
              <span className="text-xs font-bold text-[#2D2522]">100% Vegan & Cruelty-Free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
