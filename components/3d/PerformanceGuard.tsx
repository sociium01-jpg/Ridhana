"use client";

import { useEffect, useState } from "react";

interface PerformanceGuardProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

/**
 * Detects low-end devices using hardware concurrency + deviceMemory heuristics.
 * On low-end devices or when prefers-reduced-motion is enabled, renders the fallback
 * instead of the 3D canvas.
 */
export default function PerformanceGuard({
  children,
  fallback,
}: PerformanceGuardProps) {
  const [shouldRender3D, setShouldRender3D] = useState<boolean | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setShouldRender3D(false);
      return;
    }

    // Hardware heuristics
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as unknown as Record<string, number>).deviceMemory ?? 4;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const isLowEnd = cores < 4 || memory < 2;

    // Also check WebGL support
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") || canvas.getContext("webgl");

    if (!gl || (isMobile && isLowEnd)) {
      setShouldRender3D(false);
    } else {
      setShouldRender3D(true);
    }
  }, []);

  // While determining, render nothing (brief flash prevention)
  if (shouldRender3D === null) return null;

  return shouldRender3D ? <>{children}</> : <>{fallback}</>;
}
