import React, { useState } from 'react';
import { 
  FaCircleCheck, 
  FaKey,
  FaCircleInfo, 
  FaCircleNotch,
  FaArrowLeft
} from 'react-icons/fa6';
import { verifyRecoveryCode } from '@/services/twoFactorAuthService';

/**
 * Recovery Code Verification component for 2FA recovery
 * 
 * @param {Object} props
 * @param {Function} props.onVerify - Function called on successful verification
 * @param {Function} props.onBack - Function to go back to regular 2FA options
 * @param {string} props.userId - User ID for verification
 */
export default function RecoveryCodeVerification({ onVerify, onBack, userId }) {
  const [recoveryCode, setRecoveryCode] = useState('');
  const [status, setStatus] = useState('idle'); // idle, processing, success, error
  const [errorMessage, setErrorMessage] = useState('');

  // Handle recovery code format (add dashes automatically)
  const handleRecoveryCodeChange = (value) => {
    // Remove any non-alphanumeric characters
    value = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    
    // Format with dashes
    if (value.length > 0) {
      const parts = [];
      for (let i = 0; i < value.length; i += 4) {
        parts.push(value.substr(i, 4));
      }
      value = parts.join('-');
    }
    
    // Limit to 14 characters (including dashes)
    if (value.length <= 14) {
      setRecoveryCode(value);
    }
    
    // Reset error state if changing the input
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleVerify = async () => {
    // Validate input format
    if (!/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(recoveryCode)) {
      setStatus('error');
      setErrorMessage('Please enter a valid recovery code in the format XXXX-XXXX-XXXX');
      return;
    }

    try {
      setStatus('processing');
      
      // Verify the recovery code
      const result = await verifyRecoveryCode(recoveryCode, userId);
      
      if (result.success) {
        setStatus('success');
        
        // Call the onVerify callback after a delay
        setTimeout(() => {
          if (onVerify) {
            onVerify({
              success: true,
              message: 'Recovery code verification successful',
              method: 'recovery'
            });
          }
        }, 1000);
      } else {
        throw new Error(result.message || 'Invalid recovery code. Please try again.');
      }
    } catch (error) {
      console.error('Recovery code verification error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Verification failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6">
        {onBack && (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to 2FA options</span>
          </button>
        )}
        
        <h2 className="text-xl font-semibold text-white mb-2">Use Recovery Code</h2>
        <p className="text-gray-400 mb-6">
          Enter one of your recovery codes to access your account.
          Recovery codes are one-time use only.
        </p>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">
            Recovery Code:
          </label>
          <input
            type="text"
            value={recoveryCode}
            onChange={(e) => handleRecoveryCodeChange(e.target.value)}
            placeholder="XXXX-XXXX-XXXX"
            className={`w-full p-4 rounded-xl text-lg font-mono bg-[#1a1a1a] border ${
              status === 'error' ? 'border-red-500' : 'border-[#333]'
            } focus:border-[#50E3C2] focus:outline-none transition-colors`}
            autoComplete="off"
            disabled={status === 'processing' || status === 'success'}
          />
        </div>
        
        {status === 'error' && (
          <div className="flex items-start gap-2 text-red-400 text-sm mb-4 p-3 bg-red-500/10 rounded-lg">
            <FaCircleInfo className="mt-0.5 flex-shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}
        
        <div className="mb-4">
          <p className="text-sm text-yellow-400 flex items-center gap-2 mb-4">
            <FaCircleInfo className="flex-shrink-0" />
            <span>
              Recovery codes are one-time use only. After using this code, it will be invalidated.
            </span>
          </p>
        </div>
        
        <button
          onClick={handleVerify}
          disabled={
            recoveryCode.length < 14 || 
            status === 'processing' || 
            status === 'success'
          }
          className={`w-full py-3 rounded-xl font-medium flex items-center justify-center ${
            status === 'success'
              ? 'bg-[#008751] text-white'
              : 'bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black'
          } ${
            (recoveryCode.length < 14 || status === 'processing') ? 'opacity-70' : ''
          } transition-all duration-200`}
        >
          {status === 'success' ? (
            <>
              <FaCircleCheck className="mr-2" />
              <span>Verified</span>
            </>
          ) : status === 'processing' ? (
            <>
              <FaCircleNotch className="animate-spin mr-2" />
              <span>Verifying...</span>
            </>
          ) : (
            <span>Verify</span>
          )}
        </button>
      </div>
    </div>
  );
} 