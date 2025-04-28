'use client';

import { AuthProvider } from "@/contexts/AuthContext";
import { useState, useEffect, createContext, useContext } from "react";

// Create a context to track if AuthProvider is already present higher in the tree
const AuthProviderContext = createContext(false);

export function useAuthProviderExists() {
  return useContext(AuthProviderContext);
}

/**
 * Client component that wraps all providers for the application
 * This helps avoid issues with SSR for components that use useLayoutEffect
 */
export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  // Effect to suppress useLayoutEffect warnings and handle mounting
  useEffect(() => {
    setMounted(true);
    
    // Suppress useLayoutEffect server warnings
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.('useLayoutEffect does nothing on the server') ||
          args[0]?.includes?.('hydration')) {
        return;
      }
      originalError(...args);
    };
    
    return () => {
      console.error = originalError;
    };
  }, []);

  // Use a consistent placeholder during SSR to prevent hydration mismatches
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <AuthProvider>
      <AuthProviderContext.Provider value={true}>
        {children}
      </AuthProviderContext.Provider>
    </AuthProvider>
  );
} 