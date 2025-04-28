'use client';

import React from 'react';
import { FaChartLine, FaChartBar, FaPercent, FaCoins, FaArrowUp, FaArrowDown, FaCalendarDays } from 'react-icons/fa6';

export default function AnalyticsPage() {
  // Monthly performance data
  const monthlyData = [
    { month: 'January', returns: '+4.2%', value: '$12,230' },
    { month: 'February', returns: '+3.8%', value: '$12,694' },
    { month: 'March', returns: '+5.1%', value: '$13,341' },
    { month: 'April', returns: '+2.3%', value: '$13,648' },
    { month: 'May', returns: '-1.5%', value: '$13,443' },
    { month: 'June', returns: '+3.9%', value: '$13,967' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Analytics</h1>
      
      {/* Performance Metrics */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Staked Value */}
          <div className="performance-card floating">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-[var(--muted-foreground)]">Total Staked Value</div>
                <div className="w-8 h-8 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
                  <FaCoins size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">$15,325.48</div>
              <div className="flex items-center text-xs text-green-500">
                <FaArrowUp className="mr-1" />
                <span>+12.3% in 30 days</span>
              </div>
            </div>
          </div>
          
          {/* Average APY */}
          <div className="performance-card floating">
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
                <span>+0.2% from last month</span>
              </div>
            </div>
          </div>
          
          {/* Rewards Earned */}
          <div className="performance-card floating">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-[var(--muted-foreground)]">Rewards Earned</div>
                <div className="w-8 h-8 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
                  <FaChartLine size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">$427.35</div>
              <div className="flex items-center text-xs text-green-500">
                <FaArrowUp className="mr-1" />
                <span>+5.3% from last month</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Performance Chart */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Performance Chart</h2>
          <div className="flex mt-2 md:mt-0 space-x-2">
            <button className="glass-button px-4 py-2 text-sm">
              1M
            </button>
            <button className="glass-button px-4 py-2 text-sm bg-[var(--primary)]/20 text-white">
              3M
            </button>
            <button className="glass-button px-4 py-2 text-sm">
              1Y
            </button>
            <button className="glass-button px-4 py-2 text-sm">
              ALL
            </button>
          </div>
        </div>
        
        <div className="chart-card">
          <div className="flex items-center justify-center p-6 lg:p-10 h-[180px] md:h-[250px] lg:h-[300px]">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] mb-4">
                <FaChartBar size={24} />
              </div>
              <p className="text-lg font-medium mb-2">Advanced Analytics</p>
              <p className="text-sm text-[var(--muted-foreground)] max-w-md">
                Interactive performance charts and detailed analytics will be available soon.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Historical Performance */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Historical Performance</h2>
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left p-4">
                    <div className="flex items-center">
                      <FaCalendarDays className="mr-2 text-[var(--primary)]" size={14} />
                      <span>Month</span>
                    </div>
                  </th>
                  <th className="text-left p-4">Returns</th>
                  <th className="text-right p-4">Value</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((item, index) => (
                  <tr key={index} className={index !== monthlyData.length - 1 ? "border-b border-[var(--card-border)]" : ""}>
                    <td className="p-4 font-medium">{item.month}</td>
                    <td className={`p-4 ${item.returns.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      <div className="flex items-center">
                        {item.returns.startsWith('+') ? 
                          <FaArrowUp className="mr-2" size={12} /> : 
                          <FaArrowDown className="mr-2" size={12} />
                        }
                        {item.returns}
                      </div>
                    </td>
                    <td className="p-4 text-right font-medium">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
} 