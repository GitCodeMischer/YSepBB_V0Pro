import React, { useState, useRef, useEffect } from 'react';
import { 
  FaCircleCheck, 
  FaEnvelope, 
  FaMobile, 
  FaKey, 
  FaCircleInfo,
  FaArrowLeft,
  FaCircleNotch,
  FaFileCode
} from 'react-icons/fa6';
import { verify2FACode, send2FACode } from '@/services/twoFactorAuthService';
import RecoveryCodeVerification from './RecoveryCodeVerification';

export default function TwoFactorAuth({ 
  onVerify, 
  onBack, 
  email = "user@example.com",
  phone = "+1 (•••) •••-1234",
  methods = ["app", "sms", "email"],
  userId
}) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [status, setStatus] = useState('idle'); // idle, processing, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationMethod, setVerificationMethod] = useState(methods[0] || 'app');
  const [codeSent, setCodeSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [showRecoveryCodeVerification, setShowRecoveryCodeVerification] = useState(false);
  const inputRefs = useRef([]);

  // Focus on the first input when component mounts
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Handle countdown for resend button
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (resendCountdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [resendCountdown, resendDisabled]);

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
      
      // Auto-submit when all digits are filled
      if (index === 5 && value !== '') {
        const allFilled = newCode.every(digit => digit !== '');
        if (allFilled) {
          setTimeout(() => handleSubmit(), 300);
        }
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
      
      // Auto-submit after a short delay
      setTimeout(() => handleSubmit(), 300);
    }
  };

  const handleChangeMethod = (method) => {
    setVerificationMethod(method);
    setCode(['', '', '', '', '', '']);
    setStatus('idle');
    setErrorMessage('');
    setCodeSent(false);
    
    // For app-based verification, no need to send a code
    if (method === 'app') {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  };

  const handleSendCode = async () => {
    try {
      setStatus('sending');
      
      let destination = '';
      if (verificationMethod === 'sms') {
        destination = phone;
      } else if (verificationMethod === 'email') {
        destination = email;
      }
      
      const result = await send2FACode(verificationMethod, destination);
      
      if (result.success) {
        setCodeSent(true);
        setStatus('idle');
        // Start countdown for resend
        setResendCountdown(60);
        setResendDisabled(true);
        
        // Focus on first input
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error sending code:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send verification code. Please try again.');
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
      
      // Verify code using our service
      const isValid = await verify2FACode(fullCode);
      
      if (isValid) {
        setStatus('success');
        if (onVerify) {
          setTimeout(() => {
            onVerify({
              success: true,
              message: '2FA verification successful',
              method: verificationMethod
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
      
      // Clear the code fields
      setCode(['', '', '', '', '', '']);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  };

  const handleUseRecoveryCode = () => {
    setShowRecoveryCodeVerification(true);
  };

  const handleBackFromRecovery = () => {
    setShowRecoveryCodeVerification(false);
  };

  // If recovery code verification is shown, render that component
  if (showRecoveryCodeVerification) {
    return (
      <RecoveryCodeVerification 
        onVerify={onVerify}
        onBack={handleBackFromRecovery}
        userId={userId}
      />
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6">
        {onBack && (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to login</span>
          </button>
        )}
        <h2 className="text-xl font-semibold text-white mb-2">Two-Factor Authentication</h2>
        <p className="text-gray-400 mb-4">
          For additional security, please enter the verification code.
        </p>
        
        {/* Method selector */}
        {methods.length > 1 && (
          <div className="bg-[#121212] rounded-xl p-3 mb-5 border border-[#222]">
            <p className="text-sm text-gray-400 mb-2">Verification method:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {methods.includes('app') && (
                <button 
                  onClick={() => handleChangeMethod('app')} 
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm transition-colors ${
                    verificationMethod === 'app' 
                      ? 'bg-[#50E3C2]/20 text-[#50E3C2] border border-[#50E3C2]/30' 
                      : 'bg-[#1a1a1a] text-gray-300 border border-[#333] hover:bg-[#1a1a1a]/70'
                  }`}
                >
                  <FaKey className="text-sm" />
                  <span>Authenticator</span>
                </button>
              )}
              {methods.includes('sms') && (
                <button 
                  onClick={() => handleChangeMethod('sms')} 
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm transition-colors ${
                    verificationMethod === 'sms' 
                      ? 'bg-[#50E3C2]/20 text-[#50E3C2] border border-[#50E3C2]/30' 
                      : 'bg-[#1a1a1a] text-gray-300 border border-[#333] hover:bg-[#1a1a1a]/70'
                  }`}
                >
                  <FaMobile className="text-sm" />
                  <span>SMS</span>
                </button>
              )}
              {methods.includes('email') && (
                <button 
                  onClick={() => handleChangeMethod('email')} 
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm transition-colors ${
                    verificationMethod === 'email' 
                      ? 'bg-[#50E3C2]/20 text-[#50E3C2] border border-[#50E3C2]/30' 
                      : 'bg-[#1a1a1a] text-gray-300 border border-[#333] hover:bg-[#1a1a1a]/70'
                  }`}
                >
                  <FaEnvelope className="text-sm" />
                  <span>Email</span>
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* App-based verification instructions */}
        {verificationMethod === 'app' && (
          <p className="text-gray-400 text-sm mb-4">
            Enter the 6-digit code from your authenticator app
          </p>
        )}
        
        {/* Email/SMS verification */}
        {(verificationMethod === 'email' || verificationMethod === 'sms') && !codeSent && (
          <div className="mb-4">
            <p className="text-gray-400 mb-3">
              {verificationMethod === 'email' 
                ? `We'll send a verification code to ${email}`
                : `We'll send a verification code to ${phone}`
              }
            </p>
            <button 
              onClick={handleSendCode}
              disabled={status === 'sending'}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black font-medium flex items-center justify-center transition-opacity"
            >
              {status === 'sending' ? (
                <>
                  <FaCircleNotch className="animate-spin mr-2" />
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Verification Code</span>
              )}
            </button>
          </div>
        )}
        
        {/* Email/SMS after code is sent */}
        {(verificationMethod === 'email' || verificationMethod === 'sms') && codeSent && (
          <div className="mb-4">
            <p className="text-gray-400 mb-1 text-sm">
              {verificationMethod === 'email' 
                ? `Enter the 6-digit code sent to ${email}`
                : `Enter the 6-digit code sent to ${phone}`
              }
            </p>
            <button 
              onClick={handleSendCode}
              disabled={resendDisabled}
              className="text-[#50E3C2] text-xs hover:underline disabled:text-gray-500 disabled:no-underline transition-colors mb-2"
            >
              {resendDisabled ? `Resend code in ${resendCountdown}s` : 'Resend code'}
            </button>
          </div>
        )}
      </div>

      {/* Code input */}
      {(verificationMethod === 'app' || codeSent) && (
        <>
          <div className="flex justify-between mb-4 gap-2">
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
                className={`w-12 h-14 rounded-xl text-center text-2xl font-mono bg-[#1a1a1a] border ${
                  status === 'error' ? 'border-red-500' : 'border-[#333]'
                } focus:border-[#50E3C2] focus:outline-none transition-colors`}
                autoComplete="one-time-code"
                disabled={status === 'processing' || status === 'success'}
              />
            ))}
          </div>
          
          {status === 'error' && (
            <div className="flex items-start gap-2 text-red-400 text-sm mb-4 p-3 bg-red-500/10 rounded-lg">
              <FaCircleInfo className="mt-0.5 flex-shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={status === 'processing' || status === 'success' || code.some(digit => digit === '')}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${
              status === 'success' 
                ? 'bg-[#008751] text-white border border-[#00A86B]' 
                : 'bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black font-medium'
            } ${
              (status === 'processing' || code.some(digit => digit === '')) ? 'opacity-70' : ''
            }`}
          >
            {status === 'success' ? (
              <>
                <FaCircleCheck />
                <span>Verified</span>
              </>
            ) : status === 'processing' ? (
              <>
                <FaCircleNotch className="animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify</span>
            )}
          </button>
        </>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={handleUseRecoveryCode}
          className="text-[#50E3C2] text-sm hover:underline transition-colors"
        >
          <span className="flex items-center justify-center gap-1">
            <FaFileCode className="text-xs" />
            <span>Use a recovery code instead</span>
          </span>
        </button>
        
        <p className="text-gray-500 text-xs mt-3">
          Trouble with verification? Contact support for assistance.
        </p>
        {/* For simulation, show the code hint */}
        <p className="text-gray-600 text-xs mt-3">
          Demo hint: Use code 123456, 000000, or 111111
        </p>
      </div>
    </div>
  );
}