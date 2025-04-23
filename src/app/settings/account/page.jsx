"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FaBriefcase, 
  FaCircleCheck, 
  FaCircleNotch,
  FaGithub,
  FaGoogle,
  FaApple,
  FaUnlock,
  FaGlobe,
  FaXmark
} from 'react-icons/fa6';

export default function AccountSettings() {
  const { user } = useAuth();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState('idle'); // idle, saving, success, error
  const [error, setError] = useState(null);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear any previous error
    if (status === 'error') {
      setStatus('idle');
      setError(null);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setStatus('error');
      setError('New passwords do not match.');
      return;
    }
    
    // Validate password strength
    if (passwordData.newPassword.length < 8) {
      setStatus('error');
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    try {
      setStatus('saving');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update password (in a real app, this would call an API)
      console.log('Password updated:', passwordData);
      
      setStatus('success');
      
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Reset status after a delay
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error updating password:', error);
      setStatus('error');
      setError(error.message || 'Failed to update password. Please try again.');
    }
  };

  // Linked social accounts (mock data)
  const linkedAccounts = [
    {
      provider: 'Google',
      icon: FaGoogle,
      isLinked: true,
      email: 'user@gmail.com'
    },
    {
      provider: 'GitHub',
      icon: FaGithub,
      isLinked: false
    },
    {
      provider: 'Apple',
      icon: FaApple,
      isLinked: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-white mb-2">Account Settings</h1>
      <p className="text-gray-400 mb-8">Manage your account preferences and security</p>
      
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 rounded-xl flex items-start gap-3 text-red-400">
          <div>
            <h3 className="font-medium mb-1">Error</h3>
            <p>{error}</p>
          </div>
        </div>
      )}
      
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-500/10 rounded-xl flex items-start gap-3 text-green-400">
          <FaCircleCheck className="mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium mb-1">Success</h3>
            <p>Your password has been updated successfully.</p>
          </div>
        </div>
      )}
      
      <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222] mb-6">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#50E3C2]/10 rounded-lg text-[#50E3C2]">
              <FaUnlock size={20} />
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-white mb-1">Password</h2>
              <p className="text-gray-400 max-w-xl">
                Update your password to keep your account secure.
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handlePasswordSubmit} className="border-t border-[#222]">
          <div className="p-6 grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="currentPassword">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                placeholder="Enter your current password"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                placeholder="Enter a new password"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                placeholder="Confirm your new password"
                required
              />
            </div>
          </div>
          
          <div className="px-6 py-4 bg-[#0d0d0d] border-t border-[#222] flex justify-end">
            <button
              type="submit"
              disabled={status === 'saving'}
              className={`py-2 px-4 rounded-lg bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black font-medium ${
                status === 'saving' ? 'opacity-70' : ''
              }`}
            >
              {status === 'saving' ? (
                <span className="flex items-center gap-2">
                  <FaCircleNotch className="animate-spin" />
                  Updating...
                </span>
              ) : (
                'Update Password'
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222] mb-6">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#333]/50 rounded-lg text-gray-300">
              <FaBriefcase size={20} />
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-white mb-1">Account Preferences</h2>
              <p className="text-gray-400 max-w-xl">
                Manage your account preferences and settings.
              </p>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-[#222]">
              <div>
                <h3 className="text-white font-medium">Account Type</h3>
                <p className="text-gray-400 text-sm">Your current account type</p>
              </div>
              <div className="flex items-center gap-2 bg-[#333]/20 py-1 px-3 rounded-full">
                <span className="text-[#50E3C2] text-sm font-medium">Premium</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-[#222]">
              <div>
                <h3 className="text-white font-medium">Account Email</h3>
                <p className="text-gray-400 text-sm">{user?.email || 'user@example.com'}</p>
              </div>
              <button className="text-sm py-1 px-3 rounded-lg text-gray-300 border border-[#333] hover:bg-[#222] transition-colors">
                Update
              </button>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-[#222]">
              <div>
                <h3 className="text-white font-medium">Time Zone</h3>
                <p className="text-gray-400 text-sm">Current time zone setting</p>
              </div>
              <select className="bg-[#1a1a1a] text-gray-300 border border-[#333] rounded-lg py-1 px-3 text-sm">
                <option value="utc">UTC (Coordinated Universal Time)</option>
                <option value="est">EST (Eastern Standard Time)</option>
                <option value="cst">CST (Central Standard Time)</option>
                <option value="pst">PST (Pacific Standard Time)</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="text-white font-medium">Language</h3>
                <p className="text-gray-400 text-sm">Interface language preference</p>
              </div>
              <select className="bg-[#1a1a1a] text-gray-300 border border-[#333] rounded-lg py-1 px-3 text-sm">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222]">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#333]/50 rounded-lg text-gray-300">
              <FaGlobe size={20} />
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-white mb-1">Linked Accounts</h2>
              <p className="text-gray-400 max-w-xl">
                Connect your account with third-party services for easier sign-in.
              </p>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            {linkedAccounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-[#222] last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                    <account.icon size={20} className="text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{account.provider}</h3>
                    {account.isLinked && account.email && (
                      <p className="text-gray-400 text-sm">{account.email}</p>
                    )}
                  </div>
                </div>
                
                {account.isLinked ? (
                  <button className="flex items-center gap-1 text-sm py-1 px-3 rounded-lg text-gray-300 border border-[#333] hover:bg-[#222] transition-colors">
                    <FaXmark size={12} />
                    <span>Disconnect</span>
                  </button>
                ) : (
                  <button className="text-sm py-1 px-3 rounded-lg text-gray-300 border border-[#333] hover:bg-[#222] transition-colors">
                    Connect
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 