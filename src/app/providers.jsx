'use client';

import { AuthProvider } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

/**
 * Client component that wraps all providers for the application
 * This helps avoid issues with SSR for components that use useLayoutEffect
 */
export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  // Effect to suppress useLayoutEffect warnings
  useEffect(() => {
    setMounted(true);
    
    // Suppress useLayoutEffect server warnings
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.('useLayoutEffect does nothing on the server')) {
        return;
      }
      originalError(...args);
    };
    
    return () => {
      console.error = originalError;
    };
  }, []);

  // On first render, don't render anything that might use useLayoutEffect
  // This prevents hydration issues with useLayoutEffect
  if (!mounted) {
    return null;
  }

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
} 