import React, { useState } from 'react';
import { 
  FaCircleCheck, 
  FaKey, 
  FaCircleInfo,
  FaCircleNotch,
  FaRegCopy,
  FaRotate
} from 'react-icons/fa6';

/**
 * RecoveryCodes component for displaying and managing recovery codes
 * 
 * @param {Object} props
 * @param {Array<string>} props.recoveryCodes - Array of recovery codes to display
 * @param {Function} props.onRegenerateRecoveryCodes - Function to regenerate recovery codes
 * @param {Function} props.onClose - Function to call when the component is closed
 * @param {boolean} props.canRegenerateCode - Whether the user can regenerate codes
 */
export default function RecoveryCodes({ 
  recoveryCodes = [], 
  onRegenerateRecoveryCodes, 
  onClose,
  canRegenerateCode = true
}) {
  const [status, setStatus] = useState('idle'); // idle, regenerating, success, error
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Function to handle copying codes to clipboard
  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(recoveryCodes.join('\n'));
      setCopySuccess(true);
      
      // Reset copy success message after 3 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to copy recovery codes:', error);
      setError('Unable to copy to clipboard. Please copy the codes manually.');
    }
  };

  // Function to handle regenerating recovery codes
  const handleRegenerateRecoveryCodes = async () => {
    try {
      setStatus('regenerating');
      setError(null);
      
      // Call the provided regenerate function
      const result = await onRegenerateRecoveryCodes();
      
      if (result?.success) {
        setStatus('success');
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      } else {
        throw new Error(result?.message || 'Failed to regenerate recovery codes');
      }
    } catch (error) {
      console.error('Error regenerating recovery codes:', error);
      setStatus('error');
      setError(error.message || 'Failed to regenerate recovery codes. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-[#121212] rounded-xl border border-[#222] mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <FaKey className="text-yellow-500" size={20} />
          <h3 className="text-lg font-medium text-white">Recovery Codes</h3>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            &times;
          </button>
        )}
      </div>
      
      <div className="mb-4">
        <p className="text-gray-400 mb-4">
          These recovery codes can be used to access your account if you lose your two-factor authentication 
          device. Each code can only be used once. Keep these codes in a safe place—like a password manager.
        </p>
        
        <div className="bg-[#0d0d0d] border border-[#222] rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-2">
            {recoveryCodes.map((code, index) => (
              <div 
                key={index} 
                className="font-mono text-sm p-2 bg-[#1a1a1a] rounded border border-[#333] text-yellow-500"
              >
                {code}
              </div>
            ))}
          </div>
        </div>
        
        {error && (
          <div className="flex items-start gap-2 text-red-400 text-sm mb-4 p-3 bg-red-500/10 rounded-lg">
            <FaCircleInfo className="mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        {copySuccess && (
          <div className="flex items-start gap-2 text-green-400 text-sm mb-4 p-3 bg-green-500/10 rounded-lg">
            <FaCircleCheck className="mt-0.5 flex-shrink-0" />
            <p>Recovery codes copied to clipboard!</p>
          </div>
        )}
        
        <div className="text-sm text-yellow-400 bg-yellow-500/10 p-3 rounded-lg mb-4 flex items-start gap-2">
          <FaCircleInfo className="mt-0.5 flex-shrink-0" />
          <p>
            <strong>Warning:</strong> Regenerating recovery codes will invalidate your previous codes. 
            Make sure you store these new codes in a safe place.
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 justify-end">
        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 py-2 px-4 rounded-lg bg-[#1a1a1a] text-white border border-[#333] hover:bg-[#222] transition-colors"
        >
          <FaRegCopy size={12} />
          <span>Copy All</span>
        </button>
        
        {canRegenerateCode && (
          <button
            onClick={handleRegenerateRecoveryCodes}
            disabled={status === 'regenerating'}
            className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
              status === 'success'
                ? 'bg-[#008751] text-white'
                : 'bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black font-medium'
            } ${
              status === 'regenerating' ? 'opacity-70' : ''
            } transition-all duration-200`}
          >
            {status === 'success' ? (
              <>
                <FaCircleCheck />
                <span>Codes Regenerated</span>
              </>
            ) : status === 'regenerating' ? (
              <>
                <FaCircleNotch className="animate-spin" />
                <span>Regenerating...</span>
              </>
            ) : (
              <>
                <FaRotate />
                <span>Regenerate Codes</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
} 