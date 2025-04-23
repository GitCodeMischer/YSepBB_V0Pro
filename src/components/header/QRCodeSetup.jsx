import React, { useState } from 'react';
import { FaCircleCheck, FaCircleInfo, FaCircleNotch, FaArrowRight } from 'react-icons/fa6';
import { verify2FACode } from '@/services/twoFactorAuthService';

/**
 * QRCodeSetup component for setting up two-factor authentication
 * 
 * @param {Object} props
 * @param {Object} props.secret - Secret object containing secret, recoveryCode, and qrCodeUrl
 * @param {Function} props.onComplete - Function to call when setup is complete
 * @param {Function} props.onCancel - Function to call when setup is cancelled
 */
export default function QRCodeSetup({ secret, onComplete, onCancel }) {
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