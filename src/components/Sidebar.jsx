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
  FaShuffle
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
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
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
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2),
                    -5px -5px 15px rgba(255, 255, 255, 0.03);
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
      
      .sidebar-toggle-btn {
        transition: all 0.3s ease;
        transform: translateX(0);
      }
      
      .sidebar-toggle-btn:hover {
        transform: translateX(2px);
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
  
  const handleMenuClick = (id) => {
    setActiveMenu(id);
  };
  
  const menuItems = [
    { 
      id: 'dashboard', 
      icon: <FaHouse size={18} />, 
      label: 'Dashboard',
      subItems: []
    },
    { 
      id: 'analytics', 
      icon: <FaChartLine size={18} />, 
      label: 'Analytics',
      subItems: [
        { id: 'performance', label: 'Performance', icon: <FaChartPie size={14} /> },
        { id: 'insights', label: 'AI Insights', icon: <FaRobot size={14} /> },
        { id: 'reports', label: 'Reports', icon: <FaRegNoteSticky size={14} /> }
      ]
    },
    { 
      id: 'campaigns', 
      icon: <FaTableColumns size={18} />, 
      label: 'Campaigns',
      subItems: [
        { id: 'active', label: 'Active Campaigns', icon: <FaShuffle size={14} /> },
        { id: 'drafts', label: 'Drafts', icon: <FaRegNoteSticky size={14} /> },
        { id: 'archived', label: 'Archived', icon: <FaRegBell size={14} /> }
      ]
    },
    { 
      id: 'automations', 
      icon: <FaRobot size={18} />, 
      label: 'Automations',
      subItems: [
        { id: 'flows', label: 'Workflow Flows', icon: <FaShuffle size={14} /> },
        { id: 'triggers', label: 'Triggers', icon: <FaRegBell size={14} /> }
      ]
    },
    { 
      id: 'finances', 
      icon: <FaWallet size={18} />, 
      label: 'Finances',
      subItems: []
    },
    { 
      id: 'users', 
      icon: <FaUsers size={18} />, 
      label: 'Users',
      subItems: []
    },
    { 
      id: 'partnerships', 
      icon: <FaHandshake size={18} />, 
      label: 'Partnerships',
      subItems: []
    },
    { 
      id: 'settings', 
      icon: <FaGear size={18} />, 
      label: 'Settings',
      subItems: []
    }
  ];
  
  const favoriteItems = [
    { id: 'design-project', icon: <FaStar size={14} className="text-[#50E3C2]" />, label: 'Design Project' },
    { id: 'seo-automation', icon: <FaStar size={14} className="text-[#50E3C2]" />, label: 'SEO Automation' },
    { id: 'email-marketing', icon: <FaStar size={14} className="text-[#50E3C2]" />, label: 'Email Marketing' }
  ];
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  // Sidebar content shared across mobile and desktop
  const SidebarContent = ({ isInMobileView = false }) => {
    const sidebarWidth = collapsed && !isInMobileView ? 'w-20' : 'w-64';
    
    return (
      <div 
        className={`h-screen ${sidebarWidth} transition-all duration-300 ease-in-out bg-[#0A0A0A] bg-opacity-90 sidebar-glass border-r border-[#222] border-opacity-50 relative flex flex-col neo-shadow overflow-hidden`}
      >
        {/* Toggle Button */}
        {!isMobile && (
          <button 
            onClick={toggleCollapse}
            className="absolute -right-3 top-20 w-6 h-6 bg-[#111] border border-[#333] rounded-full flex items-center justify-center text-gray-400 hover:text-[#50E3C2] z-10 sidebar-toggle-btn transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <FaCaretLeft size={11} className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        )}
        
          {/* Logo */}
        <div className={`py-6 ${collapsed && !isInMobileView ? 'px-4' : 'px-6'} flex items-center`}>
            {(!collapsed || isInMobileView) ? (
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#50E3C2] to-[#3CCEA7] flex items-center justify-center shadow-lg mr-3">
                <span className="font-bold text-black text-xl">Y</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">YSep<span className="text-[#50E3C2]">BB</span></h1>
                <p className="text-xs text-gray-400">Balance Beam</p>
              </div>
              </div>
            ) : (
            <div className="mx-auto">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#50E3C2] to-[#3CCEA7] flex items-center justify-center shadow-lg">
                <span className="font-bold text-black text-xl">Y</span>
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
                className="w-full bg-[#111] bg-opacity-50 border border-[#222] border-opacity-60 focus:border-[#50E3C2] rounded-xl py-2.5 pl-4 pr-10 text-sm focus:outline-none transition-all duration-200 text-gray-300 placeholder-gray-500"
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
                    ${activeMenu === item.id ? 'active-menu text-white bg-[#131313]' : 'text-gray-400'}
                  `}
                  onClick={() => {
                    handleMenuClick(item.id);
                    if (item.subItems.length > 0 && (!collapsed || isInMobileView)) {
                      toggleSubmenu(item.id);
                    }
                  }}
                >
                  <div className="active-indicator"></div>
                  
                  <div className={`
                    ${activeMenu === item.id ? 'text-[#50E3C2]' : 'text-gray-400 group-hover:text-white'} 
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
                        className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#131313] cursor-pointer transition-all duration-150"
                      >
                        <div className="mr-2.5 text-gray-500">{subItem.icon}</div>
                        <span>{subItem.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Hover submenu for collapsed mode */}
                {collapsed && !isInMobileView && item.subItems.length > 0 && hoverMenu === item.id && (
                  <div 
                    className="absolute left-full top-0 ml-2 bg-[#161616] shadow-xl rounded-xl py-2 px-3 w-48 z-50 submenu-animation"
                    onMouseEnter={() => handleMenuHover(item.id)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <div className="font-medium text-sm text-white mb-2 px-2">{item.label}</div>
                    <div className="space-y-1">
                      {item.subItems.map((subItem) => (
                        <div 
                          key={subItem.id}
                          className="flex items-center px-2 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#222] cursor-pointer transition-all duration-150"
                        >
                          <div className="mr-2.5 text-gray-500">{subItem.icon}</div>
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
              <div className="sidebar-divider my-4"></div>
              
              <div className="mb-2 px-3">
                <h2 className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Favorites</h2>
              </div>
              
              <div className="space-y-1">
                {favoriteItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center px-3 py-2.5 mx-3 rounded-xl hover:bg-[#131313] text-gray-300 hover:text-white transition-colors duration-150 cursor-pointer menu-item-hover"
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
                  className="w-10 h-10 rounded-xl hover:bg-[#131313] flex items-center justify-center transition-colors duration-150 cursor-pointer hover-scale"
                >
                      {item.icon}
                  </div>
                ))}
              </div>
            )}
        </div>
        
        {/* Server status footer */}
        <div className={`
          mt-auto border-t border-[#222] border-opacity-40 bg-[#0A0A0A] bg-opacity-95
          ${!collapsed || isInMobileView ? 'p-5' : 'p-3 flex justify-center'}
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
  
  // Mobile menu button
  const renderMobileMenuButton = () => {
    if (isMobile) {
      return (
        <button 
          onClick={toggleMobileMenu}
          className={`
            fixed top-4 left-4 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-xl 
            backdrop-blur-md bg-[#111]/70 border border-[#222]/50
            flex items-center justify-center text-white
            transition-all duration-200 hover:scale-105
            ${mobileMenuOpen ? 'rotate-90' : 'rotate-0'}
          `}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <FaXmark size={16} /> : <FaBars size={16} />}
        </button>
      );
    }
    return null;
  };
  
  // Mobile menu overlay
  const renderMobileMenu = () => {
    if (isMobile && mobileMenuOpen) {
      return (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 animate-fadeIn"
            onClick={toggleMobileMenu}
          ></div>
          <div className={`
            fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform-gpu max-w-full
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <SidebarContent isInMobileView={true} />
          </div>
        </>
      );
    }
    return null;
  };
  
  // Mobile view only renders the button and potentially the menu
  if (isMobile) {
    return (
      <>
        {renderMobileMenuButton()}
        {renderMobileMenu()}
      </>
    );
  }
  
  // Desktop/tablet view
  return (
      <SidebarContent />
  );
} 