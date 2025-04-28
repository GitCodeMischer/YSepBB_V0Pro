'use client';

import React from 'react';
import { FaRobot, FaChartLine, FaWallet, FaArrowUp, FaArrowDown, FaLightbulb } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import StatCard from '@/components/dashboard/StatCard';

export default function AiOptimizationPage() {
  // AI-generated insights
  const insights = [
    {
      id: 1,
      title: 'Reduce food spending',
      description: 'Your food expenses are 30% higher than similar users. Consider meal planning to reduce costs.',
      impact: 'Potential monthly savings: $120',
      category: 'spending',
      icon: <FaArrowDown className="text-green-500" />
    },
    {
      id: 2,
      title: 'Subscription overlap',
      description: 'You have multiple streaming subscriptions with similar content. Consider consolidating them.',
      impact: 'Potential monthly savings: $25',
      category: 'subscriptions',
      icon: <FaArrowDown className="text-green-500" />
    },
    {
      id: 3,
      title: 'Investment opportunity',
      description: 'Based on your risk profile, consider allocating more to index funds for better returns.',
      impact: 'Potential annual gain: $450',
      category: 'investment',
      icon: <FaArrowUp className="text-[#50E3C2]" />
    },
    {
      id: 4,
      title: 'Credit card rewards',
      description: 'Switch your grocery purchases to your rewards card to maximize cashback.',
      impact: 'Potential annual gain: $180',
      category: 'optimization',
      icon: <FaArrowUp className="text-[#50E3C2]" />
    }
  ];
  
  return (
    <Layout>
      <PageContainer 
        title="AI Optimization" 
        subtitle="Smart insights and recommendations for your finances"
        icon={<FaRobot size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Potential Savings" 
            value="$145/mo" 
            icon={<FaWallet size={16} />} 
            trend="up" 
            trendValue="12.5%"
          />
          <StatCard 
            title="Optimization Score" 
            value="72/100" 
            icon={<FaRobot size={16} />} 
            trend="up" 
            trendValue="8 points"
          />
          <StatCard 
            title="Insights Generated" 
            value="12" 
            icon={<FaLightbulb size={16} />} 
          />
          <StatCard 
            title="Actions Taken" 
            value="5" 
            icon={<FaChartLine size={16} />} 
            trend="up" 
            trendValue="3 new"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Optimization Impact"
              subtitle="Projected financial improvement"
              height="h-80"
            />
          </div>
          <div>
            <ChartCard 
              title="Spending Efficiency"
              subtitle="Compared to similar profiles"
              height="h-80"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <div className="bg-[#131313] rounded-2xl border border-[#222]/40 overflow-hidden">
            <div className="p-6 border-b border-[#222]/60">
              <h3 className="text-white font-medium">AI-Generated Insights</h3>
              <p className="text-gray-400 text-sm mt-1">Personalized recommendations based on your financial data</p>
            </div>
            
            <div className="divide-y divide-[#222]/40">
              {insights.map((insight) => (
                <div key={insight.id} className="p-6 hover:bg-[#181818] transition-colors">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#181818] flex items-center justify-center mr-4 flex-shrink-0">
                      {insight.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{insight.title}</h4>
                      <p className="text-gray-400 text-sm mt-1 mb-2">{insight.description}</p>
                      <div className="text-xs inline-flex items-center px-2.5 py-1 rounded-full bg-[#50E3C2]/10 text-[#50E3C2]">
                        {insight.impact}
                      </div>
                    </div>
                    <button className="ml-auto bg-[#1a1a1a] hover:bg-[#222] text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#131313] p-6 rounded-2xl border border-[#222]/40">
            <h3 className="text-white font-medium mb-4">AI Learning Status</h3>
            <p className="text-gray-400 text-sm mb-4">The AI is continuously learning from your financial behavior to provide better recommendations.</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Spending Patterns</span>
                  <span className="text-sm text-[#50E3C2]">95%</span>
                </div>
                <div className="w-full bg-[#222] rounded-full h-2">
                  <div className="bg-[#50E3C2] h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Investment Preferences</span>
                  <span className="text-sm text-[#50E3C2]">70%</span>
                </div>
                <div className="w-full bg-[#222] rounded-full h-2">
                  <div className="bg-[#50E3C2] h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Savings Goals</span>
                  <span className="text-sm text-[#50E3C2]">85%</span>
                </div>
                <div className="w-full bg-[#222] rounded-full h-2">
                  <div className="bg-[#50E3C2] h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#131313] p-6 rounded-2xl border border-[#222]/40">
            <h3 className="text-white font-medium mb-4">Your Financial Health</h3>
            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#222"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#50E3C2"
                    strokeWidth="2"
                    strokeDasharray="75, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">75</span>
                  <span className="text-sm text-gray-400">Good</span>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-lg bg-[#1a1a1a]">
                <h4 className="text-[#50E3C2] text-sm">Debt</h4>
                <p className="text-white font-medium">Low</p>
              </div>
              <div className="p-2 rounded-lg bg-[#1a1a1a]">
                <h4 className="text-[#50E3C2] text-sm">Savings</h4>
                <p className="text-white font-medium">Moderate</p>
              </div>
              <div className="p-2 rounded-lg bg-[#1a1a1a]">
                <h4 className="text-[#50E3C2] text-sm">Spending</h4>
                <p className="text-white font-medium">High</p>
              </div>
              <div className="p-2 rounded-lg bg-[#1a1a1a]">
                <h4 className="text-[#50E3C2] text-sm">Planning</h4>
                <p className="text-white font-medium">Good</p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
} 