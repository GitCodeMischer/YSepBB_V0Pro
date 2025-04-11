import React, { useState, useEffect, useRef } from 'react';
import { 
  FaRegBell, 
  FaBell, 
  FaMagnifyingGlass, 
  FaGear, 
  FaPlus,
  FaEllipsisVertical,
  FaChevronDown,
  FaUser,
  FaRightFromBracket,
  FaShield,
  FaBriefcase,
  FaMessage,
  FaSun,
  FaMoon,
  FaXmark,
  FaBars
} from 'react-icons/fa6';

export default function Header() {
  const [notifications, setNotifications] = useState(3);
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchPopupRef = useRef(null);
  const searchContainerRef = useRef(null);
  
  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Focus search input when popup opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [searchOpen]);
  
  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (searchPopupRef.current && !searchPopupRef.current.contains(event.target) && 
          !event.target.closest('[data-search-trigger="true"]')) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // CSS for animations and effects
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .header-glass {
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }
      
      @keyframes dropIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .dropdown-animation {
        animation: dropIn 0.2s ease-out forwards;
      }
      
      .search-popup-animation {
        animation: scaleIn 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }
      
      .search-backdrop {
        animation: fadeIn 0.2s ease-out forwards;
      }
      
      @keyframes pulseNotification {
        0% { transform: scale(1); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
      }
      
      .notification-badge {
        animation: pulseNotification 2s infinite;
      }
      
      .search-transition {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .button-hover {
        transition: all 0.2s ease;
      }
      
      .button-hover:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      .header-button {
        border: 1px solid rgba(80, 227, 194, 0.05);
        background: rgba(17, 17, 17, 0.4);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
      }
      
      .header-button:hover {
        background: rgba(17, 17, 17, 0.6);
        border-color: rgba(80, 227, 194, 0.2);
        transform: translateY(-1px);
      }
      
      .header-divider {
        height: 1px;
        background: linear-gradient(90deg, rgba(80, 227, 194, 0) 0%, rgba(80, 227, 194, 0.1) 50%, rgba(80, 227, 194, 0) 100%);
        margin: 8px 0;
      }
      
      .search-result-hover:hover {
        background: rgba(80, 227, 194, 0.05);
        transform: translateX(3px);
      }
      
      .search-category {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #666;
        margin-bottom: 8px;
      }
      
      .search-highlight {
        color: #50E3C2;
      }
      
      .mobile-dropdown {
        max-height: 60vh;
        overflow-y: auto;
      }
      
      @media (max-width: 767px) {
        .profile-dropdown,
        .notification-dropdown {
          position: fixed !important;
          top: 4rem !important;
          left: 1rem !important;
          right: 1rem !important;
          width: calc(100% - 2rem) !important;
          margin-top: 0 !important;
        }
      }
      
      .search-popup-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 40;
      }
      
      .search-popup {
        width: calc(100% - 2rem);
        max-width: 600px;
        margin: 0 auto;
        max-height: 80vh;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
        z-index: 50;
      }
      
      @media (max-height: 600px) {
        .search-popup {
          max-height: 90vh;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would also update the theme in the app context/state
  };
  
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setSearchQuery('');
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const toggleMobileSidebar = () => {
    // Dispatch custom event to toggle sidebar
    // This will be caught by the Sidebar component
    const event = new CustomEvent('toggle-sidebar');
    window.dispatchEvent(event);
  };
  
  // Mock search results data
  const getSearchResults = () => {
    if (!searchQuery.trim()) return null;
    
    return {
      pages: [
        { id: 1, title: 'Dashboard Overview', category: 'Pages', icon: '📊' },
        { id: 2, title: 'Analytics Report', category: 'Pages', icon: '📈' },
      ],
      campaigns: [
        { id: 1, title: 'Q3 Marketing Campaign', category: 'Campaigns', icon: '🚀' },
        { id: 2, title: 'Product Launch', category: 'Campaigns', icon: '🚀' },
      ],
      users: [
        { id: 1, title: 'Sarah Johnson', subtitle: 'Marketing Manager', category: 'People', avatar: 'https://i.pravatar.cc/100?img=5' },
        { id: 2, title: 'Michael Chen', subtitle: 'Product Designer', category: 'People', avatar: 'https://i.pravatar.cc/100?img=3' },
      ],
      docs: [
        { id: 1, title: 'Campaign Guide', category: 'Documentation', icon: '📄' },
        { id: 2, title: 'API Reference', category: 'Documentation', icon: '📄' },
      ]
    };
  };
  
  // Mock notification data
  const notificationItems = [
    { id: 1, title: 'Campaign completed', message: 'Your Q3 campaign has finished with 145% ROI', time: '2h ago', read: false },
    { id: 2, title: 'New message', message: 'Sarah from Marketing sent you a message', time: '5h ago', read: false },
    { id: 3, title: 'System update', message: 'YSepBB was updated to version 2.0', time: '1d ago', read: false },
    { id: 4, title: 'Reminder', message: 'Team meeting in 30 minutes', time: '2d ago', read: true }
  ];
  
  const searchResults = getSearchResults();
  
  // Listen for sidebar toggle events from Sidebar component
  useEffect(() => {
    const handleSidebarToggle = () => {
      // Handle any state changes needed when sidebar toggles
      // For example, close dropdowns when sidebar opens
      setProfileOpen(false);
      setNotificationsOpen(false);
    };
    
    window.addEventListener('sidebar-toggled', handleSidebarToggle);
    return () => window.removeEventListener('sidebar-toggled', handleSidebarToggle);
  }, []);
  
  // Ensure search popup is properly centered
  useEffect(() => {
    if (searchOpen && searchPopupRef.current) {
      // Force recalculation of position after mount
      const recalculatePosition = () => {
        if (searchPopupRef.current) {
          // Update position to ensure it's centered
          searchPopupRef.current.style.display = 'block';
        }
      };
      
      recalculatePosition();
      // Also recalculate on window resize
      window.addEventListener('resize', recalculatePosition);
      return () => window.removeEventListener('resize', recalculatePosition);
    }
  }, [searchOpen]);
  
  return (
    <>
      <header className="fixed top-0 right-0 left-0 md:left-64 bg-[#0A0A0A] bg-opacity-90 header-glass z-[100] h-16 border-b border-[#222] border-opacity-40 shadow-md shadow-black/20">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          {/* Left - Page title on mobile, search on desktop */}
          <div className="flex items-center">
            {isMobile ? (
              <h1 className="text-lg font-bold text-white truncate">
                YSep<span className="text-[#50E3C2]">BB</span>
              </h1>
            ) : (
              <button 
                className="header-button w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#50E3C2]"
                onClick={toggleSearch}
                data-search-trigger="true"
              >
                <FaMagnifyingGlass size={16} />
              </button>
            )}
          </div>
          
          {/* Right - Actions */}
          <div className="flex items-center space-x-3">
            {/* Create button */}
            <button className="hidden md:flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black font-medium text-sm button-hover">
              <FaPlus size={14} className="mr-2" />
              <span>Create</span>
            </button>
            
            {/* Mobile search button */}
            {isMobile && (
              <button 
                className="header-button w-10 h-10 rounded-xl flex items-center justify-center text-gray-400"
                onClick={toggleSearch}
                data-search-trigger="true"
              >
                <FaMagnifyingGlass size={16} />
              </button>
            )}
            
            {/* Dark/Light mode toggle */}
            <button 
              onClick={toggleTheme}
              className="header-button w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-gray-400"
            >
              {isDarkMode ? (
                <FaSun size={16} className="text-gray-400 hover:text-[#50E3C2]" />
              ) : (
                <FaMoon size={16} className="text-gray-400 hover:text-[#50E3C2]" />
              )}
            </button>
            
            {/* Notification dropdown */}
            <div className="relative" ref={notificationRef}>
              <button 
                className={`header-button w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center ${notificationsOpen ? 'text-[#50E3C2] border-[#50E3C2]/20' : 'text-gray-400'}`}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                {notifications > 0 ? (
                  <>
                    <FaBell size={16} className="text-[#50E3C2]" />
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#50E3C2] text-black text-[10px] font-bold flex items-center justify-center notification-badge">
                      {notifications}
                    </span>
                  </>
                ) : (
                  <FaRegBell size={16} />
                )}
              </button>
              
              {/* Notification dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 notification-dropdown w-[calc(100vw-2rem)] sm:w-80 bg-[#121212] rounded-xl border border-[#222] shadow-xl dropdown-animation z-50">
                  <div className="px-4 py-3 border-b border-[#222] flex items-center justify-between">
                    <h3 className="font-medium text-white">Notifications</h3>
                    <button className="text-xs text-[#50E3C2] hover:underline">Mark all as read</button>
                  </div>
                  
                  <div className="mobile-dropdown">
                    {notificationItems.map((item) => (
                      <div key={item.id} className={`p-3 border-b border-[#1e1e1e] last:border-0 hover:bg-[#1a1a1a] transition-colors cursor-pointer ${!item.read ? 'bg-[#141414]' : ''}`}>
                        <div className="flex items-start">
                          <div className={`min-w-[8px] h-2 rounded-full mt-1.5 ${!item.read ? 'bg-[#50E3C2]' : 'bg-transparent'} mr-2 flex-shrink-0`}></div>
                          <div className="w-full min-w-0">
                            <div className="flex justify-between w-full">
                              <h4 className="text-sm font-medium text-white">{item.title}</h4>
                              <span className="text-xs text-gray-500 ml-2 whitespace-nowrap flex-shrink-0">{item.time}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 break-words w-full">{item.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="px-4 py-2 bg-[#0f0f0f] text-center">
                    <button className="text-sm text-[#50E3C2] hover:underline">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button 
                className="flex items-center space-x-2"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="relative">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#50E3C2]/20 to-[#3CCEA7]/20 backdrop-blur-md flex items-center justify-center border border-[#50E3C2]/20 hover:border-[#50E3C2]/40 transition-all duration-200 shadow-lg hover:shadow-[#50E3C2]/10">
                    <div className="w-full h-full rounded-xl overflow-hidden">
                      <img 
                        src="https://ui-avatars.com/api/?name=P+O&background=50E3C2&color=000&bold=true" 
                        alt="User profile" 
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-200"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-[#50E3C2]/20 rounded-full blur-xl"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#50E3C2] border-2 border-[#0A0A0A] z-10"></div>
                </div>
                {!isMobile && (
                  <FaChevronDown size={10} className={`text-gray-500 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                )}
              </button>
              
              {/* Profile dropdown menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 profile-dropdown w-[calc(100vw-2rem)] sm:w-64 bg-[#121212] rounded-xl border border-[#222] shadow-xl dropdown-animation z-50">
                  <div className="px-5 py-4 border-b border-[#222]">
                    <div className="flex items-center">
                      <div className="relative overflow-hidden">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#50E3C2]/20 to-[#3CCEA7]/20 flex items-center justify-center overflow-hidden border border-[#50E3C2]/20">
                          <img 
                            src="https://ui-avatars.com/api/?name=P+O&background=50E3C2&color=000&bold=true" 
                            alt="User profile" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-white">PIchOffith</h3>
                        <div className="flex items-center mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#50E3C2] mr-1.5"></span>
                          <p className="text-xs text-gray-400">Premium Plan</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2 mobile-dropdown">
                    <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition-colors">
                      <FaUser size={14} className="mr-3 text-gray-500" />
                      Your Profile
                    </button>
                    <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition-colors">
                      <FaBriefcase size={14} className="mr-3 text-gray-500" />
                      Account Settings
                    </button>
                    <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition-colors">
                      <FaMessage size={14} className="mr-3 text-gray-500" />
                      Messages
                    </button>
                    <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition-colors">
                      <FaShield size={14} className="mr-3 text-gray-500" />
                      Privacy & Security
                    </button>
                  </div>
                  
                  <div className="header-divider"></div>
                  
                  <div className="py-2">
                    <button className="w-full flex items-center px-4 py-2.5 text-sm text-red-400 hover:bg-[#1a1a1a] transition-colors">
                      <FaRightFromBracket size={14} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile menu button - only visible on mobile */}
            {isMobile && (
              <button 
                className="header-button w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white"
                onClick={toggleMobileSidebar}
                aria-label="Toggle sidebar menu"
              >
                <FaBars size={16} />
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Search Popup */}
      {searchOpen && (
        <div className="search-popup-container" ref={searchContainerRef}>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm search-backdrop"
            onClick={() => setSearchOpen(false)}
          ></div>
          <div 
            ref={searchPopupRef}
            className="search-popup bg-[#121212] border border-[#222] shadow-2xl search-popup-animation"
          >
            <div className="flex items-center p-3 md:p-4 border-b border-[#222]">
              <FaMagnifyingGlass className="text-[#50E3C2] mr-2 md:mr-3" size={16} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for anything..."
                className="flex-1 bg-transparent border-none text-base text-gray-200 placeholder-gray-500 focus:outline-none"
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-white p-1 transition-colors duration-200"
              >
                <FaXmark size={16} />
              </button>
            </div>
            
            <div className="overflow-control p-3 md:p-4" style={{ maxHeight: 'calc(80vh - 120px)' }}>
              {!searchQuery.trim() ? (
                <div className="text-center py-8 md:py-10">
                  <div className="text-[#50E3C2] mb-3 opacity-60">
                    <FaMagnifyingGlass size={24} className="mx-auto md:h-7 md:w-7" />
                  </div>
                  <div className="text-gray-300 font-medium mb-2">Start typing to search</div>
                  <div className="text-xs text-gray-500">Search for pages, campaigns, users, and more</div>
                </div>
              ) : !searchResults ? (
                <div className="text-center py-8 md:py-10">
                  <div className="text-gray-500 mb-2">No results found</div>
                  <div className="text-xs text-gray-600">Try different keywords or check spelling</div>
                </div>
              ) : (
                <div className="space-y-5 md:space-y-6">
                  {/* Pages */}
                  {searchResults.pages.length > 0 && (
                    <div>
                      <h3 className="search-category">Pages</h3>
                      <div className="space-y-1">
                        {searchResults.pages.map(item => (
                          <div key={item.id} className="flex items-center p-2 rounded-lg cursor-pointer transition-all duration-150 search-result-hover">
                            <div className="mr-3 text-xl">{item.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-white truncate">{item.title}</div>
                            </div>
                            <div className="text-gray-500 ml-2">
                              <FaChevronDown size={12} className="rotate-270" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Campaigns */}
                  {searchResults.campaigns.length > 0 && (
                    <div>
                      <h3 className="search-category">Campaigns</h3>
                      <div className="space-y-1">
                        {searchResults.campaigns.map(item => (
                          <div key={item.id} className="flex items-center p-2 rounded-lg cursor-pointer transition-all duration-150 search-result-hover">
                            <div className="mr-3 text-xl">{item.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-white truncate">{item.title}</div>
                            </div>
                            <div className="text-gray-500 ml-2">
                              <FaChevronDown size={12} className="rotate-270" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* People */}
                  {searchResults.users.length > 0 && (
                    <div>
                      <h3 className="search-category">People</h3>
                      <div className="space-y-1">
                        {searchResults.users.map(item => (
                          <div key={item.id} className="flex items-center p-2 rounded-lg cursor-pointer transition-all duration-150 search-result-hover">
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                              <img src={item.avatar} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-white truncate">{item.title}</div>
                              <div className="text-xs text-gray-500 truncate">{item.subtitle}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Documentation */}
                  {searchResults.docs.length > 0 && (
                    <div>
                      <h3 className="search-category">Documentation</h3>
                      <div className="space-y-1">
                        {searchResults.docs.map(item => (
                          <div key={item.id} className="flex items-center p-2 rounded-lg cursor-pointer transition-all duration-150 search-result-hover">
                            <div className="mr-3 text-xl">{item.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-white truncate">{item.title}</div>
                            </div>
                            <div className="text-gray-500 ml-2">
                              <FaChevronDown size={12} className="rotate-270" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="p-2 md:p-3 border-t border-[#222] text-xs text-gray-500 flex flex-col xs:flex-row justify-between space-y-2 xs:space-y-0">
              <div>Press <kbd className="px-2 py-1 bg-[#222] rounded text-gray-400 text-[10px]">↑</kbd> <kbd className="px-2 py-1 bg-[#222] rounded text-gray-400 text-[10px]">↓</kbd> to navigate</div>
              <div>Press <kbd className="px-2 py-1 bg-[#222] rounded text-gray-400 text-[10px]">Enter</kbd> to select</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 