'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { resolveImageUrl } from '@/lib/utils';
import { PastelPlaceholder } from './PastelPlaceholder';

interface ProductImageProps {
  imageUrl?: string | null;
  alt: string;
  category?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function ProductImage({
  imageUrl,
  alt,
  category,
  fill = true,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: ProductImageProps) {
  const resolvedUrl = resolveImageUrl(imageUrl);
  const [hasError, setHasError] = useState(false);

  // If no image URL or failed to load, display the pastel placeholder
  if (!resolvedUrl || hasError) {
    return <PastelPlaceholder className={className} category={category} title={alt} />;
  }

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      {fill ? (
        <Image
          src={resolvedUrl}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onError={() => setHasError(true)}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <Image
          src={resolvedUrl}
          alt={alt}
          width={width || 300}
          height={height || 300}
          priority={priority}
          onError={() => setHasError(true)}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );
}
