"use client";

import React, { useState } from 'react';
import { 
  FaMessage, 
  FaCircleCheck, 
  FaCircleNotch,
  FaBell,
  FaLock
} from 'react-icons/fa6';

export default function MessagesSettings() {
  const [formData, setFormData] = useState({
    emailNotifications: true,
    pushNotifications: false,
    messagePreview: true,
    soundAlerts: true,
    readReceipts: true,
    autoReply: false,
    autoReplyMessage: 'I am currently unavailable and will respond to your message soon.',
    blockMessages: false,
    messagePrivacy: 'everyone'
  });
  const [status, setStatus] = useState('idle'); // idle, saving, success, error
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      console.log('Message settings updated:', formData);
      
      setStatus('success');
      
      // Reset status after a delay
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error updating message settings:', error);
      setStatus('error');
      setError(error.message || 'Failed to update message settings. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-white mb-2">Message Settings</h1>
      <p className="text-gray-400 mb-8">Manage your message preferences and privacy</p>
      
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
            <p>Your message settings have been updated successfully.</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222] mb-6">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#50E3C2]/10 rounded-lg text-[#50E3C2]">
                <FaBell size={20} />
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-white mb-1">Notification Settings</h2>
                <p className="text-gray-400 max-w-xl">
                  Configure how you receive message notifications.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#222]">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Email Notifications</h3>
                  <p className="text-gray-400 text-sm">Receive email notifications for new messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Push Notifications</h3>
                  <p className="text-gray-400 text-sm">Receive browser notifications for new messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="pushNotifications"
                    checked={formData.pushNotifications}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Message Preview</h3>
                  <p className="text-gray-400 text-sm">Show message content in notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="messagePreview"
                    checked={formData.messagePreview}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Sound Alerts</h3>
                  <p className="text-gray-400 text-sm">Play sound when new messages arrive</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="soundAlerts"
                    checked={formData.soundAlerts}
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
                <FaMessage size={20} />
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-white mb-1">Message Preferences</h2>
                <p className="text-gray-400 max-w-xl">
                  Configure how your messages work and appear.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#222]">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Read Receipts</h3>
                  <p className="text-gray-400 text-sm">Show others when you've read their messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="readReceipts"
                    checked={formData.readReceipts}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Auto Reply</h3>
                  <p className="text-gray-400 text-sm">Automatically reply to new messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="autoReply"
                    checked={formData.autoReply}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              {formData.autoReply && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="autoReplyMessage">
                    Auto Reply Message
                  </label>
                  <textarea
                    id="autoReplyMessage"
                    name="autoReplyMessage"
                    value={formData.autoReplyMessage}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                    placeholder="Enter your auto-reply message"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222] mb-6">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#333]/50 rounded-lg text-gray-300">
                <FaLock size={20} />
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-white mb-1">Privacy Settings</h2>
                <p className="text-gray-400 max-w-xl">
                  Control who can message you and how your messages are handled.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#222]">
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Who can message you
                </label>
                <select
                  name="messagePrivacy"
                  value={formData.messagePrivacy}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                >
                  <option value="everyone">Everyone</option>
                  <option value="connections">Connections only</option>
                  <option value="nobody">No one (messages disabled)</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Block Unsolicited Messages</h3>
                  <p className="text-gray-400 text-sm">Block messages from users you don't follow</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    name="blockMessages"
                    checked={formData.blockMessages}
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