'use client';

import React, { useState, useEffect } from 'react';

export default function ServiceWorkerUpdateNotification() {
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    // Only run on the client side
    if (typeof window === 'undefined' || !navigator.serviceWorker) {
      return;
    }

    // Check for service worker updates
    const checkForUpdates = () => {
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.getRegistration().then((reg) => {
          if (reg) {
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New service worker is installed but waiting to activate
                    setShowUpdateNotification(true);
                    setRegistration(reg);
                  }
                });
              }
            });
          }
        });
      }
    };

    // Initial check and set up periodic checks
    checkForUpdates();
    const intervalId = setInterval(checkForUpdates, 60 * 60 * 1000); // Check every hour

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleUpdate = () => {
    if (registration && registration.waiting) {
      // Send message to service worker to skip waiting and activate the new version
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      setShowUpdateNotification(false);
      
      // Reload the page to use the new version
      window.location.reload();
    }
  };

  if (!showUpdateNotification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg max-w-xs">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 className="font-medium text-white">Update Available</h3>
        </div>
        <p className="text-white/70 text-sm">A new version of YSepBB is available. Update now for the latest features and improvements.</p>
        <div className="flex gap-2 mt-1">
          <button 
            onClick={() => setShowUpdateNotification(false)}
            className="flex-1 py-1.5 px-3 text-xs rounded-md bg-white/10 text-white/80 hover:bg-white/20 transition"
          >
            Not now
          </button>
          <button 
            onClick={handleUpdate}
            className="flex-1 py-1.5 px-3 text-xs rounded-md bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-dark)] transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
} 