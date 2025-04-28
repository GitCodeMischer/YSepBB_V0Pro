"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import TwoFactorAuth from '@/components/auth/TwoFactorAuth';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FaCircleInfo, 
  FaGoogle, 
  FaApple, 
  FaMicrosoft,
  FaCircleNotch,
  FaFingerprint,
  FaCircleCheck,
  FaWallet
} from 'react-icons/fa6';

// Integrated Social Auth Button that uses our AuthContext
function SocialAuthButton({ provider, isLoading, setIsLoading }) {
  const { loginWithProvider } = useAuth();

  const providerConfig = {
    google: {
      name: 'Google',
      icon: <FaGoogle className="text-lg" />,
      color: 'bg-white text-black hover:bg-gray-100'
    },
    apple: {
      name: 'Apple',
      icon: <FaApple className="text-lg" />,
      color: 'bg-black text-white border border-[#333] hover:bg-gray-900'
    },
    azure: {
      name: 'Microsoft',
      icon: <FaMicrosoft className="text-lg" />,
      color: 'bg-[#2F2F2F] text-white hover:bg-[#252525] border border-[#444]'
    }
  }[provider];
  
  if (!providerConfig) {
    return null;
  }
  
  const handleSignIn = async () => {
    try {
      setIsLoading(prevState => ({ ...prevState, [provider]: true }));
      
      // Login with provider (may redirect to 2FA)
      await loginWithProvider(provider);
      
      // Note: Redirect is handled by the auth context
    } catch (error) {
      console.error(`${provider} sign-in error:`, error);
      setIsLoading(prevState => ({ ...prevState, [provider]: false }));
    }
  };
  
  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl transition-all duration-300 ${providerConfig.color} ${
        isLoading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? (
        <FaCircleNotch className="animate-spin" />
      ) : (
        providerConfig.icon
      )}
      <span>
        Continue with {providerConfig.name}
      </span>
    </button>
  );
}

