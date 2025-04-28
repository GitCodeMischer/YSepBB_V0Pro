'use client';

import React from 'react';
import { FaUniversity, FaCreditCard, FaPiggyBank, FaWallet, FaPlus, FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import StatCard from '@/components/dashboard/StatCard';

export default function AccountBalancesPage() {
  // Mock data for accounts
  const accountColumns = [
    { header: 'Account', accessor: 'account' },
    { header: 'Current Balance', accessor: 'balance' },
    { header: 'Previous Balance', accessor: 'previousBalance' },
    { header: 'Change', accessor: 'change' },
    { header: 'Last Updated', accessor: 'lastUpdated' }
  ];
  
  const accountData = [
    { 
      account: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mr-3">
            <FaUniversity className="text-[#3B82F6]" />
          </div>
          <span>Main Checking</span>
        </div>
      ), 
      balance: '$2,450.75', 
      previousBalance: '$2,100.25',
      change: '+$350.50 (16.7%)',
      lastUpdated: '2 hours ago'
    },
    { 
      account: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center mr-3">
            <FaPiggyBank className="text-[#10B981]" />
          </div>
          <span>Emergency Fund</span>
        </div>
      ), 
      balance: '$10,200.00', 
      previousBalance: '$9,700.00',
      change: '+$500.00 (5.2%)',
      lastUpdated: '1 day ago'
    },
    { 
      account: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mr-3">
            <FaPiggyBank className="text-[#8B5CF6]" />
          </div>
          <span>Vacation Fund</span>
        </div>
      ), 
      balance: '$3,647.82', 
      previousBalance: '$3,447.82',
      change: '+$200.00 (5.8%)',
      lastUpdated: '1 day ago'
    },
    { 
      account: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center mr-3">
            <FaCreditCard className="text-[#F97316]" />
          </div>
          <span>Travel Credit Card</span>
        </div>
      ), 
      balance: '-$750.45', 
      previousBalance: '-$550.25',
      change: '-$200.20 (36.4%)',
      lastUpdated: '3 hours ago'
    },
    { 
      account: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#EC4899]/10 flex items-center justify-center mr-3">
            <FaCreditCard className="text-[#EC4899]" />
          </div>
          <span>Rewards Credit Card</span>
        </div>
      ), 
      balance: '-$1,423.66', 
      previousBalance: '-$1,623.85',
      change: '+$200.19 (12.3%)',
      lastUpdated: '1 hour ago'
    }
  ];
  
  return (
    <Layout>
      <PageContainer 
        title="Account Balances" 
        subtitle="Monitor your account balances and changes over time"
        icon={<FaWallet size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Cash"
            value="$16,298.57"
            icon={<FaWallet size={16} />}
            trend="up"
            trendValue="$1,050.50"
          />
          <StatCard
            title="Total Debt"
            value="$2,174.11"
            icon={<FaCreditCard size={16} />}
            trend="up"
            trendValue="$0.01"
          />
          <StatCard
            title="Net Worth"
            value="$14,124.46"
            icon={<FaChartLine size={16} />}
            trend="up"
            trendValue="$1,050.49"
          />
          <StatCard
            title="Monthly Change"
            value="+7.4%"
            icon={<FaChartLine size={16} />}
            trend="up"
            trendValue="2.1%"
          />
        </div>
        
        <div className="grid grid-cols-1 mb-8">
          <DataTable
            title="Account Balance Details"
            subtitle="Current balances and recent changes"
            columns={accountColumns}
            data={accountData}
            showActionButtons={true}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard 
            title="Balance History"
            subtitle="Last 6 months"
            height="h-80"
          />
          <ChartCard 
            title="Balance Distribution"
            subtitle="By account type"
            height="h-80"
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 