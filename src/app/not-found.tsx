import Link from 'next/link';
import { FlowerIcon, CloudIcon } from '@/components/common/DecorativeShapes';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#BFD4F7]/40 rounded-full blur-xl" />
        <CloudIcon className="w-24 h-16 relative z-10" color="#F4A28C" />
        <FlowerIcon className="w-8 h-8 absolute top-2 right-4 z-20" petalColor="#F7A8C8" />
      </div>

      <span className="text-xs font-black uppercase tracking-wider text-[#F08C75] bg-[#F7A8C8]/30 px-3.5 py-1 rounded-full">
        404 Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D2522] mt-4 mb-3">
        Oops! This page drifted away
      </h1>

      <p className="text-sm text-[#6E625F] leading-relaxed mb-8">
        We couldn&apos;t find the formulation or page you were looking for. Let&apos;s get you back to safe, gentle skincare.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[#F4A28C] hover:bg-[#F08C75] text-white font-extrabold px-8 py-3.5 rounded-full text-xs shadow-md transition-transform active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}
