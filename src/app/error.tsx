'use client';

import React, { useEffect } from 'react';
import { FlowerIcon } from '@/components/common/DecorativeShapes';
import { RotateCcw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error boundary caught error:', error);
  }, [error]);

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-[#F7A8C8]/30 mx-auto flex items-center justify-center mb-6">
        <FlowerIcon className="w-10 h-10" petalColor="#F08C75" centerColor="#E9F2B9" />
      </div>

      <h2 className="text-2xl font-extrabold text-[#2D2522] mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-[#6E625F] mb-6">
        {error.message || 'We ran into a little hiccup loading this page.'}
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex items-center gap-2 bg-[#F4A28C] hover:bg-[#F08C75] text-white font-bold px-6 py-3 rounded-full text-xs shadow-md transition-transform active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </div>
  );
}
