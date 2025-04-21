"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
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

// Reusable components for signup page
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

export default function SignupPage() {
  const router = useRouter();
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
      setSignupMethod('passkey');
      setSignupStep('success');
      // Simulate redirect after success
      setTimeout(() => router.push('/dashboard'), 2000);
    }
  };

  const handleWeb3Connect = (result) => {
    if (result.success) {
      setSignupMethod('web3wallet');
      setSignupStep('success');
      // Simulate redirect after success
      setTimeout(() => router.push('/dashboard'), 2000);
    }
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formValues.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formValues.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formValues.password) {
      errors.password = 'Password is required';
    } else if (formValues.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      setIsLoading({ ...isLoading, form: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSignupMethod('email');
      setSignupStep('success');
      
      // Simulate redirect after success
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (error) {
      setAuthError(error.message || 'Sign up failed. Please try again.');
    } finally {
      setIsLoading({ ...isLoading, form: false });
    }
  };

  const showEmailSignupForm = () => {
    setSignupStep('form');
    setAuthError(null);
  };

  const getSuccessMessage = () => {
    switch (signupMethod) {
      case 'social':
        return 'Your account has been created successfully with social login.';
      case 'passkey':
        return 'Your account has been created and your passkey registered.';
      case 'web3wallet':
        return 'Your Web3 wallet has been connected and your account created.';
      case 'email':
        return 'Your account has been created successfully. Please verify your email.';
      default:
        return 'Your account has been created successfully.';
    }
  };

  // Render success screen
  if (signupStep === 'success') {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="w-16 h-16 bg-[var(--success)] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCircleCheck className="text-[var(--success)] text-3xl" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Account Created!</h2>
          <p className="text-[var(--muted-foreground)] mb-6">
            {getSuccessMessage()}
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl lime-btn"
          >
            <span>Go to Dashboard</span>
            <FaArrowRight />
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // Render email signup form
  if (signupStep === 'form') {
    return (
      <AuthLayout 
        title="Create your account"
        subtitle="Fill in your details to get started"
        goBackLink={{ href: '/auth/signup', label: 'Back to sign up methods' }}
      >
        {authError && (
          <div className="mb-6 p-3 bg-[var(--danger)] bg-opacity-20 border border-[var(--danger)] text-white rounded-xl flex items-start gap-3">
            <FaCircleInfo className="text-[var(--danger)] mt-0.5" />
            <p className="text-sm">{authError}</p>
          </div>
        )}
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FaUser className="text-[var(--muted-foreground)]" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formValues.name}
                onChange={handleFormInputChange}
                className="glass-input pl-10 w-full"
                disabled={isLoading.form}
              />
            </div>
            {formErrors.name && (
              <p className="text-[var(--danger)] text-sm mt-1">{formErrors.name}</p>
            )}
          </div>
          
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-[var(--muted-foreground)]" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formValues.email}
                onChange={handleFormInputChange}
                className="glass-input pl-10 w-full"
                disabled={isLoading.form}
              />
            </div>
            {formErrors.email && (
              <p className="text-[var(--danger)] text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FaLock className="text-[var(--muted-foreground)]" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleFormInputChange}
                className="glass-input pl-10 w-full"
                disabled={isLoading.form}
              />
            </div>
            {formErrors.password && (
              <p className="text-[var(--danger)] text-sm mt-1">{formErrors.password}</p>
            )}
          </div>
          
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FaLock className="text-[var(--muted-foreground)]" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChange={handleFormInputChange}
                className="glass-input pl-10 w-full"
                disabled={isLoading.form}
              />
            </div>
            {formErrors.confirmPassword && (
              <p className="text-[var(--danger)] text-sm mt-1">{formErrors.confirmPassword}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading.form}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl lime-btn ${
              isLoading.form ? 'opacity-70' : ''
            }`}
          >
            {isLoading.form ? (
              <span>Creating account...</span>
            ) : (
              <>
                <span>Create Account</span>
                <FaArrowRight />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center text-[var(--muted-foreground)] text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[var(--primary)] hover:underline">
            Sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // Render signup methods
  return (
    <AuthLayout 
      title="Create an account"
      subtitle="Choose how you want to sign up"
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
        
        <PasskeyAuth onAuthenticate={handlePasskeyAuth} mode="register" />
        
        <div className="mt-4">
          <Web3WalletAuth onConnect={handleWeb3Connect} />
        </div>
        
        <div className="mt-4">
          <button
            onClick={showEmailSignupForm}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl transition-all duration-300 glass-button"
          >
            <FaEnvelope className="text-xl" />
            <span>Sign up with Email</span>
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center text-[var(--muted-foreground)] text-sm">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-[var(--primary)] hover:underline">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
} 