function PasskeyAuth({ onAuthenticate }) {
  const [status, setStatus] = useState("idle"); // idle, processing, success, error
  
  const handlePasskeyAuth = () => {
    setStatus("processing");
    setTimeout(() => {
      setStatus("success");
      onAuthenticate({ success: true });
    }, 1500);
  };
  
  return (
    <div className="w-full">
      <button
        onClick={handlePasskeyAuth}
        disabled={status === "processing" || status === "success"}
        className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl transition-all duration-300 glass-button ${
          status === "processing" ? "opacity-70" : ""
        } ${status === "success" ? "bg-opacity-50 border-[var(--success)]" : ""}`}
      >
        {status === "success" ? (
          <>
            <FaCircleCheck className="text-[var(--success)]" />
            <span className="text-[var(--success)]">Authenticated</span>
          </>
        ) : (
          <>
            <FaFingerprint className={`text-xl ${status === "processing" ? "animate-pulse" : ""}`} />
            <span>
              {status === "processing" ? "Processing..." : "Sign in with Passkey"}
            </span>
          </>
        )}
      </button>
    </div>
  );
}

function Web3WalletAuth({ onConnect }) {
  const [status, setStatus] = useState('idle');
  const [showWallets, setShowWallets] = useState(false);
  
  const handleConnect = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      onConnect({ success: true });
    }, 1500);
  };
  
  const toggleWalletsList = () => {
    if (status !== 'success') {
      setShowWallets(!showWallets);
      if (showWallets) {
        handleConnect();
      }
    }
  };
  
  return (
    <div className="w-full">
      <button
        onClick={toggleWalletsList}
        disabled={status === 'processing' || status === 'success'}
        className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl transition-all duration-300 glass-button ${
          status === 'processing' ? 'opacity-70' : ''
        } ${status === 'success' ? 'bg-opacity-50 border-[var(--success)]' : ''}`}
      >
        {status === 'success' ? (
          <>
            <FaCircleCheck className="text-[var(--success)]" />
            <span className="text-[var(--success)]">Connected to Wallet</span>
          </>
        ) : (
          <>
            <FaWallet className={`text-xl ${status === 'processing' ? 'animate-pulse' : ''}`} />
            <span>
              {status === 'processing' ? 'Connecting...' : 'Connect Wallet'}
            </span>
          </>
        )}
      </button>
    </div>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { 
    isAuthenticated, 
    loginWithCredentials, 
    requires2FA, 
    pendingLoginData,
    handle2FAVerification 
  } = useAuth();
  
  const [isLoading, setIsLoading] = useState({
    google: false,
    apple: false,
    azure: false
  });
  const [authError, setAuthError] = useState(null);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorMethods, setTwoFactorMethods] = useState(['app', 'sms', 'email']);
  const [pendingUser, setPendingUser] = useState(null);

  // Handle redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const callbackUrl = searchParams.get('callbackUrl') || '/finance-tracker/dashboard';
      router.push(callbackUrl);
      return;
    }
    
    // Check if 2FA is required from URL param (used after OAuth redirect)
    const require2FA = searchParams.get('require2FA') === 'true';
    if (require2FA || requires2FA) {
      setShowTwoFactor(true);
      
      // If we have pending login data, extract user info for 2FA
      if (pendingLoginData?.userData) {
        setPendingUser(pendingLoginData.userData);
        
        // Set available 2FA methods based on user data
        const methods = [];
        if (pendingLoginData.userData.provider === 'google') {
          methods.push('app');
        }
        methods.push('sms', 'email');
        setTwoFactorMethods(methods);
      }
    }
  }, [isAuthenticated, router, searchParams, requires2FA, pendingLoginData]);

  const handleSocialSuccess = (result) => {
    // For oauth/social logins, the 2FA requirement is handled in the loginWithProvider method
    // If 2FA is required, it will redirect back to login with the require2FA query param
    setShowTwoFactor(true);
  };

  const handleSocialError = (error) => {
    setAuthError(error);
    setIsLoading({
      google: false,
      apple: false,
      azure: false
    });
  };

  const handlePasskeyAuth = (result) => {
    if (result.success) {
      // Create mock user for passkey auth
      const mockUser = {
        name: 'Passkey User',
        email: 'passkey@example.com',
        provider: 'passkey',
        // 50% chance of requiring 2FA for demo purposes
        twoFactorEnabled: process.env.NODE_ENV === 'development' ? true : Math.random() > 0.5
      };
      
      // Login with our auth system
      const loginResult = loginWithCredentials(mockUser, 'passkey-auth-token', null, true);
      
      // If 2FA is required, show the 2FA form
      if (loginResult.requires2FA) {
        setPendingUser(mockUser);
        setTwoFactorMethods(['app', 'sms', 'email']);
        setShowTwoFactor(true);
        return;
      }
      
      // Otherwise, redirect based on callback url or default
      const callbackUrl = searchParams.get('callbackUrl') || '/finance-tracker/dashboard';
      router.push(callbackUrl);
    }
  };

  const handleWeb3Connect = (result) => {
    if (result.success) {
      // Create mock user for wallet auth
      const mockUser = {
        name: 'Wallet User',
        email: 'wallet@example.com',
        provider: 'web3',
        // Web3 users don't require 2FA for demo
        twoFactorEnabled: false
      };
      
      // Login with our auth system
      const loginResult = loginWithCredentials(mockUser, 'web3-auth-token', null, true);
      
      // Redirect based on callback url or default
      const callbackUrl = searchParams.get('callbackUrl') || '/finance-tracker/dashboard';
      router.push(callbackUrl);
    }
  };

  const handleTwoFactorVerify = (result) => {
    if (result.success) {
      // Complete the authentication process using the auth context
      const verificationSuccessful = handle2FAVerification(result);
      
      if (verificationSuccessful) {
        // Redirect after successful 2FA
        const callbackUrl = searchParams.get('callbackUrl') || '/finance-tracker/dashboard';
        router.push(callbackUrl);
      } else {
        setAuthError('Failed to complete authentication after 2FA verification');
        setShowTwoFactor(false);
      }
    }
  };

  const handleBackFromTwoFactor = () => {
    setShowTwoFactor(false);
    // Clear any pending login data when canceling 2FA
    setPendingUser(null);
  };

  // Render 2FA verification if needed
  if (showTwoFactor) {
    return (
      <AuthLayout>
        <TwoFactorAuth 
          onVerify={handleTwoFactorVerify}
          onBack={handleBackFromTwoFactor}
          email={pendingUser?.email || 'user@example.com'}
          phone={pendingUser?.phone || '+1 (•••) •••-1234'}
          methods={twoFactorMethods}
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Sign in to YSepBB"
      subtitle="Choose your preferred authentication method"
    >
      {authError && (
        <div className="mb-6 p-3 bg-[var(--danger)] bg-opacity-20 border border-[var(--danger)] text-white rounded-xl flex items-start gap-3">
          <FaCircleInfo className="text-[var(--danger)] mt-0.5" />
          <p className="text-sm">{authError}</p>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="space-y-3">
          <SocialAuthButton 
            provider="google" 
            isLoading={isLoading.google}
            setIsLoading={setIsLoading}
          />
          
          <SocialAuthButton 
            provider="apple" 
            isLoading={isLoading.apple}
            setIsLoading={setIsLoading}
          />
          
          <SocialAuthButton 
            provider="azure" 
            isLoading={isLoading.azure}
            setIsLoading={setIsLoading}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#444]"></div>
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-[#444]"></div>
        </div>
        
        <div className="space-y-3">
          <PasskeyAuth onAuthenticate={handlePasskeyAuth} />
          
          <Web3WalletAuth onConnect={handleWeb3Connect} />
        </div>
        
        <div className="pt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link 
              href="/auth/signup" 
              className="text-[#50E3C2] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>}>
      <LoginContent />
    </Suspense>
  );
} 