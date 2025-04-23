import React from 'react';
import Link from 'next/link';
import {
  FaUser,
  FaBriefcase,
  FaBell,
  FaMessage,
  FaShield,
  FaFileImport,
  FaRightFromBracket
} from 'react-icons/fa6';

/**
 * ProfileMenu component for displaying user profile information and navigation links
 * 
 * @param {Object} props
 * @param {Object} props.user - User object containing profile information
 * @param {Function} props.onSignOut - Function to call when sign out is clicked
 */
export default function ProfileMenu({ user, onSignOut }) {
  return (
    <div className="absolute right-0 mt-2 profile-dropdown w-[calc(100vw-2rem)] sm:w-64 bg-[#121212]/90 backdrop-blur-md rounded-xl border border-[#222]/70 shadow-xl dropdown-animation z-50">
      <div className="px-5 py-4 border-b border-[#222]/70">
        <div className="flex items-center">
          <div className="relative overflow-hidden">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#50E3C2]/20 to-[#3CCEA7]/20 flex items-center justify-center overflow-hidden border border-[#50E3C2]/20">
              <img 
                src={user?.image || user?.avatar || "https://ui-avatars.com/api/?name=P+O&background=50E3C2&color=000&bold=true"} 
                alt="User profile" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-white">{user?.name || "Guest User"}</h3>
            <div className="flex items-center mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#50E3C2] mr-1.5"></span>
              <p className="text-xs text-gray-400">{user?.plan || "Free Plan"}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-2 mobile-dropdown">
        <Link href="/settings/profile" className="w-full flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition-colors">
          <FaUser size={14} className="mr-3 text-gray-500" />
          Your Profile
        </Link>
        <Link href="/settings/account" className="w-full flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition-colors">
          <FaBriefcase size={14} className="mr-3 text-gray-500" />
          Account Settings
        </Link>
        <Link href="/settings/notifications" className="w-full flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition-colors">
          <FaBell size={14} className="mr-3 text-gray-500" />
          Notifications
        </Link>
        <Link href="/settings/messages" className="w-full flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition-colors">
          <FaMessage size={14} className="mr-3 text-gray-500" />
          Messages
        </Link>
        <Link href="/settings/security" className="w-full flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition-colors">
          <FaShield size={14} className="mr-3 text-gray-500" />
          Privacy & Security
        </Link>
        <Link href="/settings/import" className="w-full flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition-colors">
          <FaFileImport size={14} className="mr-3 text-gray-500" />
          Import Data
        </Link>
      </div>
      
      <div className="header-divider"></div>
      
      <div className="py-2">
        <button 
          onClick={onSignOut}
          className="w-full flex items-center px-4 py-2.5 text-sm text-red-400 hover:bg-[#1a1a1a] transition-colors"
        >
          <FaRightFromBracket size={14} className="mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
} 