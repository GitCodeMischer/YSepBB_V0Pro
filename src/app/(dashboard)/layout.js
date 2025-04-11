'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHouse, 
  FaChartPie, 
  FaWallet, 
  FaGear, 
  FaRegBell,
  FaRegNoteSticky,
  FaTableColumns,
  FaRobot,
  FaCodeBranch,
  FaStar,
  FaBuilding,
  FaHandshake,
  FaComments,
  FaBars,
  FaXmark,
  FaCaretLeft
} from 'react-icons/fa6';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  
  // Handle window resize for responsive behavior
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      
      // Auto-collapse sidebar on tablet
      if (width >= 768 && width < 1024) {
        setCollapsed(true);
      } else if (width >= 1024) {
        setCollapsed(false);
      }
    };

    // Set initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close mobile menu when window is resized to desktop
  React.useEffect(() => {
    if (windowWidth >= 768 && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [windowWidth, mobileMenuOpen]);

  const navItems = [
    { href: '/dashboard', icon: <FaHouse size={16} />, label: 'Dashboard' },
    { href: '/portfolio', icon: <FaWallet size={16} />, label: 'Portfolio' },
    { href: '/analytics', icon: <FaChartPie size={16} />, label: 'Analytics' },
    { href: '/settings', icon: <FaGear size={16} />, label: 'Settings' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      {/* Mobile Header */}
      <header className="md:hidden h-16 bg-[var(--card-bg)]/30 border-b border-[var(--card-border)]/30 backdrop-blur-2xl flex items-center justify-between px-4 sticky top-0 z-30">
        <button
          onClick={toggleMobileMenu}
          className="w-10 h-10 rounded-2xl bg-[var(--muted)]/30 text-[var(--muted-foreground)] hover:text-white flex items-center justify-center"
        >
          {mobileMenuOpen ? <FaXmark size={18} /> : <FaBars size={18} />}
        </button>
        
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-bold text-white">YSep<span className="text-[var(--primary)]">BB</span></h1>
        </div>
        
        <div className="w-8 h-8 rounded-2xl overflow-hidden border border-[var(--card-border)]/30 shadow-lg shadow-[#50E3C280]">
          <img
            src="https://i.pravatar.cc/100?img=8"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-[var(--card-bg)]/30 border-r border-[var(--card-border)]/30 backdrop-blur-2xl z-50 w-64 md:hidden transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 pt-6">
          {/* Logo */}
          <div className="mb-8 flex items-center">
            <h1 className="text-xl font-bold text-white">YSep<span className="text-[var(--primary)]">BB</span></h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center p-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                  pathname === item.href
                    ? 'bg-[var(--muted)] bg-opacity-30 text-white shadow-lg shadow-[#50E3C280]'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:bg-opacity-20 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {/* Active Border */}
                {pathname === item.href && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-[#50E3C280]" />
                )}
                <div className={`w-6 h-6 flex items-center justify-center rounded-xl ${
                  pathname === item.href 
                    ? 'bg-[var(--primary)]/30 shadow-inner' 
                    : ''
                }`}>
                  {item.icon}
                </div>
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-64'} hidden md:block fixed h-screen bg-[var(--card-bg)]/30 border-r border-[var(--card-border)]/30 backdrop-blur-2xl transition-all duration-300 z-30`}>
        <div className="p-4">
          {/* Logo */}
          <div className="mb-8 flex items-center">
            {!collapsed ? (
              <h1 className="text-xl font-bold text-white">YSep<span className="text-[var(--primary)]">BB</span></h1>
            ) : (
              <div className="w-8 h-8 bg-[var(--primary)] rounded-2xl flex items-center justify-center shadow-lg shadow-[#50E3C280]">
                <span className="font-bold text-black">Y</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center p-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                  pathname === item.href
                    ? 'bg-[var(--muted)] bg-opacity-30 text-white shadow-lg shadow-[#50E3C280]'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:bg-opacity-20 hover:text-white'
                }`}
              >
                {/* Active Border */}
                {pathname === item.href && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-[#50E3C280]" />
                )}
                <div className={`w-6 h-6 flex items-center justify-center rounded-xl ${
                  pathname === item.href 
                    ? 'bg-[var(--primary)]/30 shadow-inner' 
                    : ''
                }`}>
                  {item.icon}
                </div>
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${collapsed ? 'md:ml-16' : 'md:ml-64'} transition-all duration-300`}>
        {/* Desktop Header */}
        <header className="hidden md:flex h-16 bg-[var(--card-bg)]/30 border-b border-[var(--card-border)]/30 backdrop-blur-2xl items-center justify-between px-6 sticky top-0 z-20">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-8 h-8 rounded-2xl bg-[var(--muted)]/30 text-[var(--muted-foreground)] hover:text-white hover:shadow-lg shadow-[#50E3C280] border border-[#50E3C280] transition-all duration-300"
          >
            <FaCaretLeft className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex items-center space-x-4">
            <button className="w-8 h-8 rounded-2xl bg-[var(--muted)]/30 text-[var(--muted-foreground)] hover:text-white hover:shadow-lg shadow-[#50E3C280] border border-[#50E3C280] transition-all duration-300 flex items-center justify-center">
              <FaRegBell />
            </button>
            <div className="w-8 h-8 rounded-2xl overflow-hidden border border-[var(--card-border)]/30 shadow-lg shadow-[#50E3C280]">
              <img
                src="https://i.pravatar.cc/100?img=8"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 