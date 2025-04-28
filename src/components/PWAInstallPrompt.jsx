'use client';

import React, { useState, useEffect } from 'react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install button
      setShowInstallButton(true);
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      // Clear the deferredPrompt
      setDeferredPrompt(null);
      // Hide the install button
      setShowInstallButton(false);
      // Set installed state
      setIsInstalled(true);
      console.log('PWA was installed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', () => {});
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We no longer need the prompt. Clear it
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton || isInstalled) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 p-4 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-xl shadow-lg max-w-xs">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="font-semibold text-white text-lg">Install YSepBB</h3>
        </div>
        <p className="text-white/80 text-sm">Install our app for a better experience with offline access</p>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowInstallButton(false)}
            className="flex-1 py-2 px-3 text-sm rounded-lg bg-white/10 text-white/80 hover:bg-white/20 transition"
          >
            Not now
          </button>
          <button 
            onClick={handleInstallClick}
            className="flex-1 py-2 px-3 text-sm rounded-lg bg-white text-[var(--primary)] font-medium hover:bg-white/90 transition"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
} 