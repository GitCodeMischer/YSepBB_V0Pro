import React from 'react';
import { FaShieldHalved } from 'react-icons/fa6';
import Link from 'next/link';

export default function AuthLayout({ 
  children, 
  title, 
  subtitle,
  backgroundPattern = true,
  goBackLink 
}) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Background with grid */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[var(--background)] opacity-95"></div>
        
        {backgroundPattern && (
          <div className="absolute inset-0 grid-background"></div>
        )}
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[var(--primary)] to-transparent opacity-10 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[var(--accent-lime)] to-transparent opacity-10 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 pt-6 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <FaShieldHalved className="text-[var(--primary)] text-2xl mr-3" />
          <span className="text-2xl font-bold text-gradient-primary">YSepBB</span>
        </div>
        
        {goBackLink && (
          <Link 
            href={goBackLink.href} 
            className="text-[var(--muted-foreground)] hover:text-white transition-colors"
          >
            {goBackLink.label}
          </Link>
        )}
      </header>
      
      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full mx-auto glass-card p-8 rounded-3xl backdrop-blur-xl border border-[var(--card-border)]">
          {title && (
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
              {subtitle && (
                <p className="text-[var(--muted-foreground)]">{subtitle}</p>
              )}
            </div>
          )}
          
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-[var(--muted-foreground)] text-sm">
        <p>&copy; {new Date().getFullYear()} YSepBB. All rights reserved.</p>
      </footer>
    </div>
  );
} 