'use client';

import React from 'react';
import { FaBitcoin, FaEthereum, FaArrowUp, FaArrowDown, FaCircleInfo, FaChartPie } from 'react-icons/fa6';
import { SiSolana } from 'react-icons/si';

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Portfolio</h1>
      
      {/* Asset Summary */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Portfolio Overview</h2>
          <div className="flex mt-2 md:mt-0 space-x-2">
            <button className="glass-button px-4 py-2 text-sm">
              Add Asset
            </button>
            <button className="glass-button px-4 py-2 text-sm">
              Export
            </button>
          </div>
        </div>
        
        <div className="card">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Assets List */}
            <div className="lg:col-span-3 space-y-4">
              {/* Bitcoin */}
              <div className="asset-card flex flex-col sm:flex-row sm:items-center justify-between p-4">
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="w-12 h-12 rounded-xl bg-[#F7931A]/20 flex items-center justify-center text-[#F7931A] mr-4">
                    <FaBitcoin size={24} />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="font-bold text-lg">Bitcoin</div>
                      <div className="text-[var(--muted-foreground)] ml-2">BTC</div>
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)]">0.15 BTC</div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end">
                  <div className="font-bold text-lg">$5,642.03</div>
                  <div className="flex items-center text-green-500 text-sm">
                    <FaArrowUp className="mr-1" size={12} />
                    3.2% today
                  </div>
                </div>
              </div>
              
              {/* Ethereum */}
              <div className="asset-card flex flex-col sm:flex-row sm:items-center justify-between p-4">
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="w-12 h-12 rounded-xl bg-[#627EEA]/20 flex items-center justify-center text-[#627EEA] mr-4">
                    <FaEthereum size={24} />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="font-bold text-lg">Ethereum</div>
                      <div className="text-[var(--muted-foreground)] ml-2">ETH</div>
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)]">3.45 ETH</div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end">
                  <div className="font-bold text-lg">$6,320.00</div>
                  <div className="flex items-center text-red-500 text-sm">
                    <FaArrowDown className="mr-1" size={12} />
                    1.8% today
                  </div>
                </div>
              </div>
              
              {/* Solana */}
              <div className="asset-card flex flex-col sm:flex-row sm:items-center justify-between p-4">
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="w-12 h-12 rounded-xl bg-[#14F195]/20 flex items-center justify-center text-[#14F195] mr-4">
                    <SiSolana size={24} />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="font-bold text-lg">Solana</div>
                      <div className="text-[var(--muted-foreground)] ml-2">SOL</div>
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)]">28.5 SOL</div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end">
                  <div className="font-bold text-lg">$1,423.20</div>
                  <div className="flex items-center text-green-500 text-sm">
                    <FaArrowUp className="mr-1" size={12} />
                    5.7% today
                  </div>
                </div>
              </div>
            </div>
            
            {/* Asset Distribution */}
            <div className="card flex flex-col items-center justify-center p-4 lg:p-0">
              <div className="w-14 h-14 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] mb-4">
                <FaChartPie size={24} />
              </div>
              <div className="text-lg font-semibold mb-2">Asset Distribution</div>
              <div className="text-2xl font-bold mb-1">$13,385.23</div>
              <div className="text-sm text-[var(--muted-foreground)] mb-4">Total value</div>
              
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#F7931A] mr-2"></div>
                    <div className="text-sm">BTC</div>
                  </div>
                  <div className="text-sm">42%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#627EEA] mr-2"></div>
                    <div className="text-sm">ETH</div>
                  </div>
                  <div className="text-sm">47%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#14F195] mr-2"></div>
                    <div className="text-sm">SOL</div>
                  </div>
                  <div className="text-sm">11%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 