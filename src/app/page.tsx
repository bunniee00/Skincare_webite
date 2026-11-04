import { api } from '@/lib/api';
import { HeroSection } from '@/components/home/HeroSection';
import { Marquee } from '@/components/common/Marquee';
import { BestsellersCarousel } from '@/components/home/BestsellersCarousel';
import { CategoryBento } from '@/components/home/CategoryBento';
import { About29 } from '@/components/about29';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch bestsellers from Spring Boot API (or fallback if offline)
  const bestsellers = await api.getBestsellers(8);

  return (
    <div className="flex flex-col">
      {/* 1. Hero with scalloped frame and periwinkle stripes */}
      <HeroSection />

      {/* 2. Scrolling marquee strip in pale lime */}
      <Marquee />

      {/* 3. Bestsellers carousel with arrow buttons */}
      <BestsellersCarousel products={bestsellers} />
         <About29 />
      {/* 4. Curated skincare category cards */}
      <CategoryBento />
    </div>
  );
}
