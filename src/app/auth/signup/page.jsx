"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FaCircleInfo, 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaCircleCheck, 
  FaArrowRight,
  FaGoogle, 
  FaApple, 
  FaMicrosoft,
  FaCircleNotch,
  FaFingerprint,
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
      // Use the callbackUrl to indicate this is a signup
      await loginWithProvider(provider);
      // Redirect is handled by NextAuth
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

function PasskeyAuth({ onAuthenticate, mode = "login" }) {
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
            <span className="text-[var(--success)]">
              {mode === "register" ? "Passkey Registered" : "Authenticated"}
            </span>
          </>
        ) : (
          <>
            <FaFingerprint className={`text-xl ${status === "processing" ? "animate-pulse" : ""}`} />
            <span>
              {status === "processing"
                ? "Processing..."
                : mode === "register"
                ? "Register a Passkey"
                : "Sign in with Passkey"}
            </span>
          </>
        )}
      </button>
    </div>
  );
}

function Web3WalletAuth({ onConnect }) {
  const [status, setStatus] = useState('idle');
  
  const handleConnect = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      onConnect({ success: true });
    }, 1500);
  };
  
  return (
    <div className="w-full">
      <button
        onClick={handleConnect}
        disabled={status === 'processing' || status === 'success'}
        className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl transition-all duration-300 glass-button ${
          status === 'processing' ? 'opacity-70' : ''
        } ${status === 'success' ? 'bg-opacity-50 border-[var(--success)]' : ''}`}
      >
        {status === 'success' ? (
          <>
            <FaCircleCheck className="text-[var(--success)]" />
            <span className="text-[var(--success)]">
              Connected to Wallet
            </span>
          </>
        ) : (
          <>
            <FaWallet className={`text-xl ${status === 'processing' ? 'animate-pulse' : ''}`} />
            <span>
              {status === 'processing'
                ? 'Connecting...'
                : 'Connect Wallet'}
            </span>
          </>
        )}
      </button>
    </div>
  );
}

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, loginWithCredentials } = useAuth();
  
  const [isLoading, setIsLoading] = useState({
    google: false,
    apple: false,
    azure: false,
    form: false
  });
  const [authError, setAuthError] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [signupStep, setSignupStep] = useState('method'); // method, form, success
  const [signupMethod, setSignupMethod] = useState(null);

  // Handle redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const callbackUrl = searchParams.get('callbackUrl') || '/finance-tracker/dashboard';
      router.push(callbackUrl);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleSocialSuccess = (result) => {
    setSignupMethod('social');
    setSignupStep('success');
    // Simulate redirect after success
    setTimeout(() => router.push('/dashboard'), 2000);
  };

  const handleSocialError = (error) => {
    setAuthError(error);
    setIsLoading({
      ...isLoading,
      google: false,
      apple: false,
      azure: false
    });
  };

  const handlePasskeyAuth = (result) => {
    if (result.success) {
      // Create mock user for passkey auth
      const mockUser = {
        name: 'New Passkey User',
        email: 'new-passkey@example.com',
        provider: 'passkey'
      };
      
      // Login with our auth system
      loginWithCredentials(mockUser, 'passkey-signup-token', null, true);
      
      // Show success or redirect
      setSignupMethod('passkey');
      setSignupStep('success');
      
      // Redirect after a short delay
      setTimeout(() => {
        const callbackUrl = searchParams.get('callbackUrl') || '/finance-tracker/dashboard';
        router.push(callbackUrl);
      }, 2000);
    }
  };

  const handleWeb3Connect = (result) => {
    if (result.success) {
      // Create mock user for wallet auth
      const mockUser = {
        name: 'New Web3 User',
        email: 'new-wallet@example.com',
        provider: 'web3'
      };
      
      // Login with our auth system
      loginWithCredentials(mockUser, 'web3-signup-token', null, true);
      
      // Show success or redirect
      setSignupMethod('web3');
      setSignupStep('success');
      
      // Redirect after a short delay
      setTimeout(() => {
        const callbackUrl = searchParams.get('callbackUrl') || '/finance-tracker/dashboard';
        router.push(callbackUrl);
      }, 2000);
    }
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    if (!formValues.name) errors.name = 'Name is required';
    if (!formValues.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formValues.password) {
      errors.password = 'Password is required';
    } else if (formValues.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (formValues.confirmPassword !== formValues.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(prev => ({...prev, form: true}));
    
    try {
      // Create user from form
      const newUser = {
        name: formValues.name,
        email: formValues.email,
        provider: 'credentials'
      };
      
      // Login with credentials
      loginWithCredentials(newUser, 'form-signup-token', null, true);
      
      // Show success
      setSignupMethod('form');
      setSignupStep('success');
      
      // Redirect after a short delay
      setTimeout(() => {
        const callbackUrl = searchParams.get('callbackUrl') || '/finance-tracker/dashboard';
        router.push(callbackUrl);
      }, 2000);
    } catch (error) {
      setAuthError('Signup failed. Please try again.');
    } finally {
      setIsLoading(prev => ({...prev, form: false}));
    }
  };
  
  const showEmailSignupForm = () => {
    setSignupMethod('email');
    setSignupStep('form');
  };
  
  const getSuccessMessage = () => {
    const messages = {
      social: 'Account created successfully with social login',
      email: 'Account created successfully with email',
      passkey: 'Account created successfully with passkey',
      web3: 'Account created successfully with Web3 wallet'
    };
    
    return messages[signupMethod] || 'Account created successfully';
  };
  
  // Show success screen
  if (signupStep === 'success') {
    return (
      <AuthLayout>
        <div className="text-center py-10">
          <div className="mb-5 inline-flex rounded-full p-4 bg-[var(--success)] bg-opacity-10">
            <FaCircleCheck size={32} className="text-[var(--success)]" />
          </div>
          
          <h2 className="text-2xl font-medium text-white mb-2">Success!</h2>
          <p className="text-gray-400 mb-8">{getSuccessMessage()}</p>
          
          <p className="text-sm text-gray-500 animate-pulse">Redirecting to dashboard...</p>
        </div>
      </AuthLayout>
    );
  }
  
  // Show email signup form
  if (signupStep === 'form') {
    return (
      <AuthLayout 
        title="Create your account"
        subtitle="Enter your information to sign up"
      >
        {authError && (
          <div className="mb-6 p-3 bg-[var(--danger)] bg-opacity-20 border border-[var(--danger)] text-white rounded-xl flex items-start gap-3">
            <FaCircleInfo className="text-[var(--danger)] mt-0.5" />
            <p className="text-sm">{authError}</p>
          </div>
        )}
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm text-gray-300">Full Name</label>
            <div className={`flex items-center p-3 rounded-xl ${formErrors.name ? 'bg-[var(--danger)] bg-opacity-10 border border-[var(--danger)]' : 'bg-[#1a1a1a] border border-[#333]'}`}>
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formValues.name}
                onChange={handleFormInputChange}
                className="w-full bg-transparent border-none focus:outline-none text-white"
              />
            </div>
            {formErrors.name && <p className="text-xs text-[var(--danger)]">{formErrors.name}</p>}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm text-gray-300">Email Address</label>
            <div className={`flex items-center p-3 rounded-xl ${formErrors.email ? 'bg-[var(--danger)] bg-opacity-10 border border-[var(--danger)]' : 'bg-[#1a1a1a] border border-[#333]'}`}>
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formValues.email}
                onChange={handleFormInputChange}
                className="w-full bg-transparent border-none focus:outline-none text-white"
              />
            </div>
            {formErrors.email && <p className="text-xs text-[var(--danger)]">{formErrors.email}</p>}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm text-gray-300">Password</label>
            <div className={`flex items-center p-3 rounded-xl ${formErrors.password ? 'bg-[var(--danger)] bg-opacity-10 border border-[var(--danger)]' : 'bg-[#1a1a1a] border border-[#333]'}`}>
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={formValues.password}
                onChange={handleFormInputChange}
                className="w-full bg-transparent border-none focus:outline-none text-white"
              />
            </div>
            {formErrors.password && <p className="text-xs text-[var(--danger)]">{formErrors.password}</p>}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="text-sm text-gray-300">Confirm Password</label>
            <div className={`flex items-center p-3 rounded-xl ${formErrors.confirmPassword ? 'bg-[var(--danger)] bg-opacity-10 border border-[var(--danger)]' : 'bg-[#1a1a1a] border border-[#333]'}`}>
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                value={formValues.confirmPassword}
                onChange={handleFormInputChange}
                className="w-full bg-transparent border-none focus:outline-none text-white"
              />
            </div>
            {formErrors.confirmPassword && <p className="text-xs text-[var(--danger)]">{formErrors.confirmPassword}</p>}
          </div>
          
          <button
            type="submit"
            disabled={isLoading.form}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black font-medium mt-6 flex items-center justify-center"
          >
            {isLoading.form ? (
              <FaCircleNotch className="animate-spin" />
            ) : (
              <>
                Create Account
                <FaArrowRight className="ml-2" />
              </>
            )}
          </button>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-[#50E3C2] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </AuthLayout>
    );
  }
  
  // Show signup method selection (default)
  return (
    <AuthLayout 
      title="Create your account"
      subtitle="Choose your preferred signup method"
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
          <button
            onClick={showEmailSignupForm}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black font-medium flex items-center justify-center"
          >
            <FaEnvelope className="mr-2" />
            Sign up with Email
          </button>
          
          <PasskeyAuth 
            onAuthenticate={handlePasskeyAuth}
            mode="register"
          />
          
          <Web3WalletAuth onConnect={handleWeb3Connect} />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-[#50E3C2] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>}>
      <SignupContent />
    </Suspense>
  );
} 