'use client';

import React, { useState } from 'react';
import { 
  FaGear, 
  FaUser, 
  FaBell, 
  FaShield, 
  FaWallet, 
  FaLink, 
  FaFileExport,
  FaMoon,
  FaSun
} from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(true);
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Profile Settings</h2>
            
            <div className="bg-[#131313] rounded-2xl p-6 border border-[#222]/40 mb-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#50E3C2]/20 to-[#3CCEA7]/20 flex items-center justify-center border border-[#50E3C2]/20 mr-4">
                  <img 
                    src="https://ui-avatars.com/api/?name=P+O&background=50E3C2&color=000&bold=true" 
                    alt="Profile" 
                    className="w-full h-full rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium">PIchOffith</h3>
                  <p className="text-gray-400 text-sm">Premium Plan User</p>
                </div>
                <button className="ml-auto px-4 py-2 bg-[#1a1a1a] hover:bg-[#222] text-white rounded-xl text-sm transition-colors">
                  Change Photo
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#1a1a1a] text-white rounded-xl border border-[#333] px-4 py-2.5"
                    value="PIchOffith"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-[#1a1a1a] text-white rounded-xl border border-[#333] px-4 py-2.5"
                    value="pichoffith@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full bg-[#1a1a1a] text-white rounded-xl border border-[#333] px-4 py-2.5"
                    value="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Currency</label>
                  <select className="w-full bg-[#1a1a1a] text-white rounded-xl border border-[#333] px-4 py-2.5">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>JPY (¥)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-[#131313] rounded-2xl p-6 border border-[#222]/40">
              <h3 className="text-white font-medium mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Current Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-[#1a1a1a] text-white rounded-xl border border-[#333] px-4 py-2.5"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">New Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-[#1a1a1a] text-white rounded-xl border border-[#333] px-4 py-2.5"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-[#1a1a1a] text-white rounded-xl border border-[#333] px-4 py-2.5"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Notification Settings</h2>
            
            <div className="bg-[#131313] rounded-2xl p-6 border border-[#222]/40">
              <h3 className="text-white font-medium mb-6">Email Notifications</h3>
              
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-white">Transaction Alerts</h4>
                    <p className="text-gray-400 text-sm">Receive alerts for new transactions</p>
                  </div>
                  <div className="h-6 w-12 rounded-full bg-[#50E3C2]/20 relative cursor-pointer">
                    <div className="absolute right-1 top-1 bottom-1 w-4 rounded-full bg-[#50E3C2]"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-white">Budget Alerts</h4>
                    <p className="text-gray-400 text-sm">Alerts when you approach budget limits</p>
                  </div>
                  <div className="h-6 w-12 rounded-full bg-[#50E3C2]/20 relative cursor-pointer">
                    <div className="absolute right-1 top-1 bottom-1 w-4 rounded-full bg-[#50E3C2]"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-white">Account Summaries</h4>
                    <p className="text-gray-400 text-sm">Weekly account summary reports</p>
                  </div>
                  <div className="h-6 w-12 rounded-full bg-[#333] relative cursor-pointer">
                    <div className="absolute left-1 top-1 bottom-1 w-4 rounded-full bg-[#666]"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-white">Marketing Communications</h4>
                    <p className="text-gray-400 text-sm">News and special offers</p>
                  </div>
                  <div className="h-6 w-12 rounded-full bg-[#333] relative cursor-pointer">
                    <div className="absolute left-1 top-1 bottom-1 w-4 rounded-full bg-[#666]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>
            
            <div className="bg-[#131313] rounded-2xl p-6 border border-[#222]/40 mb-6">
              <h3 className="text-white font-medium mb-6">Two-Factor Authentication</h3>
              
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-white">Enable 2FA</h4>
                  <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                </div>
                <div className="h-6 w-12 rounded-full bg-[#333] relative cursor-pointer">
                  <div className="absolute left-1 top-1 bottom-1 w-4 rounded-full bg-[#666]"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#131313] rounded-2xl p-6 border border-[#222]/40 mb-6">
              <h3 className="text-white font-medium mb-4">Session Management</h3>
              <p className="text-gray-400 text-sm mb-6">You're currently logged in from these devices:</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-[#222] flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white text-sm">Windows PC - Chrome</h4>
                      <p className="text-gray-500 text-xs">Current session</p>
                    </div>
                  </div>
                  <button className="text-[#50E3C2] text-sm">Active</button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-[#222] flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white text-sm">iPhone 13 - Safari</h4>
                      <p className="text-gray-500 text-xs">Last active: 2 hours ago</p>
                    </div>
                  </div>
                  <button className="text-red-400 text-sm">Logout</button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'appearance':
        return (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Appearance Settings</h2>
            
            <div className="bg-[#131313] rounded-2xl p-6 border border-[#222]/40 mb-6">
              <h3 className="text-white font-medium mb-6">Theme</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`p-4 rounded-xl cursor-pointer ${darkMode ? 'border-2 border-[#50E3C2]' : 'border border-[#333]'}`}
                  onClick={() => setDarkMode(true)}
                >
                  <div className="flex items-center mb-3">
                    <FaMoon size={16} className="text-[#50E3C2] mr-2" />
                    <h4 className="text-white">Dark Mode</h4>
                  </div>
                  <div className="h-20 bg-[#0A0A0A] rounded-lg"></div>
                </div>
                
                <div 
                  className={`p-4 rounded-xl cursor-pointer ${!darkMode ? 'border-2 border-[#50E3C2]' : 'border border-[#333]'}`}
                  onClick={() => setDarkMode(false)}
                >
                  <div className="flex items-center mb-3">
                    <FaSun size={16} className="text-[#50E3C2] mr-2" />
                    <h4 className="text-white">Light Mode</h4>
                  </div>
                  <div className="h-20 bg-gray-100 rounded-lg"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#131313] rounded-2xl p-6 border border-[#222]/40">
              <h3 className="text-white font-medium mb-6">Accent Color</h3>
              
              <div className="flex flex-wrap gap-3">
                <div className="w-10 h-10 rounded-full bg-[#50E3C2] ring-2 ring-white ring-offset-2 ring-offset-[#131313] cursor-pointer"></div>
                <div className="w-10 h-10 rounded-full bg-[#3b82f6] cursor-pointer"></div>
                <div className="w-10 h-10 rounded-full bg-[#8b5cf6] cursor-pointer"></div>
                <div className="w-10 h-10 rounded-full bg-[#ec4899] cursor-pointer"></div>
                <div className="w-10 h-10 rounded-full bg-[#f97316] cursor-pointer"></div>
                <div className="w-10 h-10 rounded-full bg-[#84cc16] cursor-pointer"></div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Layout>
      <PageContainer 
        title="Settings" 
        subtitle="Customize your finance tracker experience"
        icon={<FaGear size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-[#131313] rounded-2xl border border-[#222]/40 overflow-hidden">
              <nav className="flex flex-col">
                <button 
                  className={`flex items-center px-4 py-3 text-left transition-colors ${activeTab === 'profile' ? 'bg-[#50E3C2]/10 text-[#50E3C2]' : 'text-gray-300 hover:bg-[#1a1a1a]'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FaUser size={16} className="mr-3" />
                  <span>Profile</span>
                </button>
                
                <button 
                  className={`flex items-center px-4 py-3 text-left transition-colors ${activeTab === 'notifications' ? 'bg-[#50E3C2]/10 text-[#50E3C2]' : 'text-gray-300 hover:bg-[#1a1a1a]'}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <FaBell size={16} className="mr-3" />
                  <span>Notifications</span>
                </button>
                
                <button 
                  className={`flex items-center px-4 py-3 text-left transition-colors ${activeTab === 'security' ? 'bg-[#50E3C2]/10 text-[#50E3C2]' : 'text-gray-300 hover:bg-[#1a1a1a]'}`}
                  onClick={() => setActiveTab('security')}
                >
                  <FaShield size={16} className="mr-3" />
                  <span>Security</span>
                </button>
                
                <button 
                  className={`flex items-center px-4 py-3 text-left transition-colors ${activeTab === 'appearance' ? 'bg-[#50E3C2]/10 text-[#50E3C2]' : 'text-gray-300 hover:bg-[#1a1a1a]'}`}
                  onClick={() => setActiveTab('appearance')}
                >
                  <FaMoon size={16} className="mr-3" />
                  <span>Appearance</span>
                </button>
                
                <button 
                  className={`flex items-center px-4 py-3 text-left transition-colors ${activeTab === 'connected' ? 'bg-[#50E3C2]/10 text-[#50E3C2]' : 'text-gray-300 hover:bg-[#1a1a1a]'}`}
                  onClick={() => setActiveTab('connected')}
                >
                  <FaLink size={16} className="mr-3" />
                  <span>Connected Accounts</span>
                </button>
                
                <button 
                  className={`flex items-center px-4 py-3 text-left transition-colors ${activeTab === 'data' ? 'bg-[#50E3C2]/10 text-[#50E3C2]' : 'text-gray-300 hover:bg-[#1a1a1a]'}`}
                  onClick={() => setActiveTab('data')}
                >
                  <FaFileExport size={16} className="mr-3" />
                  <span>Data & Privacy</span>
                </button>
              </nav>
            </div>
          </div>
          
          <div className="md:col-span-3">
            {renderTabContent()}
            
            <div className="flex justify-end mt-8">
              <button className="px-5 py-2.5 bg-[#131313] text-gray-300 rounded-xl hover:bg-[#1a1a1a] mr-3 transition-colors">
                Cancel
              </button>
              <button className="px-5 py-2.5 bg-[#50E3C2] text-black font-medium rounded-xl hover:bg-[#3CCEA7] transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
} 