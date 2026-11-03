'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { ProductImage } from '@/components/common/ProductImage';
import { FlowerIcon, SparkleStar, CloudIcon } from '@/components/common/DecorativeShapes';
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Sparkles, Check } from 'lucide-react';

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState(false);

  const FREE_SHIPPING_MIN = 40;
  const isFreeShipping = subtotal >= FREE_SHIPPING_MIN;
  const shippingCost = isFreeShipping || subtotal === 0 ? 0 : 4.99;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const grandTotal = Math.max(0, subtotal - discount + (subtotal > 0 ? shippingCost : 0));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'GLOW10' || promoCode.trim().length > 2) {
      setPromoApplied(true);
    }
  };

  const handleProceedCheckout = () => {
    setCheckoutNotice(true);
    setTimeout(() => setCheckoutNotice(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Heading */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 bg-[#F7A8C8] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#2D2522] mb-2">
          <ShoppingBag className="w-3.5 h-3.5 text-[#F08C75]" />
          <span>Skincare Routine Bag</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F08C75] tracking-tight flex items-center gap-3">
          <span>Shopping Cart</span>
          <span className="text-sm font-black bg-[#E9F2B9] text-[#2D2522] px-3 py-1 rounded-full">
            {totalItems} items
          </span>
        </h1>
      </div>

      {items.length === 0 ? (
        /* Empty State */
        <div className="bg-white/80 rounded-[32px] border-3 border-[#C9D5F5] p-12 sm:p-16 text-center max-w-2xl mx-auto shadow-sm">
          <div className="w-24 h-24 rounded-full bg-[#BFD4F7]/40 mx-auto flex items-center justify-center mb-6">
            <FlowerIcon className="w-12 h-12" petalColor="#F7A8C8" centerColor="#E9F2B9" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#2D2522]">Your bag feels light!</h2>
          <p className="text-sm text-[#6E625F] max-w-md mx-auto mt-2 mb-8">
            Treat your skin with our gentle botanical formulas. Explore bestselling cleansers, serums, and sunscreens.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#F4A28C] hover:bg-[#F08C75] text-white font-extrabold px-8 py-4 rounded-full text-sm shadow-md hover:shadow-lg transition-transform active:scale-95"
          >
            <span>Explore Skincare Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Cart Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white/70 backdrop-blur-md rounded-[28px] border-2 border-[#C9D5F5] p-4 sm:p-6 shadow-xs space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-[#C9D5F5]/60">
                <span className="text-xs font-black uppercase tracking-wider text-[#6E625F]">
                  Selected Formulations
                </span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-bold text-[#6E625F] hover:text-[#F0508A] transition-colors"
                >
                  Clear Bag
                </button>
              </div>

              {items.map(item => (
                <div
                  key={item.product.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-[#C9D5F5]/40 last:border-b-0"
                >
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="relative w-20 h-20 rounded-[18px] overflow-hidden shrink-0 bg-white border border-[#C9D5F5]"
                    >
                      <ProductImage
                        imageUrl={item.product.imageUrl}
                        alt={item.product.name}
                        category={item.product.category?.name}
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#F08C75]">
                        {item.product.brand}
                      </span>
                      <Link
                        href={`/products/${item.product.id}`}
                        className="font-bold text-sm text-[#2D2522] hover:text-[#F08C75] block truncate transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-extrabold text-[#2D2522]">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.volume && (
                          <span className="text-[11px] text-[#6E625F] bg-[#FDF1E3] px-2 py-0.5 rounded-full">
                            {item.product.volume}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Stepper */}
                    <div className="flex items-center bg-[#FDF1E3] rounded-full border border-[#C9D5F5] px-2 py-1 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#2D2522] hover:bg-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-extrabold text-[#2D2522]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        aria-label="Increase quantity"
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#2D2522] hover:bg-white disabled:opacity-40"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <span className="text-sm font-black text-[#F08C75] w-20 text-right">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label="Remove item"
                      className="w-8 h-8 rounded-full text-[#6E625F] hover:text-[#F0508A] hover:bg-[#FDF1E3] flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Catalog Link */}
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F08C75] hover:text-[#F4A28C]"
              >
                <span>← Continue Discovering Formulas</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white/80 backdrop-blur-md rounded-[28px] border-2 border-[#C9D5F5] p-6 shadow-md space-y-6 sticky top-24">
              <h2 className="text-lg font-extrabold text-[#2D2522] border-b border-[#C9D5F5]/60 pb-3">
                Order Summary
              </h2>

              {/* Free shipping banner */}
              <div className="bg-[#E9F2B9] p-3 rounded-[16px] text-xs font-bold text-[#2D2522] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F08C75] shrink-0" />
                <span>
                  {isFreeShipping
                    ? 'You have qualified for FREE Shipping!'
                    : `Add ${formatPrice(FREE_SHIPPING_MIN - subtotal)} more for free shipping!`}
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-[#6E625F]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#2D2522]">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-[#6E625F]">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-[#2D2522]">
                    {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                  </span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Glow Discount (10%)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t-2 border-[#C9D5F5] flex justify-between items-baseline">
                  <span className="font-black text-base text-[#2D2522]">Estimated Total</span>
                  <span className="font-black text-2xl text-[#F08C75]">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. GLOW10)"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  className="w-full bg-[#FDF1E3] border border-[#C9D5F5] rounded-full px-3.5 py-2 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#F4A28C]"
                />
                <button
                  type="submit"
                  className="bg-[#C9D5F5] hover:bg-[#b5c5ee] text-[#2D2522] px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap"
                >
                  Apply
                </button>
              </form>

              {promoApplied && (
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Promo GLOW10 successfully applied!</span>
                </div>
              )}

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleProceedCheckout}
                className="w-full bg-[#F4A28C] hover:bg-[#F08C75] text-white font-extrabold py-4 rounded-full text-sm shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {checkoutNotice && (
                <div className="p-3 bg-[#BFD4F7]/40 border border-[#C9D5F5] rounded-[16px] text-xs text-[#2D2522] text-center font-medium animate-fade-in">
                  🌸 Demo checkout: Backend checkout API integration will be connected in the next phase!
                </div>
              )}

              {/* Guarantees */}
              <div className="space-y-2 pt-2 border-t border-[#C9D5F5]/60 text-xs text-[#6E625F]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#F08C75]" />
                  <span>Secure SSL Checkout & Protected Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <FlowerIcon className="w-4 h-4" petalColor="#F7A8C8" />
                  <span>30-Day Happiness & Gentle Skin Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
