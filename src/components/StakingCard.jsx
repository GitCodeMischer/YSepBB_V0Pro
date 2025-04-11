import React from 'react';
import { FaArrowTrendUp, FaArrowRightLong, FaEllipsis, FaStar } from 'react-icons/fa6';

export default function StakingCard({ 
  title = "Ethereum Staking", 
  apy = "4.8%", 
  description = "Earn staking rewards by providing liquidity to the Ethereum network", 
  stakedAmount = "$5,200", 
  icon = "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  performance = "+12.4%",
  isFavorite = false
}) {
  return (
    <div className="bg-[#10131e] rounded-xl border border-[#151823] p-5 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden hover-lift group">
      {/* Background glow effect */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#4f46e5] opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-all duration-500"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-lg bg-[#0a0c17] border border-[#1f2436] flex items-center justify-center shadow-lg mr-3 overflow-hidden">
            <img src={icon} alt={title} className="h-7 w-7 object-contain" />
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-base">{title}</h3>
            <div className="flex items-center mt-0.5">
              <div className="flex items-center text-xs mr-2">
                <FaArrowTrendUp className="mr-1 text-[#CCFF00]" size={10} />
                <span className="text-[#CCFF00] font-medium">{performance}</span>
              </div>
              <div className="px-1.5 py-0.5 rounded bg-[#0a0c17] border border-[#1f2436]">
                <span className="text-white text-[10px] font-medium">APY: {apy}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex">
          <button className="p-1.5 rounded text-gray-400 hover:text-[#CCFF00] transition-colors">
            <FaStar size={14} className={isFavorite ? "text-[#CCFF00]" : ""} />
          </button>
          <button className="p-1.5 rounded text-gray-400 hover:text-[#CCFF00] transition-colors">
            <FaEllipsis size={14} />
          </button>
        </div>
      </div>
      
      <div className="h-0.5 w-full bg-[#151823] rounded-full mb-4 overflow-hidden">
        <div className="h-full w-2/3 bg-gradient-to-r from-[#4f46e5] to-[#a855f7]"></div>
      </div>
      
      <p className="text-gray-400 text-xs mb-4 line-clamp-2">{description}</p>
      
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-[10px] uppercase tracking-wider font-medium mb-0.5">Current Position</p>
          <p className="text-white font-semibold">{stakedAmount}</p>
        </div>
        
        <button className="flex items-center justify-center px-3 py-2 rounded-lg bg-[#CCFF00] hover:bg-[#b5e600] text-black text-xs font-semibold transition-all hover-glow-lime">
          <span>Stake</span>
          <FaArrowRightLong className="ml-1.5" size={10} />
        </button>
      </div>
      
      {/* Micro chart overlay */}
      <div className="absolute bottom-0 right-0 h-16 w-24 opacity-15">
        <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
          <path d="M0,50 L10,45 L20,48 L30,40 L40,42 L50,35 L60,30 L70,25 L80,20 L90,15 L100,10" 
            stroke="#CCFF00" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  );
} 