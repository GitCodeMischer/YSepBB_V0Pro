'use client';

import React, { useState, useEffect } from 'react';

/**
 * A wrapper component for Recharts components to handle SSR
 * This dynamically imports Recharts components only on the client side
 * to avoid SSR warnings related to useLayoutEffect
 */
export default function ChartWrapper({ children }) {
  const [mounted, setMounted] = useState(false);

  // Ensure the component only renders on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions when on server
    return <div className="w-full h-80 bg-[#121212] rounded-lg animate-pulse"></div>;
  }

  return <>{children}</>;
} 