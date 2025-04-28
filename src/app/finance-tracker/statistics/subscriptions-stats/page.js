'use client';

import React from 'react';
import { FaReceipt, FaRegCalendar, FaWallet, FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import StatCard from '@/components/dashboard/StatCard';
import DataTable from '@/components/dashboard/DataTable';

export default function SubscriptionsStatsPage() {
  // Mock data for subscriptions
  const subscriptionColumns = [
    { header: 'Service', accessor: 'service' },
    { header: 'Category', accessor: 'category' },
    { header: 'Billing Cycle', accessor: 'cycle' },
    { header: 'Monthly Cost', accessor: 'monthlyCost' },
    { header: 'Annual Cost', accessor: 'annualCost' },
    { 
      header: 'Usage Score', 
      accessor: 'usageScore',
      cell: (row) => (
        <div className="flex items-center">
          <div className="relative w-full bg-[#222] rounded-full h-2.5 mr-2">
            <div 
              className={`h-2.5 rounded-full ${
                row.usageScore >= 70 ? 'bg-green-500' : 
                row.usageScore >= 40 ? 'bg-yellow-500' : 
                'bg-red-500'
              }`} 
              style={{ width: `${row.usageScore}%` }}
            ></div>
          </div>
          <span className="text-xs whitespace-nowrap">{row.usageScore}%</span>
        </div>
      )
    }
  ];
  
  const subscriptionData = [
    { 
      service: 'Netflix', 
      category: 'Entertainment', 
      cycle: 'Monthly', 
      monthlyCost: '$14.99',
      annualCost: '$179.88',
      usageScore: 85
    },
    { 
      service: 'Spotify', 
      category: 'Entertainment', 
      cycle: 'Monthly', 
      monthlyCost: '$9.99',
      annualCost: '$119.88',
      usageScore: 90
    },
    { 
      service: 'Amazon Prime', 
      category: 'Shopping', 
      cycle: 'Annual', 
      monthlyCost: '$12.99',
      annualCost: '$155.88',
      usageScore: 75
    },
    { 
      service: 'Disney+', 
      category: 'Entertainment', 
      cycle: 'Monthly', 
      monthlyCost: '$7.99',
      annualCost: '$95.88',
      usageScore: 35
    },
    { 
      service: 'Adobe Creative Cloud', 
      category: 'Productivity', 
      cycle: 'Monthly', 
      monthlyCost: '$52.99',
      annualCost: '$635.88',
      usageScore: 60
    },
    { 
      service: 'iCloud Storage', 
      category: 'Cloud Storage', 
      cycle: 'Monthly', 
      monthlyCost: '$2.99',
      annualCost: '$35.88',
      usageScore: 95
    },
    { 
      service: 'Fitness App', 
      category: 'Health', 
      cycle: 'Annual', 
      monthlyCost: '$6.25',
      annualCost: '$75.00',
      usageScore: 30
    },
    { 
      service: 'New York Times', 
      category: 'News', 
      cycle: 'Monthly', 
      monthlyCost: '$4.99',
      annualCost: '$59.88',
      usageScore: 25
    }
  ];

  // Calculate totals and stats
  const monthlyTotal = subscriptionData.reduce((sum, item) => {
    return sum + parseFloat(item.monthlyCost.replace(/[^0-9.-]+/g, ""));
  }, 0);
  
  const annualTotal = subscriptionData.reduce((sum, item) => {
    return sum + parseFloat(item.annualCost.replace(/[^0-9.-]+/g, ""));
  }, 0);
  
  const lowUsageCount = subscriptionData.filter(item => item.usageScore < 40).length;
  
  const categoryCosts = subscriptionData.reduce((acc, item) => {
    const category = item.category;
    const monthlyCost = parseFloat(item.monthlyCost.replace(/[^0-9.-]+/g, ""));
    acc[category] = (acc[category] || 0) + monthlyCost;
    return acc;
  }, {});
  
  const topCategory = Object.entries(categoryCosts)
    .sort((a, b) => b[1] - a[1])[0];
  
  return (
    <Layout>
      <PageContainer 
        title="Subscriptions Statistics" 
        subtitle="Analysis of your subscription services and usage"
        icon={<FaReceipt size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Monthly Spending" 
            value={`$${monthlyTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            icon={<FaReceipt size={16} />} 
            trend="up" 
            trendValue="8.3%"
          />
          <StatCard 
            title="Annual Cost" 
            value={`$${annualTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            icon={<FaWallet size={16} />} 
          />
          <StatCard 
            title="Top Category" 
            value={`${topCategory[0]}`} 
            icon={<FaChartLine size={16} />} 
            trend="up" 
            trendValue={`$${topCategory[1].toFixed(2)}`}
          />
          <StatCard 
            title="Low Usage" 
            value={`${lowUsageCount} services`} 
            icon={<FaArrowDown size={16} />} 
            trend="neutral"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Subscription Spending Trend"
              subtitle="Last 12 months"
              height="h-80"
            />
          </div>
          <div>
            <ChartCard 
              title="Category Breakdown"
              subtitle="Monthly spending by category"
              height="h-80"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Subscription Analytics"
            subtitle="Usage and cost analysis of your subscription services"
            columns={subscriptionColumns}
            data={subscriptionData.map(item => ({
              ...item,
              usageScore: (
                <div className="flex items-center">
                  <div className="relative w-full bg-[#222] rounded-full h-2.5 mr-2">
                    <div 
                      className={`h-2.5 rounded-full ${
                        item.usageScore >= 70 ? 'bg-green-500' : 
                        item.usageScore >= 40 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`} 
                      style={{ width: `${item.usageScore}%` }}
                    ></div>
                  </div>
                  <span className="text-xs whitespace-nowrap">{item.usageScore}%</span>
                </div>
              )
            }))}
            showActionButtons={false}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#131313] p-6 rounded-2xl border border-[#222]/40">
            <h3 className="text-white font-medium mb-4">Renewal Timeline</h3>
            <div className="text-sm text-gray-400">
              <p className="mb-6">Upcoming subscription renewals</p>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-lg bg-[#1a1a1a]">
                  <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center mr-3">
                    <FaRegCalendar className="text-[#50E3C2]" size={14} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h4 className="text-white text-sm font-medium">Netflix</h4>
                      <span className="text-[#50E3C2] text-xs">3 days</span>
                    </div>
                    <p className="text-xs text-gray-400">$14.99 monthly</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-lg bg-[#1a1a1a]">
                  <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center mr-3">
                    <FaRegCalendar className="text-[#50E3C2]" size={14} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h4 className="text-white text-sm font-medium">Spotify</h4>
                      <span className="text-[#50E3C2] text-xs">7 days</span>
                    </div>
                    <p className="text-xs text-gray-400">$9.99 monthly</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-lg bg-[#1a1a1a]">
                  <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center mr-3">
                    <FaRegCalendar className="text-[#50E3C2]" size={14} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h4 className="text-white text-sm font-medium">Adobe Creative Cloud</h4>
                      <span className="text-[#50E3C2] text-xs">12 days</span>
                    </div>
                    <p className="text-xs text-gray-400">$52.99 monthly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#131313] p-6 rounded-2xl border border-[#222]/40">
            <h3 className="text-white font-medium mb-4">Optimization Opportunities</h3>
            <div className="text-sm text-gray-400 mb-4">
              <p>Consider canceling or downgrading these low-usage subscriptions</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">
                    <FaArrowDown size={14} className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">Disney+</h4>
                    <p className="text-xs text-gray-400 mt-1">Usage score: 35% - Only used 2 times last month</p>
                    <p className="text-xs text-green-500 mt-1">Potential annual savings: $95.88</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">
                    <FaArrowDown size={14} className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">Fitness App</h4>
                    <p className="text-xs text-gray-400 mt-1">Usage score: 30% - Not used in 45 days</p>
                    <p className="text-xs text-green-500 mt-1">Potential annual savings: $75.00</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">
                    <FaArrowDown size={14} className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">New York Times</h4>
                    <p className="text-xs text-gray-400 mt-1">Usage score: 25% - Last accessed over 2 months ago</p>
                    <p className="text-xs text-green-500 mt-1">Potential annual savings: $59.88</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
} 