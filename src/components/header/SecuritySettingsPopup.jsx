import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FaShield, 
  FaXmark, 
  FaCircleInfo, 
  FaCircleCheck, 
  FaCircleXmark,
  FaCircleNotch,
  FaKey
} from 'react-icons/fa6';
import { 
  generate2FASecret, 
  verify2FACode, 
  is2FAEnabled, 
  set2FAStatus,
  getRecoveryCodes,
  generateRecoveryCodes
} from '@/services/twoFactorAuthService';
import RecoveryCodes from '@/components/auth/RecoveryCodes';
import QRCodeSetup from '@/components/header/QRCodeSetup';

/**
 * SecuritySettingsPopup component for managing security settings
 * 
 * @param {Object} props
 * @param {Function} props.onClose - Function to call when the popup is closed
 */
export default function SecuritySettingsPopup({ onClose }) {
  const { user, updateUser } = useAuth();
  const router = useRouter();
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
    <div className="settings-popup-container fixed inset-0 flex items-center justify-center z-40">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm settings-backdrop"
        onClick={onClose}
      ></div>
      <div 
        className="settings-popup relative w-[95%] max-w-2xl max-h-[90vh] bg-[#121212]/95 backdrop-blur-md border border-[#222]/70 rounded-xl shadow-2xl overflow-auto z-50 search-popup-animation mx-auto"
      >
        <div className="flex items-center justify-between p-4 border-b border-[#222]/70">
          <h2 className="text-xl font-medium text-white flex items-center">
            <FaShield className="text-[#50E3C2] mr-3" size={18} />
            Security Settings
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 transition-colors duration-200"
          >
            <FaXmark size={16} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
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
          
          <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#222] mb-6">
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
            
            <div className="px-6 py-4 bg-[#111] border-t border-[#222] flex items-center justify-between">
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
          
          <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#222] mb-6">
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
            
            <div className="px-6 py-4 bg-[#111] border-t border-[#222] flex items-center justify-between">
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
          
          <div className="flex justify-end">
            <button
              onClick={() => {
                onClose();
                router.push('/settings/security');
              }}
              className="text-sm py-2 px-4 rounded-lg text-[#50E3C2] hover:bg-[#50E3C2]/10 transition-colors"
            >
              Advanced Security Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 