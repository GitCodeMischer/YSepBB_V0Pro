import React from 'react';
import Link from 'next/link';
import { FaTriangleExclamation, FaHouse, FaChevronRight } from 'react-icons/fa6';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Background with grid */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[var(--background)] opacity-95"></div>
        <div className="absolute inset-0 grid-background"></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[var(--danger)] to-transparent opacity-10 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-[var(--accent-lime)] to-transparent opacity-10 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-lg w-full mx-auto glass-card p-8 rounded-3xl backdrop-blur-xl border border-[var(--card-border)]">
          <div className="text-center">
            <div className="w-24 h-24 bg-[var(--danger)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTriangleExclamation className="text-[var(--danger)] text-4xl" />
            </div>
            
            <h1 className="text-6xl font-bold text-white mb-2 text-gradient-primary">404</h1>
            <h2 className="text-xl font-semibold text-white mb-4">Page Not Found</h2>
            <p className="text-[var(--muted-foreground)] mb-8">
              The page you are looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-2xl lime-btn"
              >
                <FaHouse />
                <span>Back to Home</span>
              </Link>
              
              <Link
                href="/finance-tracker/dashboard"
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-2xl glass-button"
              >
                <span>Go to Dashboard</span>
                <FaChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-[var(--muted-foreground)] text-sm">
        <p>&copy; {new Date().getFullYear()} YSepBB. All rights reserved.</p>
      </footer>
    </div>
  );
} 