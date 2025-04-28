import React, { useState, useRef, useEffect } from 'react';
import { FaMagnifyingGlass, FaXmark, FaChevronDown } from 'react-icons/fa6';

/**
 * SearchPopup component for the search functionality
 * 
 * @param {Object} props
 * @param {Function} props.onClose - Function to call when the search popup is closed
 * @param {Object} props.containerRef - React ref object for the container
 */
export default function SearchPopup({ onClose, containerRef }) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const searchPopupRef = useRef(null);
  
  // Focus input after mounting
  useEffect(() => {
    if (searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, []);
  
  // Ensure search popup is properly centered
  useEffect(() => {
    if (searchPopupRef.current) {
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
  }, []);
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
  
  const searchResults = getSearchResults();

  return (
    <div className="search-popup-container" ref={containerRef}>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm search-backdrop"
        onClick={onClose}
      ></div>
      <div 
        ref={searchPopupRef}
        className="search-popup bg-[#121212]/90 backdrop-blur-md border border-[#222]/70 shadow-2xl search-popup-animation"
      >
        <div className="flex items-center p-3 md:p-4 border-b border-[#222]/70">
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
            onClick={onClose}
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
        
        <div className="p-2 md:p-3 border-t border-[#222]/70 text-xs text-gray-500 flex flex-col xs:flex-row justify-between space-y-2 xs:space-y-0">
          <div>Press <kbd className="px-2 py-1 bg-[#222]/70 rounded text-gray-400 text-[10px]">↑</kbd> <kbd className="px-2 py-1 bg-[#222]/70 rounded text-gray-400 text-[10px]">↓</kbd> to navigate</div>
          <div>Press <kbd className="px-2 py-1 bg-[#222]/70 rounded text-gray-400 text-[10px]">Enter</kbd> to select</div>
        </div>
      </div>
    </div>
  );
} 