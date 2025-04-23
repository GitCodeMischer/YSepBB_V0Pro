'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

/**
 * Custom error component for handling rendering errors
 * Specifically designed to handle useLayoutEffect SSR issues
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="bg-[#121212] p-8 rounded-xl max-w-lg w-full border border-[#222]">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-red-500 text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-gray-400 mb-6">
            We&apos;ve encountered an error while rendering this page.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => reset()}
              className="py-2 px-4 bg-[#222] hover:bg-[#333] transition-colors rounded-lg text-white flex-1"
            >
              Try again
            </button>
            <Link
              href="/finance-tracker/dashboard"
              className="py-2 px-4 bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black font-medium rounded-lg text-center flex-1"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 