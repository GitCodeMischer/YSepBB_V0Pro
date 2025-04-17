'use client';

import React from 'react';
import { FaUniversity, FaCreditCard, FaPiggyBank, FaWallet, FaPlus, FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import StatCard from '@/components/dashboard/StatCard';

export default function AccountOverviewPage() {
  // Mock data for accounts
  const accountColumns = [
    { header: 'Account', accessor: 'account' },
    { header: 'Type', accessor: 'type' },
    { header: 'Balance', accessor: 'balance' },
    { header: 'Available', accessor: 'available' },
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
      type: 'Checking',
      balance: '$2,450.75', 
      available: '$2,400.75',
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
      type: 'Savings',
      balance: '$10,200.00', 
      available: '$10,200.00',
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
      type: 'Savings',
      balance: '$3,647.82', 
      available: '$3,647.82',
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
      type: 'Credit Card',
      balance: '-$750.45', 
      available: '$9,249.55',
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
      type: 'Credit Card',
      balance: '-$1,423.66', 
      available: '$3,576.34',
      lastUpdated: '1 hour ago'
    }
  ];
  
  return (
    <Layout>
      <PageContainer 
        title="Account Overview" 
        subtitle="Monitor all your linked financial accounts"
        icon={<FaUniversity size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Assets"
            value="$16,298.57"
            trend="+$845.22"
            trendDirection="up"
            icon={<FaWallet />}
            color="blue"
          />
          <StatCard
            title="Total Debt"
            value="$2,174.11"
            trend="-$156.33"
            trendDirection="down"
            icon={<FaCreditCard />}
            color="red"
          />
          <StatCard
            title="Net Worth"
            value="$14,124.46"
            trend="+$1,001.55"
            trendDirection="up"
            icon={<FaPiggyBank />}
            color="green"
          />
          <StatCard
            title="Account Count"
            value="5"
            trend="+1"
            trendDirection="up"
            icon={<FaUniversity />}
            color="purple"
          />
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-white">Your Accounts</h2>
            <div className="flex space-x-2">
              <button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-lg text-sm flex items-center">
                <FaPlus className="mr-2" size={14} />
                Add Account
              </button>
              <button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-lg text-sm flex items-center">
                <FaSortAmountUp className="mr-2" size={14} />
                Sort
              </button>
            </div>
          </div>
          
          <DataTable
            title="All Accounts"
            subtitle="Complete view of your linked accounts"
            columns={accountColumns}
            data={accountData}
            showActionButtons={true}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard 
            title="Account Balances"
            subtitle="6 month trend"
            height="h-80"
          />
          <ChartCard 
            title="Assets vs. Debt"
            subtitle="Breakdown of your financial position"
            height="h-80"
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 