/**
 * Optimized Image Component with Cache Busting
 * Wrapper untuk Next.js Image dengan automatic cache busting
 */

"use client";

import Image, { ImageProps } from "next/image";
import { addCacheBusting } from "@/utils/cacheBusting";
import { useState } from "react";

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  enableCacheBusting?: boolean;
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  enableCacheBusting = true,
  fallbackSrc = "/images/placeholder.png",
  alt,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(
    enableCacheBusting ? addCacheBusting(src) : src
  );
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    console.warn(`[Image] Failed to load: ${src}`);
    setHasError(true);
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      // Force unoptimized untuk Supabase storage (bypass Next.js image optimization)
      unoptimized={src.includes('supabase.co')}
      // Add key untuk force re-render saat src berubah
      key={hasError ? 'fallback' : imgSrc}
    />
  );
}
