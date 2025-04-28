'use client';

import React from 'react';
import { FaArrowUp, FaArrowDown, FaWallet, FaChartLine, FaCoins, FaPercent, FaClock } from 'react-icons/fa6';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
      
      {/* Overview Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Balance Card */}
          <div className="card floating">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-[var(--muted-foreground)]">Total Balance</div>
                <div className="w-8 h-8 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
                  <FaWallet size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">$12,345.67</div>
              <div className="flex items-center text-xs text-green-500">
                <FaArrowUp className="mr-1" />
                <span>2.5% from last month</span>
              </div>
            </div>
          </div>
          
          {/* Staking Rewards Card */}
          <div className="card floating">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-[var(--muted-foreground)]">Staking Rewards</div>
                <div className="w-8 h-8 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
                  <FaCoins size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">$427.35</div>
              <div className="flex items-center text-xs text-green-500">
                <FaArrowUp className="mr-1" />
                <span>5.3% from last month</span>
              </div>
            </div>
          </div>
          
          {/* Active Stakes Card */}
          <div className="card floating">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-[var(--muted-foreground)]">Active Stakes</div>
                <div className="w-8 h-8 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
                  <FaChartLine size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">7</div>
              <div className="flex items-center text-xs text-red-500">
                <FaArrowDown className="mr-1" />
                <span>1 less than last month</span>
              </div>
            </div>
          </div>
          
          {/* Average APY Card */}
          <div className="card floating">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-[var(--muted-foreground)]">Average APY</div>
                <div className="w-8 h-8 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
                  <FaPercent size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">5.78%</div>
              <div className="flex items-center text-xs text-green-500">
                <FaArrowUp className="mr-1" />
                <span>0.2% from last month</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Activity Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <button className="glass-button px-4 py-2 text-sm">View All</button>
        </div>
        
        <div className="card">
          <div className="space-y-4">
            {/* Activity Item 1 */}
            <div className="flex items-center justify-between py-2 border-b border-[var(--card-border)]">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 mr-3">
                  <FaCoins size={16} />
                </div>
                <div>
                  <div className="font-medium">Staking Reward</div>
                  <div className="text-xs text-[var(--muted-foreground)] flex items-center mt-1">
                    <FaClock className="mr-1" size={12} />
                    <span>2 hours ago</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-500">+$21.50</div>
                <div className="text-xs text-[var(--muted-foreground)]">0.0021 ETH</div>
              </div>
            </div>
            
            {/* Activity Item 2 */}
            <div className="flex items-center justify-between py-2 border-b border-[var(--card-border)]">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 mr-3">
                  <FaCoins size={16} />
                </div>
                <div>
                  <div className="font-medium">Staking Reward</div>
                  <div className="text-xs text-[var(--muted-foreground)] flex items-center mt-1">
                    <FaClock className="mr-1" size={12} />
                    <span>Yesterday</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-500">+$19.72</div>
                <div className="text-xs text-[var(--muted-foreground)]">0.0019 ETH</div>
              </div>
            </div>
            
            {/* Activity Item 3 */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 mr-3">
                  <FaCoins size={16} />
                </div>
                <div>
                  <div className="font-medium">Staking Reward</div>
                  <div className="text-xs text-[var(--muted-foreground)] flex items-center mt-1">
                    <FaClock className="mr-1" size={12} />
                    <span>3 days ago</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-500">+$22.31</div>
                <div className="text-xs text-[var(--muted-foreground)]">0.0022 ETH</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 