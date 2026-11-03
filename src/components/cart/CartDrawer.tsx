'use client';

import React from 'react';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { ProductImage } from '@/components/common/ProductImage';
import { FlowerIcon } from '@/components/common/DecorativeShapes';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 40;
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2D2522]/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDF1E3] shadow-2xl flex flex-col border-l-4 border-[#C9D5F5] rounded-l-[32px] overflow-hidden">
          {/* Drawer Header */}
          <div className="bg-[#F4A28C] p-5 flex items-center justify-between text-white border-b-2 border-white/40">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              <h2 className="text-lg font-extrabold tracking-tight">Your Skincare Bag</h2>
              <span className="bg-white text-[#F08C75] text-xs font-bold px-2.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#E9F2B9] px-5 py-3 border-b border-[#d2df98]">
            <div className="flex justify-between items-center text-xs font-bold text-[#2D2522] mb-1.5">
              <span>
                {remainingForFreeShipping > 0
                  ? `Add ${formatPrice(remainingForFreeShipping)} more for FREE shipping!`
                  : '🎉 You have unlocked FREE shipping!'}
              </span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-white rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#F08C75] h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-[#BFD4F7]/40 flex items-center justify-center mb-4">
                  <FlowerIcon className="w-10 h-10" petalColor="#F7A8C8" centerColor="#E9F2B9" />
                </div>
                <h3 className="font-bold text-lg text-[#2D2522]">Your bag is currently empty</h3>
                <p className="text-xs text-[#6E625F] max-w-xs mt-1 mb-6">
                  Explore our gentle, clean formulas and add your dream skincare routine.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#F4A28C] hover:bg-[#F08C75] text-white font-bold px-6 py-2.5 rounded-full text-sm transition-transform active:scale-95"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-[20px] p-3 border-2 border-[#C9D5F5] flex gap-3 items-center shadow-xs"
                >
                  {/* Thumbnail */}
                  <div className="relative w-18 h-18 rounded-[16px] overflow-hidden shrink-0 bg-[#BFD4F7]/30">
                    <ProductImage
                      imageUrl={item.product.imageUrl}
                      alt={item.product.name}
                      category={item.product.category?.name}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#6E625F] font-semibold uppercase">
                      {item.product.brand}
                    </span>
                    <h4 className="text-xs font-bold text-[#2D2522] truncate" title={item.product.name}>
                      {item.product.name}
                    </h4>
                    <span className="text-xs font-extrabold text-[#F08C75]">
                      {formatPrice(item.product.price)}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center bg-[#FDF1E3] rounded-full border border-[#C9D5F5] px-1 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[#2D2522] hover:bg-[#C9D5F5]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[#2D2522] hover:bg-[#C9D5F5]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="w-8 h-8 rounded-full text-[#6E625F] hover:text-[#F0508A] hover:bg-[#FDF1E3] flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Subtotal & Actions */}
          {items.length > 0 && (
            <div className="bg-white p-5 border-t-2 border-[#C9D5F5] space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-[#6E625F]">Subtotal:</span>
                <span className="font-extrabold text-lg text-[#F08C75]">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-[11px] text-[#6E625F]">
                Taxes & shipping calculated at checkout.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center py-2.5 rounded-full font-bold text-xs bg-[#C9D5F5] hover:bg-[#b8c9f3] text-[#2D2522] transition-colors"
                >
                  View Full Bag
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center py-2.5 rounded-full font-bold text-xs bg-[#F4A28C] hover:bg-[#F08C75] text-white flex items-center justify-center gap-1 transition-transform active:scale-95"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
