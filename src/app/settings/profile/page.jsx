"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FaCircleUser, 
  FaCircleCheck, 
  FaCircleNotch 
} from 'react-icons/fa6';

export default function ProfileSettings() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    jobTitle: user?.jobTitle || '',
    bio: user?.bio || '',
    phoneNumber: user?.phoneNumber || '',
    location: user?.location || '',
    website: user?.website || '',
  });
  const [status, setStatus] = useState('idle'); // idle, saving, success, error
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      
      // Update user data in context (in a real app, this would call an API)
      updateUser({
        ...user,
        ...formData
      });
      
      setStatus('success');
      
      // Reset status after a delay
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setStatus('error');
      setError(error.message || 'Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-white mb-2">Profile Settings</h1>
      <p className="text-gray-400 mb-8">Manage your personal information and profile details</p>
      
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
            <p>Your profile has been updated successfully.</p>
          </div>
        </div>
      )}
      
      <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222] mb-6">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#50E3C2]/10 rounded-lg text-[#50E3C2]">
              <FaCircleUser size={20} />
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-white mb-1">Personal Information</h2>
              <p className="text-gray-400 max-w-xl">
                Update your personal information and how others see you on the platform.
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="border-t border-[#222]">
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                placeholder="First Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                placeholder="Last Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                placeholder="Email Address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                placeholder="Phone Number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="jobTitle">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                placeholder="Job Title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                placeholder="City, Country"
              />
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="website">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                placeholder="https://yourwebsite.com"
              />
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                placeholder="Tell us about yourself"
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
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222]">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#333]/50 rounded-lg text-gray-300">
              <FaCircleUser size={20} />
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-white mb-1">Profile Picture</h2>
              <p className="text-gray-400 max-w-xl">
                Upload a profile picture to personalize your account.
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center overflow-hidden">
              {user?.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt={`${formData.firstName} ${formData.lastName}`} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaCircleUser size={64} className="text-gray-600" />
              )}
            </div>
            
            <div>
              <button
                type="button"
                className="mb-2 py-2 px-4 rounded-lg bg-[#1a1a1a] text-white border border-[#333] hover:bg-[#222] transition-colors"
              >
                Upload new picture
              </button>
              <p className="text-xs text-gray-500">
                Recommended: Square image, at least 300x300 pixels, maximum 5MB.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 