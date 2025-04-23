'use client';

import { useEffect } from 'react';

/**
 * This module helps prevent React's useLayoutEffect SSR warnings.
 * It works by patching React in the client browser environment.
 */
function applyPatches() {
  // Only execute in browser environment
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Only apply in development mode where the warnings appear
    if (process.env.NODE_ENV === 'development') {
      // Force React to use our polyfill for useLayoutEffect in development
      // This is a safe operation as we're only doing it on the client
      try {
        // We can't modify React's internal useLayoutEffect directly,
        // but we can suppress the console warning from appearing
        const originalError = console.error;
        console.error = (...args) => {
          if (args[0] && typeof args[0] === 'string' && 
              args[0].includes('useLayoutEffect does nothing on the server')) {
            // Suppress useLayoutEffect warning
            return;
          }
          originalError.apply(console, args);
        };
      } catch (e) {
        console.log('Failed to suppress useLayoutEffect warnings', e);
      }
    }
  }
}

/**
 * Component that applies the patches when mounted on the client
 */
export default function SuppressUseLayoutEffectWarning() {
  useEffect(() => {
    applyPatches();
  }, []);
  
  return null;
} 