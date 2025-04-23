// Authentication service to manage user session
import { useRouter } from 'next/navigation';

// Storage keys
const USER_KEY = 'ysepbb_user';
const TOKEN_KEY = 'ysepbb_token';
const REFRESH_TOKEN_KEY = 'ysepbb_refresh_token';

// Cookie expiration in days
const COOKIE_EXPIRES = 30; // 30 days

// Check if code is running in browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Set a cookie with the given name and value
 * @param {string} name - Cookie name 
 * @param {string} value - Cookie value
 * @param {number} days - Days until expiration
 */
const setCookie = (name, value, days = 0) => {
  if (!isBrowser) return;
  
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  
  const secure = process.env.NODE_ENV !== 'development' ? '; secure' : '';
  document.cookie = `${name}=${value}${expires}; path=/; samesite=strict${secure}`;
};

/**
 * Get cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|null} - Cookie value or null if not found
 */
const getCookie = (name) => {
  if (!isBrowser) return null;
  
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  
  return null;
};

/**
 * Remove a cookie by name
 * @param {string} name - Cookie name
 */
const eraseCookie = (name) => {
  if (!isBrowser) return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

/**
 * Sets a value in storage (cookies and localStorage/sessionStorage)
 * @param {string} key - Key to store under
 * @param {string} value - Value to store
 * @param {boolean} rememberMe - Whether to use persistent storage
 */
const setStorageItem = (key, value, rememberMe = false) => {
  if (!isBrowser || !value) return;
  
  // Store in cookie (accessible by middleware)
  setCookie(key, value, rememberMe ? COOKIE_EXPIRES : 0);
  
  // Also store in localStorage/sessionStorage for client-side access
  const storage = rememberMe ? localStorage : sessionStorage;
  try {
    storage.setItem(key, value);
  } catch (error) {
    console.error('Storage error:', error);
  }
};

/**
 * Removes item from all storage locations
 * @param {string} key - Key to remove
 */
const removeStorageItem = (key) => {
  if (!isBrowser) return;
  
  // Remove from cookies
  eraseCookie(key);
  
  // Remove from local/session storage
  try {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('Storage error:', error);
  }
};

/**
 * Handles login process and stores user data in localStorage/sessionStorage/cookies
 * @param {Object} userData - User data to store
 * @param {string} token - Auth token
 * @param {string} refreshToken - Refresh token
 * @param {boolean} rememberMe - Whether to use persistent storage
 * @returns {Object} - User data
 */
export const login = (userData, token, refreshToken, rememberMe = false) => {
  if (!isBrowser || !userData || !token) return;
  
  // Store user data
  setStorageItem(USER_KEY, JSON.stringify(userData), rememberMe);
  
  // Store tokens
  setStorageItem(TOKEN_KEY, token, rememberMe);
  
  if (refreshToken) {
    setStorageItem(REFRESH_TOKEN_KEY, refreshToken, rememberMe);
  }
  
  return userData;
};

/**
 * Logs out the user by removing all auth data from storage
 */
export const logout = () => {
  if (!isBrowser) return;
  
  removeStorageItem(USER_KEY);
  removeStorageItem(TOKEN_KEY);
  removeStorageItem(REFRESH_TOKEN_KEY);
};

/**
 * Get current user data from storage
 * @returns {Object|null} User data or null if not logged in
 */
export const getCurrentUser = () => {
  if (!isBrowser) return null;
  
  // Check storage locations in order of precedence
  const userFromSession = sessionStorage.getItem(USER_KEY);
  const userFromLocal = localStorage.getItem(USER_KEY);
  
  if (userFromSession) {
    try {
      return JSON.parse(userFromSession);
    } catch (e) {
      removeStorageItem(USER_KEY);
      return null;
    }
  }
  
  if (userFromLocal) {
    try {
      return JSON.parse(userFromLocal);
    } catch (e) {
      removeStorageItem(USER_KEY);
      return null;
    }
  }
  
  return null;
};

/**
 * Get authentication token
 * @returns {string|null} Auth token or null if not available
 */
export const getToken = () => {
  if (!isBrowser) return null;
  
  // Check cookie first (most authoritative)
  const tokenFromCookie = getCookie(TOKEN_KEY);
  if (tokenFromCookie) return tokenFromCookie;
  
  // Fallback to session/local storage
  return sessionStorage.getItem(TOKEN_KEY) || 
         localStorage.getItem(TOKEN_KEY) || 
         null;
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Custom hook for handling authentication-related redirects
 */
export const useAuth = () => {
  const router = useRouter();
  
  const logoutAndRedirect = () => {
    logout();
    router.push('/auth/login');
  };
  
  return {
    login,
    logout: logoutAndRedirect,
    getCurrentUser,
    isAuthenticated,
    getToken
  };
};

export default {
  login,
  logout,
  getCurrentUser,
  getToken,
  isAuthenticated,
  useAuth
}; 