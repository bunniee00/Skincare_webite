'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { ProductImage } from './ProductImage';
import { Badge } from './Badge';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(prev => !prev);
  };

  return (
    <div
      className={`group relative flex h-full w-full min-w-0 flex-col justify-between rounded-[24px] bg-[#BFD4F7]/35 border-2 border-[#C9D5F5] p-3.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#F4A28C]/60 hover:bg-[#BFD4F7]/50 ${className}`}
    >
      {/* Clickable Image Container */}
      <Link
        href={`/products/${product.id}`}
        className="block relative w-full shrink-0 aspect-square rounded-[20px] overflow-hidden bg-white/70"
      >
        <ProductImage
          imageUrl={product.imageUrl}
          alt={product.name}
          category={product.category?.name}
        />

        {/* Top-Left: Heart */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center transition-transform active:scale-90 hover:scale-110 shadow-sm"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? 'fill-[#F0508A] text-[#F0508A]' : 'text-[#6E625F] hover:text-[#F0508A]'
            }`}
          />
        </button>

        {/* Top-Right: HIT or NEW */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 items-end pointer-events-none">
          {product.isBestSeller && (
            <Badge variant="hit" className="text-[11px] px-2.5 py-0.5">
              HIT
            </Badge>
          )}
          {product.isNew && !product.isBestSeller && (
            <Badge variant="new" className="text-[11px] px-2.5 py-0.5">
              NEW
            </Badge>
          )}
        </div>

        {/* Volume tag */}
        {product.volume && (
          <div className="absolute bottom-2.5 left-2.5 z-10 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-semibold text-[#6E625F]">
            {product.volume}
          </div>
        )}
      </Link>

      {/* Name bar */}
      <div className="mt-3 w-full bg-[#C9D5F5] rounded-[18px] p-3 flex items-center justify-between gap-2 border border-white/40">
        <Link
          href={`/products/${product.id}`}
          className="flex-1 min-w-0 pr-1 group-hover:opacity-90"
        >
          <div className="flex items-center gap-1.5 text-[11px] text-[#6E625F] font-medium truncate">
            <span className="truncate">{product.brand}</span>
            <span>•</span>
            <span className="capitalize">{product.skinType.toLowerCase()}</span>
          </div>
          <h3
            className="font-bold text-sm text-[#2D2522] truncate mt-0.5 hover:text-[#F08C75] transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-extrabold text-[#F08C75] text-base">
              {formatPrice(product.price)}
            </span>
          </div>
        </Link>

        {/* Quick add to cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm ${
            isAdded
              ? 'bg-[#E9F2B9] text-[#2D2522]'
              : 'bg-[#F4A28C] hover:bg-[#F08C75] text-white hover:scale-105'
          }`}
        >
          {isAdded ? <Check className="w-5 h-5 stroke-[2.5]" /> : <ShoppingBag className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}