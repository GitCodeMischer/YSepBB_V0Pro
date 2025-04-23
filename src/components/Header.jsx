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
  FaBars,
  FaFileImport,
  FaCircleInfo,
  FaCircleCheck,
  FaCircleXmark,
  FaArrowRight,
  FaKey,
  FaCircleNotch
} from 'react-icons/fa6';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  generate2FASecret, 
  verify2FACode, 
  is2FAEnabled, 
  set2FAStatus,
  getRecoveryCodes,
  generateRecoveryCodes
} from '@/services/twoFactorAuthService';
import RecoveryCodes from '@/components/auth/RecoveryCodes';
import ProfileMenu from './header/ProfileMenu';
import NotificationsMenu from './header/NotificationsMenu';
import SearchPopup from './header/SearchPopup';
import SettingsPopup from './header/SettingsPopup';
import SecuritySettingsPopup from './header/SecuritySettingsPopup';

// Settings tabs configuration for the popup
const SettingsTabs = [
  { 
    name: 'Profile', 
    href: '/settings/profile', 
    icon: FaUser 
  },
  { 
    name: 'Account', 
    href: '/settings/account', 
    icon: FaBriefcase 
  },
  { 
    name: 'Security', 
    href: '/settings/security', 
    icon: FaShield 
  },
  { 
    name: 'Notifications', 
    href: '/settings/notifications', 
    icon: FaBell 
  },
  { 
    name: 'Messages', 
    href: '/settings/messages', 
    icon: FaMessage 
  },
  { 
    name: 'Import Data', 
    href: '/settings/import', 
    icon: FaFileImport 
  },
];

