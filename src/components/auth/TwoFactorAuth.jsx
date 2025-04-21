import React, { useState, useRef, useEffect } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';

export default function TwoFactorAuth({ onVerify, onBack }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [status, setStatus] = useState('idle'); // idle, processing, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = useRef([]);

  // Focus on the first input when component mounts
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if value is entered
      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      // Clear any previous error
      if (status === 'error') {
        setStatus('idle');
        setErrorMessage('');
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Allow navigation with arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted content is numeric and has the right length
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setCode(newCode);
      // Focus on the last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      setStatus('error');
      setErrorMessage('Please enter all 6 digits');
      return;
    }

    try {
      setStatus('processing');
      
      // In a real implementation, you would make an API call to verify the 2FA code
      // Mock implementation with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock verification (in a real app, you'd verify with your backend)
      if (fullCode === '123456') {
        setStatus('success');
        if (onVerify) {
          setTimeout(() => {
            onVerify({
              success: true,
              message: '2FA verification successful'
            });
          }, 1000);
        }
      } else {
        throw new Error('Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('2FA verification error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Verification failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        {onBack && (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-white transition-colors mb-4"
          >
            <span>Back to login</span>
          </button>
        )}
        <h2 className="text-xl font-semibold text-white mb-2">Two-Factor Authentication</h2>
        <p className="text-[var(--muted-foreground)]">
          Enter the 6-digit code from your authenticator app
        </p>
      </div>

      <div className="flex justify-between mb-6 gap-2">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className="w-12 h-14 glass-input rounded-xl text-center text-2xl font-mono bg-[rgba(10,10,10,0.6)] border border-[var(--card-border)] focus:border-[var(--primary)]"
            autoComplete="one-time-code"
            disabled={status === 'processing' || status === 'success'}
          />
        ))}
      </div>
      
      {status === 'error' && (
        <p className="text-[var(--danger)] text-sm mb-4">{errorMessage}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === 'processing' || status === 'success' || code.some(digit => digit === '')}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl transition-all duration-300 
          ${status === 'success' 
            ? 'bg-[var(--success)] bg-opacity-20 border border-[var(--success)] text-[var(--success)]' 
            : 'lime-btn'
          } ${status === 'processing' ? 'opacity-70' : ''}`}
      >
        {status === 'success' ? (
          <>
            <FaCircleCheck />
            <span>Verified</span>
          </>
        ) : status === 'processing' ? (
          <span>Verifying...</span>
        ) : (
          <span>Verify Code</span>
        )}
      </button>

      <p className="text-[var(--muted-foreground)] text-sm mt-6 text-center">
        Hint: The code is 123456
      </p>
    </div>
  );
}