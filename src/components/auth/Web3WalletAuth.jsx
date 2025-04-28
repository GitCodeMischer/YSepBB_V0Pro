import React, { useState } from 'react';
import { useWeb3Auth } from '@/context/Web3AuthContext';
import { 
  FaWallet, 
  FaCircleCheck,
  FaEthereum,
  FaPhantom,
  FaDollarSign
} from 'react-icons/fa6';
import { SiCoinbase } from 'react-icons/si';
import Image from 'next/image';

const WALLETS = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: <FaEthereum className="text-orange-500" />,
    provider: 'metamask'
  },
  {
    id: 'phantom',
    name: 'Phantom',
    icon: <FaPhantom className="text-purple-500" />,
    provider: 'phantom'
  },
  {
    id: 'solflare',
    name: 'Solflare',
    icon: <Image src="/solflare-icon.svg" alt="Solflare" width={24} height={24} />,
    provider: 'solflare'
  },
  {
    id: 'okx',
    name: 'OKX Wallet',
    icon: <Image src="/okx-icon.svg" alt="OKX Wallet" width={24} height={24} />,
    provider: 'okx'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: <SiCoinbase className="text-blue-500" />,
    provider: 'coinbase'
  }
];

export default function Web3WalletAuth({ onConnect }) {
  const { login, isLoading } = useWeb3Auth();
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, processing, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [showWallets, setShowWallets] = useState(false);

  const handleConnect = async (wallet) => {
    try {
      setSelectedWallet(wallet);
      setStatus('processing');
      
      // In a real implementation, this would connect to the actual provider
      await login(wallet.provider);
      
      // Mock delay for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      
      if (onConnect) {
        setTimeout(() => {
          onConnect({
            method: 'web3wallet',
            wallet: wallet.id,
            success: true
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      setStatus('error');
      setErrorMessage(
        error.message || `Failed to connect to ${wallet.name}. Please try again.`
      );
    }
  };

  const toggleWalletsList = () => {
    setShowWallets(!showWallets);
    // Reset error state when opening wallet list
    if (!showWallets) {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={toggleWalletsList}
        disabled={status === 'processing' || status === 'success'}
        className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl transition-all duration-300 glass-button ${
          status === 'processing' ? 'opacity-70' : ''
        } ${status === 'success' ? 'bg-opacity-50 border-[var(--success)]' : ''}`}
      >
        {status === 'success' ? (
          <>
            <FaCircleCheck className="text-[var(--success)]" />
            <span className="text-[var(--success)]">
              Connected to {selectedWallet?.name}
            </span>
          </>
        ) : (
          <>
            <FaWallet className={`text-xl ${status === 'processing' ? 'animate-pulse' : ''}`} />
            <span>
              {status === 'processing'
                ? `Connecting to ${selectedWallet?.name}...`
                : 'Connect Wallet'}
            </span>
          </>
        )}
      </button>

      {status === 'error' && (
        <p className="mt-2 text-sm text-[var(--danger)]">{errorMessage}</p>
      )}

      {showWallets && status !== 'success' && (
        <div className="mt-3 p-3 glass-card rounded-2xl animate-fade-in">
          <h3 className="text-sm text-[var(--muted-foreground)] mb-2">Select a wallet:</h3>
          <div className="grid grid-cols-1 gap-2">
            {WALLETS.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleConnect(wallet)}
                disabled={isLoading || status === 'processing'}
                className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-[rgba(80,227,194,0.1)] transition-all duration-200"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {wallet.icon}
                </div>
                <span className="text-white">{wallet.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 