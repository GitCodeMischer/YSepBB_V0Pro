"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  generate2FASecret, 
  verify2FACode, 
  is2FAEnabled, 
  set2FAStatus,
  getRecoveryCodes,
  generateRecoveryCodes
} from '@/services/twoFactorAuthService';
import { 
  FaCircleCheck, 
  FaCircleXmark, 
  FaShield, 
  FaQrcode, 
  FaKey, 
  FaArrowRight,
  FaCircleInfo,
  FaCircleNotch
} from 'react-icons/fa6';
import RecoveryCodes from '@/components/auth/RecoveryCodes';

// QR Code setup component for 2FA
function QRCodeSetup({ secret, onComplete, onCancel }) {
  const [verificationCode, setVerificationCode] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const handleVerify = async () => {
    try {
      setStatus('verifying');
      
      // Use the service to verify the code
      const isValid = await verify2FACode(verificationCode, secret.secret);
      
      if (isValid) {
        setStatus('success');
        setTimeout(() => {
          if (onComplete) {
            onComplete({
              success: true,
              secret: secret.secret
            });
          }
        }, 1000);
      } else {
        throw new Error('Invalid verification code. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setError(error.message || 'Verification failed. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-[#121212] rounded-xl border border-[#222] mb-6">
      <h3 className="text-lg font-medium text-white mb-4">Setup Two-Factor Authentication</h3>
      
      <div className="mb-6">
        <p className="text-gray-400 mb-3">
          Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="bg-white p-3 rounded-lg w-48 h-48 flex-shrink-0">
            <img 
              src={secret.qrCodeUrl} 
              alt="QR Code for 2FA" 
              className="w-full h-full"
            />
          </div>
          
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Manual setup code:</p>
              <div className="bg-[#1a1a1a] p-3 rounded-lg font-mono text-sm break-all border border-[#333]">
                {secret.secret}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Recovery code (save this somewhere safe):</p>
              <div className="bg-[#1a1a1a] p-3 rounded-lg font-mono text-sm break-all border border-[#333] text-yellow-500">
                {secret.recoveryCode}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Enter the 6-digit verification code:</label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => {
            setVerificationCode(e.target.value);
            if (status === 'error') {
              setError(null);
              setStatus('idle');
            }
          }}
          maxLength={6}
          className="w-full sm:w-64 p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
          placeholder="000000"
        />
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 rounded-lg flex items-start gap-2 text-red-400 text-sm">
          <FaCircleInfo className="mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      <div className="flex items-center gap-3 justify-end">
        <button
          onClick={onCancel}
          className="py-2 px-4 rounded-lg bg-[#2a2a2a] text-gray-300 hover:bg-[#333] transition-colors"
        >
          Cancel
        </button>
        
        <button
          onClick={handleVerify}
          disabled={verificationCode.length !== 6 || status === 'verifying' || status === 'success'}
          className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
            status === 'success'
              ? 'bg-[#008751] text-white'
              : 'bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black font-medium'
          } ${
            (verificationCode.length !== 6 || status === 'verifying') ? 'opacity-70' : ''
          } transition-all duration-200`}
        >
          {status === 'success' ? (
            <>
              <FaCircleCheck />
              <span>Verified</span>
            </>
          ) : status === 'verifying' ? (
            <>
              <FaCircleNotch className="animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Verify</span>
              <FaArrowRight size={12} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function SecuritySettings() {
  const { user, updateUser } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRSetup, setShowQRSetup] = useState(false);
  const [secret, setSecret] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState([]);

  // Initialize from user data
  useEffect(() => {
    if (user) {
      setTwoFactorEnabled(is2FAEnabled(user));
    }
  }, [user]);

  const handleEnable2FA = async () => {
    try {
      setStatus('loading');
      
      // Generate a new secret using the service
      const newSecret = generate2FASecret();
      setSecret(newSecret);
      
      // Show QR code setup
      setShowQRSetup(true);
      setStatus('idle');
    } catch (error) {
      setStatus('error');
      setError('Failed to generate 2FA secret. Please try again.');
    }
  };

  const handleDisable2FA = async () => {
    try {
      setStatus('loading');
      
      // Call the service to disable 2FA
      const success = await set2FAStatus(false, user?.id);
      
      if (success) {
        // Update the user object in context
        updateUser({
          ...user,
          twoFactorEnabled: false
        });
        
        setTwoFactorEnabled(false);
        setStatus('idle');
      } else {
        throw new Error('Failed to disable 2FA');
      }
    } catch (error) {
      setStatus('error');
      setError(error.message || 'Failed to disable 2FA. Please try again.');
    }
  };

  const handleSetupComplete = async (result) => {
    if (result.success) {
      try {
        // Call the service to enable 2FA
        const success = await set2FAStatus(true, user?.id);
        
        if (success) {
          // Update the user object in context
          updateUser({
            ...user,
            twoFactorEnabled: true
          });
          
          setTwoFactorEnabled(true);
          setShowQRSetup(false);
        } else {
          setError('Failed to enable 2FA. Please try again.');
        }
      } catch (error) {
        setError(error.message || 'Failed to enable 2FA. Please try again.');
      }
    }
  };

  const handleCancelSetup = () => {
    setShowQRSetup(false);
    setSecret(null);
  };

  const handleViewRecoveryCodes = async () => {
    try {
      setStatus('loading');
      setError(null);
      
      // Retrieve recovery codes
      const response = await getRecoveryCodes(user?.id);
      
      if (response.success) {
        setRecoveryCodes(response.codes);
        setShowRecoveryCodes(true);
        setStatus('idle');
      } else {
        throw new Error(response.message || 'Failed to retrieve recovery codes');
      }
    } catch (error) {
      console.error('Error retrieving recovery codes:', error);
      setStatus('error');
      setError(error.message || 'Failed to retrieve recovery codes. Please try again.');
    }
  };

  const handleRegenerateRecoveryCodes = async () => {
    try {
      // Generate new recovery codes
      const response = await generateRecoveryCodes(user?.id);
      
      if (response.success) {
        setRecoveryCodes(response.codes);
        return { success: true };
      } else {
        throw new Error(response.message || 'Failed to regenerate recovery codes');
      }
    } catch (error) {
      console.error('Error regenerating recovery codes:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to regenerate recovery codes. Please try again.' 
      };
    }
  };

  const handleCloseRecoveryCodes = () => {
    setShowRecoveryCodes(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-white mb-2">Security Settings</h1>
      <p className="text-gray-400 mb-8">Manage your account security and authentication preferences</p>
      
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 rounded-xl flex items-start gap-3 text-red-400">
          <FaCircleInfo className="mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium mb-1">Error</h3>
            <p>{error}</p>
          </div>
        </div>
      )}
      
      {showQRSetup && secret && (
        <QRCodeSetup 
          secret={secret} 
          onComplete={handleSetupComplete}
          onCancel={handleCancelSetup}
        />
      )}
      
      {showRecoveryCodes && (
        <RecoveryCodes
          recoveryCodes={recoveryCodes}
          onRegenerateRecoveryCodes={handleRegenerateRecoveryCodes}
          onClose={handleCloseRecoveryCodes}
          canRegenerateCode={twoFactorEnabled}
        />
      )}
      
      <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222] mb-6">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#50E3C2]/10 rounded-lg text-[#50E3C2]">
                <FaShield size={20} />
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-white mb-1">Two-Factor Authentication</h2>
                <p className="text-gray-400 max-w-xl">
                  Add an extra layer of security to your account. When enabled, you'll need to provide 
                  a verification code from your phone in addition to your password when signing in.
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              {twoFactorEnabled ? (
                <div className="flex items-center gap-2 text-[#50E3C2] bg-[#50E3C2]/10 py-1 px-3 rounded-full">
                  <FaCircleCheck size={12} />
                  <span className="text-sm font-medium">Enabled</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-400 bg-[#333]/30 py-1 px-3 rounded-full">
                  <FaCircleXmark size={12} />
                  <span className="text-sm font-medium">Disabled</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-[#0d0d0d] border-t border-[#222] flex items-center justify-between">
          <div className="text-sm text-gray-400">
            {twoFactorEnabled
              ? 'Two-factor authentication is currently enabled for your account.'
              : 'Enable two-factor authentication to increase your account security.'}
          </div>
          
          {twoFactorEnabled ? (
            <button
              onClick={handleDisable2FA}
              disabled={status === 'loading'}
              className={`text-sm py-2 px-4 rounded-lg text-gray-300 border border-[#333] hover:bg-[#222] transition-colors ${
                status === 'loading' ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <FaCircleNotch size={12} className="animate-spin" />
                  Disabling...
                </span>
              ) : (
                'Disable 2FA'
              )}
            </button>
          ) : (
            <button
              onClick={handleEnable2FA}
              disabled={status === 'loading'}
              className={`text-sm py-2 px-4 rounded-lg bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black font-medium ${
                status === 'loading' ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <FaCircleNotch size={12} className="animate-spin" />
                  Loading...
                </span>
              ) : (
                'Enable 2FA'
              )}
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222] mb-6">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#333]/50 rounded-lg text-gray-300">
              <FaKey size={20} />
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-white mb-1">Recovery Codes</h2>
              <p className="text-gray-400 max-w-xl">
                Recovery codes can be used to access your account in case you lose your 
                two-factor authentication device. We've generated 10 codes for you - keep 
                them in a safe place.
              </p>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-[#0d0d0d] border-t border-[#222] flex items-center justify-between">
          <div className="text-sm text-gray-400">
            {twoFactorEnabled
              ? 'You can view or regenerate your recovery codes at any time.'
              : 'Recovery codes are available after you enable two-factor authentication.'}
          </div>
          
          <button
            onClick={handleViewRecoveryCodes}
            disabled={!twoFactorEnabled || status === 'loading'}
            className={`text-sm py-2 px-4 rounded-lg text-gray-300 border border-[#333] hover:bg-[#222] transition-colors ${
              !twoFactorEnabled || status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <FaCircleNotch size={12} className="animate-spin" />
                Loading...
              </span>
            ) : (
              'View Recovery Codes'
            )}
          </button>
        </div>
      </div>
      
      <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222]">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#333]/50 rounded-lg text-gray-300">
              <FaQrcode size={20} />
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-white mb-1">Passkeys</h2>
              <p className="text-gray-400 max-w-xl">
                Passkeys are a more secure alternative to passwords. They use biometric authentication 
                (like fingerprint or face recognition) to securely sign you in without the need for a 
                password.
              </p>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-[#0d0d0d] border-t border-[#222] flex items-center justify-between">
          <div className="text-sm text-gray-400">
            You haven't set up any passkeys yet.
          </div>
          
          <button
            disabled={true}
            className="text-sm py-2 px-4 rounded-lg text-gray-300 border border-[#333] hover:bg-[#222] transition-colors opacity-50 cursor-not-allowed"
          >
            Add Passkey
          </button>
        </div>
      </div>
    </div>
  );
} 