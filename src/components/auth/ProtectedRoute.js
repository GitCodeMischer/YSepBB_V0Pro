"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

/**
 * ProtectedRoute - A component that ensures the user is authenticated before rendering children
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {string} [props.redirectTo='/auth/login'] - Where to redirect if not authenticated
 * @returns {React.ReactNode|null} - The children if authenticated, null if redirecting
 */
const ProtectedRoute = ({ children, redirectTo = '/auth/login' }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until auth state is loaded
    if (!loading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, redirectTo, router]);

  // If still loading or not authenticated, don't render the children
  if (loading || !isAuthenticated) {
    return null; // Or a loading component
  }

  // User is authenticated, render the children
  return children;
};

export default ProtectedRoute; 