"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import TwoFactorAuth from '@/components/auth/TwoFactorAuth';
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

// Mock components since we don't have the actual dependencies installed
function SocialAuthButton({ provider, isLoading, onSuccess, onError }) {
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
    // Mock authentication
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate
        onSuccess({ user: { name: 'Demo User', email: 'user@example.com' } });
      } else {
        onError('Authentication failed');
      }
    }, 1500);
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

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState({
    google: false,
    apple: false,
    azure: false
  });
  const [authError, setAuthError] = useState(null);
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const handleSocialSuccess = (result) => {
    // For demo, we'll simulate 2FA requirement
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
      // Simulate successful login redirect
      setTimeout(() => router.push('/finance-tracker/dashboard'), 1000);
    }
  };

  const handleWeb3Connect = (result) => {
    if (result.success) {
      // Simulate successful login redirect
      setTimeout(() => router.push('/finance-tracker/dashboard'), 1000);
    }
  };

  const handleTwoFactorVerify = (result) => {
    if (result.success) {
      // Simulate successful login redirect
      setTimeout(() => router.push('/finance-tracker/dashboard'), 1000);
    }
  };

  const handleBackFromTwoFactor = () => {
    setShowTwoFactor(false);
  };

  // Render 2FA verification if needed
  if (showTwoFactor) {
    return (
      <AuthLayout>
        <TwoFactorAuth 
          onVerify={handleTwoFactorVerify}
          onBack={handleBackFromTwoFactor}
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
            onSuccess={handleSocialSuccess}
            onError={handleSocialError}
          />
          
          <SocialAuthButton 
            provider="apple" 
            isLoading={isLoading.apple}
            onSuccess={handleSocialSuccess}
            onError={handleSocialError}
          />
          
          <SocialAuthButton 
            provider="azure" 
            isLoading={isLoading.azure}
            onSuccess={handleSocialSuccess}
            onError={handleSocialError}
          />
        </div>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--card-border)]"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-[var(--card-bg)] text-[var(--muted-foreground)] text-sm">
              or continue with
            </span>
          </div>
        </div>
        
        <PasskeyAuth onAuthenticate={handlePasskeyAuth} />
        
        <div className="mt-4">
          <Web3WalletAuth onConnect={handleWeb3Connect} />
        </div>
      </div>
      
      <div className="mt-8 text-center text-[var(--muted-foreground)] text-sm">
        Don't have an account?{' '}
        <Link href="/auth/signup" className="text-[var(--primary)] hover:underline">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
} 