'use client';

import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Check, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface AddToCartSectionProps {
  product: Product;
}

export function AddToCartSection({ product }: AddToCartSectionProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsCartOpen(true); // open drawer for instant gratification!
    }, 600);
  };

  return (
    <div className="space-y-4 pt-4 border-t-2 border-[#C9D5F5]/60">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Quantity Controls */}
        <div className="flex items-center justify-between sm:justify-start bg-white rounded-full border-2 border-[#C9D5F5] px-2 py-1.5 shadow-xs">
          <button
            type="button"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            disabled={isOutOfStock || quantity <= 1}
            aria-label="Decrease quantity"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#2D2522] hover:bg-[#FDF1E3] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-extrabold text-sm text-[#2D2522]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
            disabled={isOutOfStock || quantity >= product.stock}
            aria-label="Increase quantity"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#2D2522] hover:bg-[#FDF1E3] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`flex-1 py-3.5 px-6 rounded-full font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
            isOutOfStock
              ? 'bg-[#6E625F]/20 text-[#6E625F] cursor-not-allowed'
              : isAdded
              ? 'bg-[#E9F2B9] text-[#2D2522] scale-102'
              : 'bg-[#F4A28C] hover:bg-[#F08C75] text-white hover:shadow-lg'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>Added to Bag!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              <span>{isOutOfStock ? 'Sold Out' : 'Add to Bag'}</span>
            </>
          )}
        </button>

        {/* Wishlist toggle */}
        <button
          type="button"
          onClick={() => setIsWishlisted(w => !w)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="w-12 h-12 rounded-full bg-white border-2 border-[#C9D5F5] hover:border-[#F4A28C] flex items-center justify-center transition-colors shadow-xs shrink-0 self-center"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isWishlisted
                ? 'fill-[#F0508A] text-[#F0508A]'
                : 'text-[#6E625F] hover:text-[#F0508A]'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
