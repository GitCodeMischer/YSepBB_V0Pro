import React from 'react';

export default function LiquidStaking() {
  return (
    <div className="bg-gradient-to-br from-[#2c2e3d] to-[#1e1f2b] rounded-xl p-6 text-white h-full relative overflow-hidden border border-[#3c3e4d] hover-scale">
      {/* Animated background glow effect */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-[#8846ff] blur-[80px] opacity-20"></div>
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#5e5ce6] blur-[80px] opacity-20"></div>
      
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex items-center">
          <div className="h-10 w-10 animated-gradient rounded-full flex items-center justify-center text-white font-bold mr-2 glow-purple">S</div>
          <span className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#5e5ce6] to-[#b249f8]">Stakeint<sup className="text-[10px]">®</sup></span>
        </div>
        <div className="text-xs bg-gradient-to-r from-[#5e5ce6] to-[#8846ff] text-white px-2 py-1 rounded glow-purple">New</div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4 relative z-10">Liquid Staking Portfolio</h2>
      
      <p className="text-sm text-gray-400 mb-6 relative z-10">
        A self-custodial platform that helps you make smarter investments on Ethereum Liquid Staking
      </p>
      
      <button className="bg-gradient-to-r from-[#5e5ce6] to-[#8846ff] hover:from-[#6e6cf6] hover:to-[#9856ff] text-white w-full py-3 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 transform hover:-translate-y-1 glow-purple relative z-10">
        <span>Connect with Wallet</span>
        <span className="ml-2 text-lg">🔗</span>
      </button>
      
      <button className="bg-transparent border border-[#4c4e59] hover:bg-[#3c3e49] text-white w-full py-3 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 relative z-10">
        <span>Enter a Wallet Address</span>
        <span className="ml-2 text-lg">🔍</span>
      </button>
      
      {/* Feature highlights */}
      <div className="mt-8 relative z-10">
        <div className="text-xs uppercase text-gray-500 mb-3 tracking-wider">Features</div>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#5e5ce6] mr-2"></div>
            <span className="text-sm text-gray-300">Real-time performance tracking</span>
          </div>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8846ff] mr-2"></div>
            <span className="text-sm text-gray-300">Multi-asset staking strategies</span>
          </div>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#b249f8] mr-2"></div>
            <span className="text-sm text-gray-300">Optimized rewards distribution</span>
          </div>
        </div>
      </div>
    </div>
  );
} 