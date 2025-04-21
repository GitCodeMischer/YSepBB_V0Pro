import React from 'react';
import { signIn } from 'next-auth/react';
import { 
  FaGoogle, 
  FaApple, 
  FaMicrosoft,
  FaCircleNotch
} from 'react-icons/fa6';

const PROVIDERS = {
  google: {
    id: 'google',
    name: 'Google',
    icon: <FaGoogle className="text-lg" />,
    color: 'bg-white text-black hover:bg-gray-100'
  },
  apple: {
    id: 'apple',
    name: 'Apple',
    icon: <FaApple className="text-lg" />,
    color: 'bg-black text-white border border-[#333] hover:bg-gray-900'
  },
  azure: {
    id: 'azure-ad',
    name: 'Microsoft',
    icon: <FaMicrosoft className="text-lg" />,
    color: 'bg-[#2F2F2F] text-white hover:bg-[#252525] border border-[#444]'
  }
};

export default function SocialAuthButton({ provider, isLoading, onSuccess, onError }) {
  const providerConfig = PROVIDERS[provider];
  
  if (!providerConfig) {
    return null;
  }
  
  const handleSignIn = async () => {
    try {
      const result = await signIn(providerConfig.id, { redirect: false });
      
      if (result?.error) {
        if (onError) onError(result.error);
      } else if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      if (onError) onError(error.message || 'Authentication failed');
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