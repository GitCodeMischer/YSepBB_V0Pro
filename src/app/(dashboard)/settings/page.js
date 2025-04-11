'use client';

import React from 'react';
import {
  FaUser,
  FaBell,
  FaLock,
  FaSliders,
  FaPaintbrush,
  FaCircleQuestion,
  FaGear,
  FaArrowRight,
  FaBitcoin,
  FaEthereum,
  FaKey,
  FaMoon,
  FaSun,
  FaGlobe,
  FaShieldHalved,
  FaWallet
} from 'react-icons/fa6';
import { SiSolana } from 'react-icons/si';

export default function SettingsPage() {
  const settingsCategories = [
    {
      title: 'Account Settings',
      icon: <FaUser size={18} className="text-[var(--primary)]" />,
      items: ['Profile Information', 'Email Preferences', 'Connected Wallets']
    },
    {
      title: 'Notifications',
      icon: <FaBell size={18} className="text-[var(--primary)]" />,
      items: ['Push Notifications', 'Email Notifications', 'Price Alerts']
    },
    {
      title: 'Security',
      icon: <FaLock size={18} className="text-[var(--primary)]" />,
      items: ['Two-Factor Authentication', 'Password Settings', 'Login History']
    },
    {
      title: 'Preferences',
      icon: <FaSliders size={18} className="text-[var(--primary)]" />,
      items: ['Language & Region', 'Currency Display', 'Trading Preferences']
    },
    {
      title: 'Appearance',
      icon: <FaPaintbrush size={18} className="text-[var(--primary)]" />,
      items: ['Theme Settings', 'Layout Options', 'Customize Dashboard']
    },
    {
      title: 'Help & Support',
      icon: <FaCircleQuestion size={18} className="text-[var(--primary)]" />,
      items: ['Documentation', 'Contact Support', 'FAQ & Troubleshooting']
    }
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>

      {/* Profile Section */}
      <section className="card p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[var(--primary)]/30 mb-4 md:mb-0 md:mr-6">
            <img 
              src="https://i.pravatar.cc/200?img=8" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">PIchOffith</h2>
            <p className="text-[var(--muted-foreground)] mb-3">morgan.smith@example.com</p>
            <div className="flex flex-wrap gap-2">
              <button className="glass-button px-4 py-2 text-sm">
                Edit Profile
              </button>
              <button className="glass-button px-4 py-2 text-sm">
                View Public Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Connected Wallets */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Connected Wallets</h2>
        <div className="card">
          <div className="space-y-4 p-4 md:p-6">
            {/* Bitcoin Wallet */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[var(--muted)]/20 rounded-xl">
              <div className="flex items-center mb-3 sm:mb-0">
                <div className="w-10 h-10 rounded-lg bg-[#F7931A]/20 flex items-center justify-center text-[#F7931A] mr-4">
                  <FaBitcoin size={20} />
                </div>
                <div>
                  <div className="font-medium">Bitcoin Wallet</div>
                  <div className="text-xs text-[var(--muted-foreground)]">bc1q...8x4z</div>
                </div>
              </div>
              <button className="glass-button px-3 py-1 text-xs flex items-center">
                <FaGear size={12} className="mr-2" />
                Manage
              </button>
            </div>
            
            {/* Ethereum Wallet */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[var(--muted)]/20 rounded-xl">
              <div className="flex items-center mb-3 sm:mb-0">
                <div className="w-10 h-10 rounded-lg bg-[#627EEA]/20 flex items-center justify-center text-[#627EEA] mr-4">
                  <FaEthereum size={20} />
                </div>
                <div>
                  <div className="font-medium">Ethereum Wallet</div>
                  <div className="text-xs text-[var(--muted-foreground)]">0x3F...4b2C</div>
                </div>
              </div>
              <button className="glass-button px-3 py-1 text-xs flex items-center">
                <FaGear size={12} className="mr-2" />
                Manage
              </button>
            </div>
            
            {/* Add Wallet Button */}
            <button className="w-full p-3 border border-dashed border-[var(--card-border)] rounded-xl text-[var(--muted-foreground)] hover:text-white hover:border-[var(--primary)]/30 transition-all duration-300 flex items-center justify-center">
              <FaWallet size={16} className="mr-2" />
              Connect New Wallet
            </button>
          </div>
        </div>
      </section>
      
      {/* Settings Categories */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {settingsCategories.map((category, index) => (
            <div key={index} className="settings-card p-4 hover:shadow-lg hover:shadow-[#50E3C280] transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mr-3">
                  {category.icon}
                </div>
                <h3 className="text-lg font-medium">{category.title}</h3>
              </div>
              <ul className="space-y-2 text-sm">
                {category.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between p-2 hover:bg-[var(--muted)]/20 rounded-lg transition-all duration-200 cursor-pointer">
                    <span>{item}</span>
                    <FaArrowRight size={12} className="text-[var(--muted-foreground)]" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 