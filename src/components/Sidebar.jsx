import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHouse, 
  FaChartPie, 
  FaWallet, 
  FaChevronDown, 
  FaGear, 
  FaRegBell,
  FaRegNoteSticky,
  FaTableColumns,
  FaRobot,
  FaStar,
  FaBuilding,
  FaHandshake,
  FaComments,
  FaBars,
  FaXmark,
  FaCaretLeft,
  FaServer,
  FaChartLine,
  FaUsers,
  FaShuffle,
  FaUser,
  FaBriefcase,
  FaShield,
  FaBell,
  FaMessage,
  FaFileImport
} from 'react-icons/fa6';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [hoverMenu, setHoverMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [serverOnline, setServerOnline] = useState(true);
  const [themeMode, setThemeMode] = useState('dark');
  const [frontendVersion, setFrontendVersion] = useState('v2.0');
  
  const sidebarRef = useRef(null);
  const submenuTimerRef = useRef(null);
  
  // Detect current route and set active menu
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      
      // Find the matching menu and submenu from the current path
      for (const menu of menuItems) {
        // Check if path is in this menu's route
        if (menu.path && pathname === menu.path) {
          setActiveMenu(menu.id);
          break;
        }
        
        // Check subItems
        if (menu.subItems && menu.subItems.length > 0) {
          const matchingSubItem = menu.subItems.find(subItem => 
            subItem.path && pathname.includes(subItem.path)
          );
          
          if (matchingSubItem) {
            setActiveMenu(menu.id);
            setOpenSubmenu(menu.id);
            break;
          }
        }
      }
    }
  }, []);
  
  // Add a useEffect to update activeMenu when URL changes
  useEffect(() => {
    const handleRouteChange = () => {
      const pathname = window.location.pathname;
      
      // Find the matching menu and submenu from the current path
      let found = false;
      for (const menu of menuItems) {
        // Check if path is in this menu's route
        if (menu.path && pathname === menu.path) {
          setActiveMenu(menu.id);
          found = true;
          break;
        }
        
        // Check subItems
        if (menu.subItems && menu.subItems.length > 0) {
          const matchingSubItem = menu.subItems.find(subItem => 
            subItem.path && pathname.includes(subItem.path)
          );
          
          if (matchingSubItem) {
            setActiveMenu(menu.id);
            setOpenSubmenu(menu.id);
            found = true;
            break;
          }
        }
      }
    };
    
    // Initial call
    handleRouteChange();
    
    // Add event listener for popstate
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);
  
  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1280);
      
      // Auto-collapse sidebar on tablet
      if (width >= 768 && width < 1280) {
        setCollapsed(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);
  
  // Mock server status check
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        // This would be replaced with your actual API endpoint check
        // const response = await fetch('/api/health');
        // setServerOnline(response.ok);
        setServerOnline(true);
      } catch (error) {
        setServerOnline(false);
      }
    };
    
    checkServerStatus();
    const interval = setInterval(checkServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    // Add the CSS for the pulse animation and other effects
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(80, 227, 194, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(80, 227, 194, 0); }
        100% { box-shadow: 0 0 0 0 rgba(80, 227, 194, 0); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .sidebar-glass {
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3), 
                    0 1px 3px rgba(0, 0, 0, 0.1), 
                    inset 0 1px 1px rgba(255, 255, 255, 0.03);
      }
      
      .menu-item-hover {
        transition: all 0.3s ease;
      }
      
      .menu-item-hover:hover {
        background: rgba(80, 227, 194, 0.05);
        transform: translateX(4px);
      }
      
      .active-indicator {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 3px;
        background: linear-gradient(180deg, #50E3C2 0%, #50E3C2 100%);
        border-radius: 0 4px 4px 0;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .active-menu .active-indicator {
        opacity: 1;
      }
      
      .server-pulse {
        animation: pulse 2s infinite;
      }
      
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
      .neo-shadow {
        box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3), 
                    0 1px 3px rgba(0, 0, 0, 0.1);
      }
      
      .submenu-animation {
        animation: fadeIn 0.2s ease-out forwards;
      }
      
      .sidebar-divider {
        height: 1px;
        background: linear-gradient(90deg, rgba(80, 227, 194, 0) 0%, rgba(80, 227, 194, 0.1) 50%, rgba(80, 227, 194, 0) 100%);
        margin: 10px 0;
      }
      
      .glowing-border {
        box-shadow: 0 0 5px rgba(80, 227, 194, 0.5), 
                   inset 0 0 5px rgba(80, 227, 194, 0.2);
      }
      
      .hover-scale {
        transition: transform 0.2s ease;
      }
      
      .hover-scale:hover {
        transform: scale(1.05);
      }
      
      .clickable-logo {
        position: relative;
        transition: all 0.3s ease;
        overflow: hidden;
      }
      
      .clickable-logo::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%);
        transform: translateX(-100%);
        transition: transform 0.6s ease;
      }
      
      .clickable-logo:hover::before {
        transform: translateX(100%);
      }
      
      .clickable-logo:active {
        transform: scale(0.95);
      }

      @media (max-width: 767px) {
        .floating-sidebar {
          left: 0.75rem !important;
          bottom: 0.75rem !important;
          top: 4.5rem !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const toggleServerStatus = () => {
    setServerOnline(!serverOnline);
  };
  
  const toggleSubmenu = (id) => {
    if (openSubmenu === id) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(id);
    }
  };
  
  const handleMenuHover = (id) => {
    clearTimeout(submenuTimerRef.current);
    setHoverMenu(id);
  };
  
  const handleMenuLeave = () => {
    submenuTimerRef.current = setTimeout(() => {
      setHoverMenu(null);
    }, 300);
  };
  
  const toggleTheme = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };
  
  const handleMenuClick = (id, subItemId = null) => {
    setActiveMenu(id);
    
    // Find the menu item by id
    const menuItem = menuItems.find(item => item.id === id);
    
    // If the menu has subitems, open the submenu
    if (menuItem && menuItem.subItems && menuItem.subItems.length > 0) {
      setOpenSubmenu(id);
      
      // If a specific subitem was clicked, we could track that too
      if (subItemId) {
        // Here you could set an active subitem state if needed
        console.log('Submenu item clicked:', subItemId);
      }
    }
  };
  
  // Function to handle navigation
  const handleNavigation = (path) => {
    // In a real application, you would use a router to navigate
    // For example with react-router: navigate(path)
    console.log('Navigating to:', path);
    // You can replace this with actual navigation code
    window.location.href = path;
  };
  
  const menuItems = [
    { 
      id: 'dashboard', 
      icon: <FaHouse size={18} />, 
      label: 'Dashboard',
      subItems: [],
      path: '/finance-tracker/dashboard'
    },
    { 
      id: 'quick-overview', 
      icon: <FaChartPie size={18} />, 
      label: 'Quick Overview',
      subItems: [
        { id: 'account-balances', label: 'Account Balances', icon: <FaWallet size={14} />, path: '/finance-tracker/quick-overview/account-balances' },
        { id: 'budget-overview', label: 'Budget Overview', icon: <FaChartLine size={14} />, path: '/finance-tracker/quick-overview/budget-overview' },
        { id: 'recent-transactions', label: 'Recent Transactions', icon: <FaRegNoteSticky size={14} />, path: '/finance-tracker/quick-overview/recent-transactions' },
        { id: 'spending-by-category', label: 'Spending by Category', icon: <FaTableColumns size={14} />, path: '/finance-tracker/quick-overview/spending-by-category' },
        { id: 'total-spending', label: 'Total Spending', icon: <FaChartPie size={14} />, path: '/finance-tracker/quick-overview/total-spending' }
      ]
    },
    { 
      id: 'cashflow', 
      icon: <FaRegNoteSticky size={18} />, 
      label: 'Cashflow',
      subItems: [
        { id: 'income', label: 'Income', icon: <FaChartLine size={14} />, path: '/finance-tracker/cashflow/income' },
        { id: 'expenses', label: 'Expenses', icon: <FaWallet size={14} />, path: '/finance-tracker/cashflow/expenses' }
      ]
    },
    { 
      id: 'transactions', 
      icon: <FaTableColumns size={18} />, 
      label: 'Transactions',
      subItems: [
        { id: 'all', label: 'All Transactions', icon: <FaRegNoteSticky size={14} />, path: '/finance-tracker/transactions/all' },
        { id: 'loop', label: 'Loop Transactions', icon: <FaShuffle size={14} />, path: '/finance-tracker/transactions/loop-transactions' }
      ]
    },
    { 
      id: 'planning', 
      icon: <FaChartLine size={18} />, 
      label: 'Planning & Subscriptions',
      subItems: [
        { id: 'budget-plan', label: 'Budget Plan', icon: <FaRegNoteSticky size={14} />, path: '/finance-tracker/planning-and-subscriptions/budget-plan' },
        { id: 'planned-payments', label: 'Planned Payments', icon: <FaRegBell size={14} />, path: '/finance-tracker/planning-and-subscriptions/planned-payments' },
        { id: 'subscriptions', label: 'Subscriptions', icon: <FaRegBell size={14} />, path: '/finance-tracker/planning-and-subscriptions/subscriptions' }
      ]
    },
    { 
      id: 'portfolio', 
      icon: <FaWallet size={18} />, 
      label: 'Portfolio',
      subItems: [
        { id: 'accounts', label: 'Accounts', icon: <FaWallet size={14} />, path: '/finance-tracker/portfolio/accounts' },
        { id: 'crypto', label: 'Crypto', icon: <FaWallet size={14} />, path: '/finance-tracker/portfolio/crypto' },
        { id: 'stocks', label: 'Stocks & Funds', icon: <FaChartLine size={14} />, path: '/finance-tracker/portfolio/stocks-and-funds' }
      ]
    },
    { 
      id: 'statistics', 
      icon: <FaChartPie size={18} />, 
      label: 'Statistics',
      subItems: [
        { id: 'ai-optimization', label: 'AI Optimization', icon: <FaRobot size={14} />, path: '/finance-tracker/statistics/ai-optimization' },
        { id: 'budget-plan-stats', label: 'Budget Plan Stats', icon: <FaChartLine size={14} />, path: '/finance-tracker/statistics/budget-plan-stats' },
        { id: 'planned-payments-stats', label: 'Planned Payments Stats', icon: <FaChartLine size={14} />, path: '/finance-tracker/statistics/planned-payments-stats' },
        { id: 'subscriptions-stats', label: 'Subscriptions Stats', icon: <FaChartLine size={14} />, path: '/finance-tracker/statistics/subscriptions-stats' }
      ]
    }
  ];
  
  const favoriteItems = [
    { id: 'design-project', icon: <FaStar size={14} className="text-[#50E3C2]" />, label: 'Design Project' },
    { id: 'seo-automation', icon: <FaStar size={14} className="text-[#50E3C2]" />, label: 'SEO Automation' },
    { id: 'email-marketing', icon: <FaStar size={14} className="text-[#50E3C2]" />, label: 'Email Marketing' }
  ];
  
  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    // Dispatch an event with the new state
    window.dispatchEvent(new CustomEvent('sidebar-state-changed', { 
      detail: { isOpen: newState } 
    }));
  };
  
  // Make toggleMobileMenu accessible to Header component
  useEffect(() => {
    window.toggleSidebar = toggleMobileMenu;
    return () => {
      delete window.toggleSidebar;
    };
  }, []);
  
  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    
    // Dispatch an event with the new collapsed state
    window.dispatchEvent(new CustomEvent('sidebar-collapsed-state-changed', { 
      detail: { isCollapsed: newState } 
    }));
  };
  
  // Sidebar content shared across mobile and desktop
  const SidebarContent = ({ isInMobileView = false }) => {
    const sidebarWidth = collapsed && !isInMobileView ? 'w-20' : 'w-64';
    
    return (
      <div 
        className={`${isInMobileView ? 'h-screen' : 'h-[calc(100vh-2rem)]'} ${sidebarWidth} transition-all duration-300 ease-in-out bg-[#0A0A0A]/60 sidebar-glass ${isInMobileView ? '' : 'fixed top-4 left-4 bottom-4 z-30'} floating-sidebar rounded-2xl border border-[#222]/60 flex flex-col neo-shadow overflow-hidden`}
      >
        {/* Logo */}
        <div className={`py-6 ${collapsed && !isInMobileView ? 'px-4' : 'px-6'} flex items-center`}>
          {(!collapsed || isInMobileView) ? (
            <div className="flex items-center">
              <div 
                onClick={!isInMobileView ? toggleCollapse : undefined}
                className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#50E3C2] to-[#3CCEA7] flex items-center justify-center shadow-lg mr-3 cursor-pointer transition-all duration-200 hover:shadow-[0_0_15px_rgba(80,227,194,0.4)] hover:scale-105 clickable-logo"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <span className="font-bold text-black text-xl">Y</span>
                {!isInMobileView && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-[6px] text-black font-bold">
                      {collapsed ? "+" : "-"}
                    </span>
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">YSep<span className="text-[#50E3C2]">BB</span></h1>
                <p className="text-xs text-gray-400">Balance Beam</p>
              </div>
            </div>
          ) : (
            <div className="mx-auto">
              <div 
                onClick={toggleCollapse}
                className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#50E3C2] to-[#3CCEA7] flex items-center justify-center shadow-lg cursor-pointer transition-all duration-200 hover:shadow-[0_0_15px_rgba(80,227,194,0.4)] hover:scale-105 clickable-logo"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <span className="font-bold text-black text-xl">Y</span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-[6px] text-black font-bold">
                    {collapsed ? "+" : "-"}
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Search */}
        {(!collapsed || isInMobileView) && (
          <div className="px-6 mb-6">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-[#111]/50 backdrop-blur-md border border-[#222]/60 focus:border-[#50E3C2]/60 rounded-xl py-2.5 pl-4 pr-10 text-sm focus:outline-none transition-all duration-200 text-gray-300 placeholder-gray-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-[#50E3C2] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {/* Main navigation */}
        <div 
          className="flex-grow overflow-y-auto hide-scrollbar px-3"
          ref={sidebarRef}
        >
          {(!collapsed || isInMobileView) && (
            <div className="mb-2 px-3">
              <h2 className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Main Menu</h2>
            </div>
          )}
          
          <div className="space-y-1">
            {menuItems.map((item) => (
              <div 
                key={item.id}
                className="relative"
                onMouseEnter={() => collapsed && !isInMobileView && handleMenuHover(item.id)}
                onMouseLeave={() => collapsed && !isInMobileView && handleMenuLeave()}
              >
                <div 
                  className={`
                    relative flex items-center ${!collapsed || isInMobileView ? 'pl-3 pr-3 py-2.5' : 'justify-center py-3'} 
                    rounded-xl menu-item-hover cursor-pointer group
                    ${activeMenu === item.id || (typeof window !== 'undefined' && item.subItems.some(subItem => window.location.pathname.includes(subItem.path))) 
                      ? 'active-menu text-white bg-[#131313]' 
                      : 'text-gray-400'}
                  `}
                  onClick={() => {
                    handleMenuClick(item.id);
                    if (item.path) {
                      handleNavigation(item.path);
                    }
                    if (item.subItems.length > 0 && (!collapsed || isInMobileView)) {
                      toggleSubmenu(item.id);
                    }
                  }}
                >
                  <div className="active-indicator"></div>
                  
                  <div className={`
                    ${activeMenu === item.id || (typeof window !== 'undefined' && item.subItems.some(subItem => window.location.pathname.includes(subItem.path))) 
                      ? 'text-[#50E3C2]' 
                      : 'text-gray-400 group-hover:text-white'} 
                    ${!collapsed || isInMobileView ? 'mr-3' : ''}
                    transition-colors duration-150
                  `}>
                    {item.icon}
                  </div>
                  
                  {(!collapsed || isInMobileView) && (
                    <>
                      <span className="text-sm font-medium flex-grow">{item.label}</span>
                      
                      {item.subItems.length > 0 && (
                        <FaChevronDown 
                          size={10} 
                          className={`
                            text-gray-500 transition-transform duration-300 
                            ${openSubmenu === item.id ? 'rotate-180' : ''}
                          `}
                        />
                      )}
                    </>
                  )}
                </div>
                
                {/* Submenu for expanded mode */}
                {(!collapsed || isInMobileView) && item.subItems.length > 0 && openSubmenu === item.id && (
                  <div className="ml-12 mr-3 mt-1 mb-2 space-y-1 submenu-animation">
                    {item.subItems.map((subItem) => (
                      <div 
                        key={subItem.id}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm hover:bg-[#131313] cursor-pointer transition-all duration-150 ${
                          window.location.pathname.includes(subItem.path) 
                            ? 'text-white bg-[#131313]/70' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent parent menu item click
                          handleMenuClick(item.id, subItem.id);
                          if (subItem.path) {
                            handleNavigation(subItem.path);
                          }
                        }}
                      >
                        <div className={`mr-2.5 ${
                          window.location.pathname.includes(subItem.path)
                            ? 'text-[#50E3C2]'
                            : 'text-gray-500'
                        }`}>
                          {subItem.icon}
                        </div>
                        <span>{subItem.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Hover submenu for collapsed mode */}
                {collapsed && !isInMobileView && item.subItems.length > 0 && hoverMenu === item.id && (
                  <div 
                    className="absolute left-full top-0 ml-4 bg-[#0A0A0A]/90 backdrop-blur-md shadow-xl rounded-xl py-3 px-3 w-48 z-50 submenu-animation border border-[#222]/60"
                    onMouseEnter={() => handleMenuHover(item.id)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <div className="font-medium text-sm text-white mb-2 px-2">{item.label}</div>
                    <div className="space-y-1">
                      {item.subItems.map((subItem) => (
                        <div 
                          key={subItem.id}
                          className={`flex items-center px-2 py-2 rounded-lg text-sm hover:bg-[#131313]/70 cursor-pointer transition-all duration-150 ${
                            window.location.pathname.includes(subItem.path) 
                              ? 'text-white bg-[#131313]/40' 
                              : 'text-gray-400 hover:text-white'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent parent menu item click
                            handleMenuClick(item.id, subItem.id);
                            if (subItem.path) {
                              handleNavigation(subItem.path);
                            }
                          }}
                        >
                          <div className={`mr-2.5 ${
                            window.location.pathname.includes(subItem.path)
                              ? 'text-[#50E3C2]'
                              : 'text-gray-500'
                          }`}>
                            {subItem.icon}
                          </div>
                          <span>{subItem.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Favorites section */}
          {(!collapsed || isInMobileView) && (
            <>
              <div className="sidebar-divider my-4 mx-3"></div>
              
              <div className="mb-2 px-3">
                <h2 className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Favorites</h2>
              </div>
              
              <div className="space-y-1">
                {favoriteItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center px-3 py-2.5 mx-3 rounded-xl hover:bg-[#131313]/70 text-gray-300 hover:text-white transition-colors duration-150 cursor-pointer menu-item-hover"
                  >
                    <div className="mr-3">{item.icon}</div>
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {/* Collapsed favorites */}
          {collapsed && !isInMobileView && (
            <div className="mt-4 space-y-3 flex flex-col items-center">
              {favoriteItems.map((item) => (
                <div 
                  key={item.id}
                  className="w-10 h-10 rounded-xl hover:bg-[#131313]/70 flex items-center justify-center transition-colors duration-150 cursor-pointer hover-scale"
                >
                  {item.icon}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Server status footer */}
        <div className={`
          mt-auto border-t border-[#222]/60 bg-[#0A0A0A]/70 backdrop-blur-sm
          ${!collapsed || isInMobileView ? 'p-5' : 'p-3 flex justify-center'}
          ${isInMobileView ? '' : 'rounded-b-2xl'}
        `}>
          {(!collapsed || isInMobileView) ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`
                  h-8 w-8 rounded-xl mr-3 flex items-center justify-center
                  ${serverOnline ? 'bg-[#50E3C2]/10' : 'bg-red-500/10'}
                  ${serverOnline ? 'server-pulse' : ''}
                `}>
                  <FaServer size={14} className={serverOnline ? 'text-[#50E3C2]' : 'text-red-500'} />
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-300 flex items-center">
                    {serverOnline ? (
                      <>
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#50E3C2] mr-1.5"></span>
                        <span>Online</span>
                      </>
                    ) : 'Offline'}
                  </div>
                  <div className="text-xs text-gray-500">v{frontendVersion}</div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={toggleTheme}
                  className="h-8 w-8 rounded-xl bg-[#131313] hover:bg-[#191919] flex items-center justify-center text-gray-400 hover:text-[#50E3C2] transition-colors"
                >
                  {themeMode === 'dark' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                
                <button 
                  onClick={toggleServerStatus}
                  className={`
                    h-8 w-12 rounded-xl relative
                    ${serverOnline ? 'bg-[#50E3C2]/20' : 'bg-gray-700'}
                    transition-all duration-200 cursor-pointer
                  `}
                >
                  <div className={`
                    absolute top-1.5 bottom-1.5 w-5 rounded-full transition-all duration-300 ease-in-out
                    ${serverOnline ? 'right-1.5 bg-[#50E3C2] glowing-border' : 'left-1.5 bg-gray-500'}
                  `}></div>
                </button>
              </div>
            </div>
          ) : (
            // Collapsed view
            <div 
              className={`
                h-10 w-10 rounded-xl flex items-center justify-center cursor-pointer hover-scale
                ${serverOnline ? 'bg-[#50E3C2]/10 server-pulse' : 'bg-red-500/10'}
              `}
              onClick={toggleServerStatus}
            >
              <FaServer size={14} className={serverOnline ? 'text-[#50E3C2]' : 'text-red-500'} />
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Mobile menu overlay
  const renderMobileMenu = () => {
    if (isMobile && mobileMenuOpen) {
      return (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 animate-fadeIn"
            onClick={toggleMobileMenu}
          ></div>
          <div className={`
            fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform-gpu max-w-full mt-4 mb-4 ml-4
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <SidebarContent isInMobileView={true} />
          </div>
        </>
      );
    }
    return null;
  };
  
  // Mobile view - now just renders the sidebar at the top of the screen
  if (isMobile) {
    return (
      <>
        {renderMobileMenu()}
      </>
    );
  }
  
  // Desktop/tablet view
  return <SidebarContent />;
} 