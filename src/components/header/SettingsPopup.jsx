import React from 'react';
import Link from 'next/link';
import { 
  FaGear, 
  FaXmark, 
  FaUser, 
  FaBriefcase, 
  FaShield, 
  FaBell, 
  FaMessage, 
  FaFileImport 
} from 'react-icons/fa6';

/**
 * SettingsPopup component for displaying and managing settings
 * 
 * @param {Object} props
 * @param {Function} props.onClose - Function to call when the popup is closed
 * @param {Object} props.containerRef - React ref object for the container
 * @param {Array} props.tabs - Array of tab objects with name, href, and icon properties
 * @param {Function} props.onOpenSecuritySettings - Function to open security settings
 */
export default function SettingsPopup({ onClose, containerRef, tabs, onOpenSecuritySettings }) {
  // Function to get the icon component based on name
  const getIconComponent = (iconName) => {
    const iconMap = {
      'FaUser': FaUser,
      'FaBriefcase': FaBriefcase,
      'FaShield': FaShield,
      'FaBell': FaBell,
      'FaMessage': FaMessage,
      'FaFileImport': FaFileImport
    };
    
    return iconMap[iconName] || FaGear;
  };

  return (
    <div className="settings-popup-container fixed inset-0 flex items-center justify-center z-40" ref={containerRef}>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm settings-backdrop"
        onClick={onClose}
      ></div>
      <div 
        className="settings-popup relative w-[90%] max-w-2xl max-h-[80vh] bg-[#121212]/95 backdrop-blur-md border border-[#222]/70 rounded-xl shadow-2xl overflow-auto z-50 search-popup-animation mx-auto"
      >
        <div className="flex items-center justify-between p-4 border-b border-[#222]/70">
          <h2 className="text-xl font-medium text-white flex items-center">
            <FaGear className="text-[#50E3C2] mr-3" size={18} />
            Settings
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 transition-colors duration-200"
          >
            <FaXmark size={16} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-400 mb-6">Manage your account settings and preferences</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {tabs.map((tab) => {
              // Get the proper icon component
              const IconComponent = tab.icon || getIconComponent(`Fa${tab.name.replace(/\s/g, '')}`);
              
              return tab.name === 'Security' ? (
                <button 
                  key={tab.name}
                  className="bg-[#1a1a1a] rounded-xl p-4 border border-[#222] hover:border-[#333] transition-colors flex flex-col items-center justify-center text-center gap-3 h-28"
                  onClick={onOpenSecuritySettings}
                >
                  <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center">
                    <IconComponent size={16} className="text-[#50E3C2]" />
                  </div>
                  <span className="text-gray-300 text-sm">{tab.name}</span>
                </button>
              ) : (
                <Link 
                  key={tab.name}
                  href={tab.href}
                  className="bg-[#1a1a1a] rounded-xl p-4 border border-[#222] hover:border-[#333] transition-colors flex flex-col items-center justify-center text-center gap-3 h-28"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center">
                    <IconComponent size={16} className="text-[#50E3C2]" />
                  </div>
                  <span className="text-gray-300 text-sm">{tab.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 