'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import SuppressWarningScript from '@/lib/suppressWarningScript';

// Dynamically import the suppression utility with no SSR
const SuppressUseLayoutEffectWarning = dynamic(
  () => import("@/lib/suppressUseLayoutEffectWarning"),
  { ssr: false }
);

/**
 * Client component wrapper that handles:
 * 1. Immediate script injection to suppress warnings before React loads
 * 2. Dynamic loading of the suppression utility after React loads
 */
export default function SuppressWarningWrapper({ children }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <>
      {/* Script runs immediately to suppress warnings */}
      <SuppressWarningScript />
      
      {/* Component runs after mount to add additional suppression */}
      {mounted && <SuppressUseLayoutEffectWarning />}
      
      {/* Application content */}
      {children}
    </>
  );
} 