export default function Header() {
  const { user, logout, isAuthenticated, updateUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [notifications, setNotifications] = useState(3);
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchPopupRef = useRef(null);
  const searchContainerRef = useRef(null);
  const settingsRef = useRef(null);
  
  // Add state for security settings
  const [showSecuritySettings, setShowSecuritySettings] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRSetup, setShowQRSetup] = useState(false);
  const [secret, setSecret] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState([]);
  
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
      if (settingsRef.current && !settingsRef.current.contains(event.target) && 
          !event.target.closest('[data-settings-trigger="true"]')) {
        setSettingsOpen(false);
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
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3), 
                    0 1px 3px rgba(0, 0, 0, 0.1), 
                    inset 0 1px 1px rgba(255, 255, 255, 0.03);
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
        border: 1px solid rgba(80, 227, 194, 0.1);
        background: rgba(17, 17, 17, 0.3);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
      }
      
      .header-button:hover {
        background: rgba(17, 17, 17, 0.5);
        border-color: rgba(80, 227, 194, 0.3);
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
          top: 4.5rem !important;
          left: 1rem !important;
          right: 1rem !important;
          width: calc(100% - 2rem) !important;
          margin-top: 0 !important;
          border-radius: 1rem !important;
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
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
        z-index: 50;
      }
      
      @media (max-height: 600px) {
        .search-popup {
          max-height: 90vh;
        }
      }
      
      @media (max-width: 767px) {
        header {
          left: 1rem !important;
          right: 1rem !important;
          top: 0.75rem !important;
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
    if (window.toggleSidebar) {
      window.toggleSidebar();
    } else {
      // Fallback to custom event if direct function access is not available
      const event = new CustomEvent('toggle-sidebar');
      window.dispatchEvent(event);
    }
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
    
    const handleSidebarStateChanged = (event) => {
      setSidebarOpen(event.detail.isOpen);
    };
    
    window.addEventListener('sidebar-toggled', handleSidebarToggle);
    window.addEventListener('sidebar-state-changed', handleSidebarStateChanged);
    return () => {
      window.removeEventListener('sidebar-toggled', handleSidebarToggle);
      window.removeEventListener('sidebar-state-changed', handleSidebarStateChanged);
    };
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
  
  // Handle sign out
  const handleSignOut = () => {
    setProfileOpen(false);
    logout();
  };
  
  // Initialize 2FA status from user data
  useEffect(() => {
    if (user) {
      setTwoFactorEnabled(is2FAEnabled(user));
    }
  }, [user]);
  
  // 2FA handlers
  const handleEnable2FA = async () => {
    try {
      setStatus('loading');
      
      // Generate a new secret using the service
      const newSecret = generate2FASecret();
      setSecret(newSecret);
      
      // Show QR code setup
      setShowQRSetup(true);
      setStatus('idle');
    } catch (error) {
      setStatus('error');
      setError('Failed to generate 2FA secret. Please try again.');
    }
  };

  const handleDisable2FA = async () => {
    try {
      setStatus('loading');
      
      // Call the service to disable 2FA
      const success = await set2FAStatus(false, user?.id);
      
      if (success) {
        // Update the user object in context
        updateUser({
          ...user,
          twoFactorEnabled: false
        });
        
        setTwoFactorEnabled(false);
        setStatus('idle');
      } else {
        throw new Error('Failed to disable 2FA');
      }
    } catch (error) {
      setStatus('error');
      setError(error.message || 'Failed to disable 2FA. Please try again.');
    }
  };

  const handleSetupComplete = async (result) => {
    if (result.success) {
      try {
        // Call the service to enable 2FA
        const success = await set2FAStatus(true, user?.id);
        
        if (success) {
          // Update the user object in context
          updateUser({
            ...user,
            twoFactorEnabled: true
          });
          
          setTwoFactorEnabled(true);
          setShowQRSetup(false);
        } else {
          setError('Failed to enable 2FA. Please try again.');
        }
      } catch (error) {
        setError(error.message || 'Failed to enable 2FA. Please try again.');
      }
    }
  };

  const handleCancelSetup = () => {
    setShowQRSetup(false);
    setSecret(null);
  };

  const handleViewRecoveryCodes = async () => {
    try {
      setStatus('loading');
      setError(null);
      
      // Retrieve recovery codes
      const response = await getRecoveryCodes(user?.id);
      
      if (response.success) {
        setRecoveryCodes(response.codes);
        setShowRecoveryCodes(true);
        setStatus('idle');
      } else {
        throw new Error(response.message || 'Failed to retrieve recovery codes');
      }
    } catch (error) {
      console.error('Error retrieving recovery codes:', error);
      setStatus('error');
      setError(error.message || 'Failed to retrieve recovery codes. Please try again.');
    }
  };

  const handleRegenerateRecoveryCodes = async () => {
    try {
      // Generate new recovery codes
      const response = await generateRecoveryCodes(user?.id);
      
      if (response.success) {
        setRecoveryCodes(response.codes);
        return { success: true };
      } else {
        throw new Error(response.message || 'Failed to regenerate recovery codes');
      }
    } catch (error) {
      console.error('Error regenerating recovery codes:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to regenerate recovery codes. Please try again.' 
      };
    }
  };

  const handleCloseRecoveryCodes = () => {
    setShowRecoveryCodes(false);
  };
  
  const openSecuritySettings = () => {
    setSettingsOpen(false);
    setShowSecuritySettings(true);
  };
  
  return (
    <>
      <header className="fixed top-4 right-4 left-4 md:left-[calc(64px+1rem)] md:right-4 md:top-4 mx-auto max-w-6xl rounded-2xl bg-[#0A0A0A]/60 header-glass z-[100] h-16 border border-[#222]/60 border-opacity-40 shadow-lg shadow-black/30">
        <div className="flex items-center justify-between h-full px-4 md:px-6 w-full mx-auto">
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

            <button
              className={`header-button w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#50E3C2] ${settingsOpen ? 'text-[#50E3C2] border-[#50E3C2]/20' : ''}`}
              title="Settings"
              onClick={() => {
                setProfileOpen(false);
                setNotificationsOpen(false);
                setSettingsOpen(!settingsOpen);
              }}
              data-settings-trigger="true"
            >
              <FaGear size={16} />
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
              
              {notificationsOpen && (
                <NotificationsMenu />
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
                        src={user?.image || user?.avatar || "https://ui-avatars.com/api/?name=P+O&background=50E3C2&color=000&bold=true"} 
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
              
              {profileOpen && (
                <ProfileMenu user={user} onSignOut={handleSignOut} />
              )}
            </div>
            
            {/* Mobile menu button - only visible on mobile */}
            {isMobile && (
              <button 
                className={`header-button w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 ${sidebarOpen ? 'bg-[#50E3C2]/20 text-[#50E3C2] border-[#50E3C2]/30' : 'text-gray-400 hover:text-[#50E3C2]'}`}
                onClick={toggleMobileSidebar}
                aria-label="Toggle sidebar menu"
              >
                {sidebarOpen ? <FaXmark size={16} /> : <FaBars size={16} />}
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Search Popup */}
      {searchOpen && (
        <SearchPopup 
          onClose={() => setSearchOpen(false)} 
          containerRef={searchContainerRef} 
        />
      )}
      
      {/* Settings Popup */}
      {settingsOpen && (
        <SettingsPopup 
          onClose={() => setSettingsOpen(false)} 
          containerRef={settingsRef}
          tabs={SettingsTabs}
          onOpenSecuritySettings={openSecuritySettings}
        />
      )}
      
      {/* Security Settings Modal */}
      {showSecuritySettings && (
        <SecuritySettingsPopup
          onClose={() => setShowSecuritySettings(false)}
        />
      )}
    </>
  );
}

// QR Code setup component for 2FA
function QRCodeSetup({ secret, onComplete, onCancel }) {
  const [verificationCode, setVerificationCode] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const handleVerify = async () => {
    try {
      setStatus('verifying');
      
      // Use the service to verify the code
      const isValid = await verify2FACode(verificationCode, secret.secret);
      
      if (isValid) {
        setStatus('success');
        setTimeout(() => {
          if (onComplete) {
            onComplete({
              success: true,
              secret: secret.secret
            });
          }
        }, 1000);
      } else {
        throw new Error('Invalid verification code. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setError(error.message || 'Verification failed. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-[#121212] rounded-xl border border-[#222] mb-6">
      <h3 className="text-lg font-medium text-white mb-4">Setup Two-Factor Authentication</h3>
      
      <div className="mb-6">
        <p className="text-gray-400 mb-3">
          Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="bg-white p-3 rounded-lg w-48 h-48 flex-shrink-0">
            <img 
              src={secret.qrCodeUrl} 
              alt="QR Code for 2FA" 
              className="w-full h-full"
            />
          </div>
          
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Manual setup code:</p>
              <div className="bg-[#1a1a1a] p-3 rounded-lg font-mono text-sm break-all border border-[#333]">
                {secret.secret}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Recovery code (save this somewhere safe):</p>
              <div className="bg-[#1a1a1a] p-3 rounded-lg font-mono text-sm break-all border border-[#333] text-yellow-500">
                {secret.recoveryCode}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Enter the 6-digit verification code:</label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => {
            setVerificationCode(e.target.value);
            if (status === 'error') {
              setError(null);
              setStatus('idle');
            }
          }}
          maxLength={6}
          className="w-full sm:w-64 p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
          placeholder="000000"
        />
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 rounded-lg flex items-start gap-2 text-red-400 text-sm">
          <FaCircleInfo className="mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      <div className="flex items-center gap-3 justify-end">
        <button
          onClick={onCancel}
          className="py-2 px-4 rounded-lg bg-[#2a2a2a] text-gray-300 hover:bg-[#333] transition-colors"
        >
          Cancel
        </button>
        
        <button
          onClick={handleVerify}
          disabled={verificationCode.length !== 6 || status === 'verifying' || status === 'success'}
          className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
            status === 'success'
              ? 'bg-[#008751] text-white'
              : 'bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black font-medium'
          } ${
            (verificationCode.length !== 6 || status === 'verifying') ? 'opacity-70' : ''
          } transition-all duration-200`}
        >
          {status === 'success' ? (
            <>
              <FaCircleCheck />
              <span>Verified</span>
            </>
          ) : status === 'verifying' ? (
            <>
              <FaCircleNotch className="animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Verify</span>
              <FaArrowRight size={12} />
            </>
          )}
        </button>
      </div>
    </div>
  );
} 