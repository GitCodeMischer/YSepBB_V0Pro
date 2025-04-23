"use client";

import React, { useState } from 'react';
import { 
  FaBell, 
  FaCircleCheck, 
  FaCircleNotch,
  FaEnvelope,
  FaMobile,
  FaDesktop
} from 'react-icons/fa6';

export default function NotificationSettings() {
  const [formData, setFormData] = useState({
    // Email notifications
    emailNewsletter: true,
    emailAccountUpdates: true,
    emailSecurity: true,
    emailTransactions: true,
    emailMarketing: false,
    
    // Push notifications
    pushMessages: true,
    pushComments: true,
    pushMentions: true,
    pushTransactions: true,
    pushAccountActivity: true,
    
    // SMS notifications
    smsAccountActivity: false,
    smsTransactions: true,
    smsSecurity: true,
    
    // In-app notifications
    inAppMessages: true,
    inAppComments: true,
    inAppMentions: true,
    inAppTransactions: true,
    inAppUpdates: true
  });
  const [status, setStatus] = useState('idle'); // idle, saving, success, error
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
    
    // Clear any previous error
    if (status === 'error') {
      setStatus('idle');
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setStatus('saving');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would call an API
      console.log('Notification settings updated:', formData);
      
      setStatus('success');
      
      // Reset status after a delay
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error updating notification settings:', error);
      setStatus('error');
      setError(error.message || 'Failed to update notification settings. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-white mb-2">Notification Settings</h1>
      <p className="text-gray-400 mb-8">Manage how and when you receive notifications</p>
      
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
            <p>Your notification settings have been updated successfully.</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222] mb-6">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#50E3C2]/10 rounded-lg text-[#50E3C2]">
                <FaEnvelope size={20} />
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-white mb-1">Email Notifications</h2>
                <p className="text-gray-400 max-w-xl">
                  Configure which emails you receive from us.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#222]">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Newsletter</h3>
                  <p className="text-gray-400 text-sm">Receive our weekly newsletter with updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="emailNewsletter"
                    checked={formData.emailNewsletter}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Account Updates</h3>
                  <p className="text-gray-400 text-sm">Important information about your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="emailAccountUpdates"
                    checked={formData.emailAccountUpdates}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Security Alerts</h3>
                  <p className="text-gray-400 text-sm">Notifications about security issues and alerts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="emailSecurity"
                    checked={formData.emailSecurity}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Transactions</h3>
                  <p className="text-gray-400 text-sm">Receive emails about your financial transactions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="emailTransactions"
                    checked={formData.emailTransactions}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Marketing</h3>
                  <p className="text-gray-400 text-sm">Promotions, offers, and marketing communications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="emailMarketing"
                    checked={formData.emailMarketing}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222] mb-6">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#333]/50 rounded-lg text-gray-300">
                <FaDesktop size={20} />
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-white mb-1">Push Notifications</h2>
                <p className="text-gray-400 max-w-xl">
                  Configure which browser notifications you receive.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#222]">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Messages</h3>
                  <p className="text-gray-400 text-sm">Notifications for new messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="pushMessages"
                    checked={formData.pushMessages}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Comments</h3>
                  <p className="text-gray-400 text-sm">Notifications for comments on your posts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="pushComments"
                    checked={formData.pushComments}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Mentions</h3>
                  <p className="text-gray-400 text-sm">Notifications when someone mentions you</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="pushMentions"
                    checked={formData.pushMentions}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Transactions</h3>
                  <p className="text-gray-400 text-sm">Notifications for financial transactions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="pushTransactions"
                    checked={formData.pushTransactions}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222] mb-6">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#333]/50 rounded-lg text-gray-300">
                <FaMobile size={20} />
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-white mb-1">SMS Notifications</h2>
                <p className="text-gray-400 max-w-xl">
                  Configure which SMS notifications you receive.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#222]">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Account Activity</h3>
                  <p className="text-gray-400 text-sm">Important activity on your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="smsAccountActivity"
                    checked={formData.smsAccountActivity}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Transactions</h3>
                  <p className="text-gray-400 text-sm">SMS alerts for significant transactions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="smsTransactions"
                    checked={formData.smsTransactions}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Security Alerts</h3>
                  <p className="text-gray-400 text-sm">Important security notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="smsSecurity"
                    checked={formData.smsSecurity}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222] mb-6">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#333]/50 rounded-lg text-gray-300">
                <FaBell size={20} />
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-white mb-1">In-App Notifications</h2>
                <p className="text-gray-400 max-w-xl">
                  Configure which notifications appear within the app.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#222]">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Messages</h3>
                  <p className="text-gray-400 text-sm">Notifications for new messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="inAppMessages"
                    checked={formData.inAppMessages}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Comments</h3>
                  <p className="text-gray-400 text-sm">Notifications for comments on your posts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="inAppComments"
                    checked={formData.inAppComments}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Mentions</h3>
                  <p className="text-gray-400 text-sm">Notifications when someone mentions you</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="inAppMentions"
                    checked={formData.inAppMentions}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-white font-medium">Transactions</h3>
                  <p className="text-gray-400 text-sm">Notifications for financial transactions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="inAppTransactions"
                    checked={formData.inAppTransactions}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
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
                Saving...
              </span>
            ) : (
              'Save Settings'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 