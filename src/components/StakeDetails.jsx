import React, { useState } from 'react';
import { 
  FaArrowRightArrowLeft, 
  FaArrowTrendUp, 
  FaRegClock, 
  FaEllipsis, 
  FaChevronRight,
  FaFilter,
  FaSort,
  FaStar
} from 'react-icons/fa6';

export default function StakeDetails() {
  const [activeTab, setActiveTab] = useState('all');
  
  const stakeData = [
    {
      id: 1,
      asset: {
        name: 'Ethereum',
        symbol: 'ETH',
        icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        color: '#627EEA'
      },
      amount: '2.45 ETH',
      value: '$4,534',
      apy: '4.8%',
      rewards: '$215.42',
      duration: '90 days',
      status: 'active',
      timeRemaining: '58 days',
      isFavorite: true
    },
    {
      id: 2,
      asset: {
        name: 'Solana',
        symbol: 'SOL',
        icon: 'https://cryptologos.cc/logos/solana-sol-logo.png',
        color: '#9945FF'
      },
      amount: '42.8 SOL',
      value: '$3,240',
      apy: '7.5%',
      rewards: '$182.30',
      duration: '30 days',
      status: 'active',
      timeRemaining: '12 days',
      isFavorite: false
    },
    {
      id: 3,
      asset: {
        name: 'BNB Chain',
        symbol: 'BNB',
        icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
        color: '#F3BA2F'
      },
      amount: '8.72 BNB',
      value: '$2,985',
      apy: '6.2%',
      rewards: '$164.76',
      duration: '60 days',
      status: 'active',
      timeRemaining: '21 days',
      isFavorite: false
    }
  ];

  return (
    <div className="bg-[#10131e] rounded-xl border border-[#151823] shadow-lg overflow-hidden">
      {/* Tabs and filters */}
      <div className="flex justify-between items-center p-4 border-b border-[#151823]">
        <div className="flex space-x-1">
          <button 
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === 'all' ? 'bg-[#151823] text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('all')}
          >
            All Assets
          </button>
          <button 
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === 'eth' ? 'bg-[#151823] text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('eth')}
          >
            Ethereum
          </button>
          <button 
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === 'sol' ? 'bg-[#151823] text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('sol')}
          >
            Solana
          </button>
          <button 
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === 'other' ? 'bg-[#151823] text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('other')}
          >
            Other
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg text-gray-400 hover:text-white bg-[#151823] border border-[#1f2436] transition-colors">
            <FaFilter size={12} />
          </button>
          <button className="p-2 rounded-lg text-gray-400 hover:text-white bg-[#151823] border border-[#1f2436] transition-colors">
            <FaSort size={12} />
          </button>
        </div>
      </div>
      
      {/* Table header */}
      <div className="grid grid-cols-11 gap-4 px-4 py-3 border-b border-[#151823] bg-[#0a0c17] text-xs font-medium text-gray-400">
        <div className="col-span-3">Asset</div>
        <div className="col-span-1 text-right">Amount</div>
        <div className="col-span-1 text-right">Value</div>
        <div className="col-span-1 text-right">APY</div>
        <div className="col-span-2 text-right">Rewards</div>
        <div className="col-span-2 text-right">Time Left</div>
        <div className="col-span-1 text-right">Actions</div>
      </div>
      
      {/* Table body */}
      {stakeData.map((stake) => (
        <div 
          key={stake.id} 
          className="grid grid-cols-11 gap-4 px-4 py-3 border-b border-[#151823] hover:bg-[#151823] transition-colors"
        >
          {/* Asset */}
          <div className="col-span-3 flex items-center">
            <button className="p-1 mr-2 text-gray-400 hover:text-[#CCFF00] transition-colors">
              <FaStar size={12} className={stake.isFavorite ? "text-[#CCFF00]" : ""} />
            </button>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center mr-3 shadow-md overflow-hidden" style={{ backgroundColor: stake.asset.color }}>
              <img src={stake.asset.icon} alt={stake.asset.name} className="h-5 w-5 object-contain" />
            </div>
            <div>
              <div className="font-medium text-white text-sm">{stake.asset.name}</div>
              <div className="text-[10px] text-gray-400">{stake.asset.symbol}</div>
            </div>
          </div>
          
          {/* Amount */}
          <div className="col-span-1 flex items-center justify-end text-white font-medium text-sm">
            {stake.amount}
          </div>
          
          {/* Value */}
          <div className="col-span-1 flex items-center justify-end text-white font-medium text-sm">
            {stake.value}
          </div>
          
          {/* APY */}
          <div className="col-span-1 flex items-center justify-end">
            <div className="flex items-center text-[#CCFF00] font-medium text-sm">
              <FaArrowTrendUp className="mr-1" size={10} />
              {stake.apy}
            </div>
          </div>
          
          {/* Rewards */}
          <div className="col-span-2 flex items-center justify-end">
            <div className="text-white font-medium text-sm mr-1">
              {stake.rewards}
            </div>
            <div className="px-1.5 py-0.5 rounded bg-[#0a0c17] border border-[#1f2436]">
              <span className="text-[#a3a3ff] text-[10px] font-medium">+$12.45</span>
            </div>
          </div>
          
          {/* Time Left */}
          <div className="col-span-2 flex items-center justify-end">
            <div className="flex flex-col items-end">
              <div className="flex items-center text-white text-sm">
                <FaRegClock className="mr-1 text-gray-400" size={10} />
                <span>{stake.timeRemaining}</span>
              </div>
              <div className="w-24 h-1 bg-[#1f2436] rounded-full mt-1 overflow-hidden">
                <div className="h-full rounded-full" style={{ 
                  width: stake.timeRemaining.includes('58') ? '64%' : 
                         stake.timeRemaining.includes('12') ? '40%' : '35%',
                  backgroundColor: stake.asset.color
                }}></div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="col-span-1 flex items-center justify-end space-x-1">
            <button className="p-1.5 rounded-md hover:bg-[#1c202c] text-gray-400 hover:text-white transition-colors">
              <FaArrowRightArrowLeft size={12} />
            </button>
            <button className="p-1.5 rounded-md hover:bg-[#1c202c] text-gray-400 hover:text-white transition-colors">
              <FaEllipsis size={12} />
            </button>
          </div>
        </div>
      ))}
      
      {/* Footer with view more button */}
      <div className="p-4 flex justify-center">
        <button className="text-[#4f46e5] hover:text-[#6366f1] text-sm font-medium flex items-center transition-colors">
          <span>View All Staked Assets</span>
          <FaChevronRight className="ml-1" size={10} />
        </button>
      </div>
    </div>
  );
} 