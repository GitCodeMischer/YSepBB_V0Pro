import React, { useState, useEffect } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import dynamic from 'next/dynamic';

// Dynamically import PWA components to avoid SSR issues
const PWAInstallPrompt = dynamic(() => import('./PWAInstallPrompt'), {
  ssr: false
});

const ServiceWorkerUpdateNotification = dynamic(
  () => import('./ServiceWorkerUpdateNotification'),
  { ssr: false }
);

export default function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Default to collapsed on mobile
  
  // Listen for sidebar state changes
  useEffect(() => {
    const handleSidebarCollapse = (e) => {
      if (e.detail && typeof e.detail.isCollapsed !== 'undefined') {
        setSidebarCollapsed(e.detail.isCollapsed);
      }
    };
    
    window.addEventListener('sidebar-collapsed-state-changed', handleSidebarCollapse);
    return () => {
      window.removeEventListener('sidebar-collapsed-state-changed', handleSidebarCollapse);
    };
  }, []);
  
  return (
    <div className="flex min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'md:ml-28' : 'md:ml-72'}`}>
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden mt-20 pt-4 pb-10 px-4 md:px-6">
          {children}
        </main>
      </div>
      <PWAInstallPrompt />
      <ServiceWorkerUpdateNotification />
    </div>
  );
} 