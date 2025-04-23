"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  login as authLogin, 
  logout as authLogout, 
  getCurrentUser,
  getToken,
  isAuthenticated as checkAuth 
} from '@/services/authService';
import {
  is2FAEnabled,
  set2FAStatus
} from '@/services/twoFactorAuthService';

// Create the auth context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingLoginData, setPendingLoginData] = useState(null);
  const [requires2FA, setRequires2FA] = useState(false);

  // Initialize auth state - this will handle custom auth
  useEffect(() => {
    // Only run in client
    if (typeof window === 'undefined') {
      return;
    }
    
    const initAuth = () => {
      try {
        // Check our custom auth
        const currentUser = getCurrentUser();
        const authenticated = checkAuth();
        
        if (authenticated && currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Check if user requires 2FA verification
   * @param {Object} userData - User data
   * @returns {boolean} - Whether user requires 2FA
   */
  const checkIf2FARequired = (userData) => {
    // Check if the user has 2FA enabled
    return is2FAEnabled(userData);
  };

  /**
   * Handle 2FA verification for a user
   * @param {Object} verificationResult - Result from 2FA verification
   * @returns {boolean} - Whether verification was successful
   */
  const handle2FAVerification = (verificationResult) => {
    try {
      if (!pendingLoginData) {
        console.error('No pending login data for 2FA verification');
        return false;
      }

      if (verificationResult.success) {
        const { userData, token, refreshToken, rememberMe } = pendingLoginData;
        
        // Add 2FA verification info to user data
        const enhancedUserData = {
          ...userData,
          lastVerifiedAt: new Date().toISOString(),
          verificationMethod: verificationResult.method || 'app'
        };
        
        // Complete the login process
        authLogin(enhancedUserData, token, refreshToken, rememberMe);
        setUser(enhancedUserData);
        setIsAuthenticated(true);
        setPendingLoginData(null);
        setRequires2FA(false);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('2FA verification error:', error);
      return false;
    }
  };

  /**
   * Login with custom credentials
   * @param {Object} userData - User data to store
   * @param {string} token - Auth token
   * @param {string} refreshToken - Refresh token (optional)
   * @param {boolean} rememberMe - Whether to use persistent storage
   * @param {boolean} skipTwoFactor - Whether to skip 2FA check (for demo)
   * @returns {Object} - Login result object
   */
  const loginWithCredentials = (userData, token, refreshToken, rememberMe = false, skipTwoFactor = false) => {
    try {
      // Check if user requires 2FA and it's not being skipped
      if (!skipTwoFactor && checkIf2FARequired(userData)) {
        // Store pending login data for 2FA verification
        setPendingLoginData({
          userData,
          token,
          refreshToken,
          rememberMe
        });
        setRequires2FA(true);
        
        return {
          success: false,
          requires2FA: true,
          message: 'Two-factor authentication required'
        };
      }
      
      // No 2FA required or being skipped, proceed with login
      authLogin(userData, token, refreshToken, rememberMe);
      setUser(userData);
      setIsAuthenticated(true);
      
      return {
        success: true,
        message: 'Login successful'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'Login failed'
      };
    }
  };

  /**
   * Login with OAuth provider via API redirect
   */
  const loginWithProvider = async (provider) => {
    try {
      // Redirect to the provider's authorization endpoint
      // This simulates what NextAuth would do by directly using the API route
      const callbackUrl = '/finance-tracker/dashboard';
      
      // For development, we'll simulate this by redirecting after a short delay
      console.log(`Simulating login with ${provider}`);
      
      // Mock provider
      const mockUser = {
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: `${provider}@example.com`,
        provider: provider,
        image: `https://ui-avatars.com/api/?name=${provider.charAt(0).toUpperCase()}&background=50E3C2&color=000&bold=true`,
        // For demo purposes, we'll set Google users to require 2FA
        twoFactorEnabled: provider === 'google'
      };
      
      // Login with our auth system (simulate OAuth success)
      const loginResult = loginWithCredentials(
        mockUser, 
        `${provider}-oauth-token`, 
        null, 
        true
      );
      
      // If 2FA is required, redirect to login page with 2FA flag
      if (loginResult.requires2FA) {
        router.push('/auth/login?require2FA=true');
        return loginResult;
      }
      
      // Otherwise redirect to dashboard
      setTimeout(() => {
        router.push(callbackUrl);
      }, 1000);
      
      return {
        success: true,
        message: `Logged in with ${provider}`
      };
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      return {
        success: false,
        message: error.message || `Failed to login with ${provider}`
      };
    }
  };

  /**
   * Update 2FA status for a user
   * @param {boolean} enabled - Whether to enable or disable 2FA
   * @returns {boolean} - Whether operation was successful
   */
  const updateTwoFactorStatus = (enabled) => {
    try {
      if (!user) return false;
      
      const updatedUser = set2FAStatus(user, enabled);
      if (!updatedUser) return false;
      
      // Re-login with updated user data
      authLogin(updatedUser, getToken(), null, true);
      setUser(updatedUser);
      
      return true;
    } catch (error) {
      console.error('Error updating 2FA status:', error);
      return false;
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      // Log out from our custom auth
      authLogout();
      
      // Update local state
      setUser(null);
      setIsAuthenticated(false);
      setPendingLoginData(null);
      setRequires2FA(false);
      
      // Redirect to login page
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  /**
   * Update user data in storage
   */
  const updateUser = (newUserData) => {
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) return false;
      
      const updatedUser = { ...currentUser, ...newUserData };
      const token = getToken();
      
      // Re-login with updated user data and keep the same authentication token
      authLogin(updatedUser, token, null, true);
      setUser(updatedUser);
      
      return true;
    } catch (error) {
      console.error('Update user error:', error);
      return false;
    }
  };

  // Auth context value
  const value = {
    user,
    isAuthenticated,
    loading,
    requires2FA,
    pendingLoginData,
    loginWithCredentials,
    loginWithProvider,
    handle2FAVerification,
    updateTwoFactorStatus,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext; 