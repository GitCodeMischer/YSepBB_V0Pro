'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * A wrapper component that ensures content is only rendered on the client-side
 * This helps avoid hydration errors with components that use useLayoutEffect
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to render
 * @param {React.ReactNode} props.fallback - Optional fallback UI while loading
 * @returns {React.ReactNode}
 */
export default function SafeHydration({ children, fallback }) {
  const [isMounted, setIsMounted] = useState(false);
  const isFirstRender = useRef(true);

  // Only run on the client
  useEffect(() => {
    // First client-side render has happened
    isFirstRender.current = false;
    setIsMounted(true);

    // Cleanup
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Only render the content on the client to avoid hydration mismatch
  // Use a key to ensure a fresh render after hydration
  if (!isMounted) {
    return fallback || null;
  }

  return (
    <div key={isFirstRender.current ? 'hydrating' : 'hydrated'}>
      {children}
    </div>
  );
} 