'use client';

import React from 'react';
import { FaWallet, FaUniversity, FaCreditCard, FaCoins, FaChartLine } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';

export default function AccountBalancesPage() {
  // Mock data for accounts
  const accountColumns = [
    { header: 'Account Name', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { header: 'Institution', accessor: 'institution' },
    { header: 'Balance', accessor: 'balance' },
    { header: 'Last Updated', accessor: 'lastUpdated' }
  ];
  
  const accountData = [
    { 
      name: 'Main Checking', 
      type: 'Checking', 
      institution: 'Nationwide Bank', 
      balance: '$4,250.33', 
      lastUpdated: 'Today' 
    },
    { 
      name: 'Savings Account', 
      type: 'Savings', 
      institution: 'Nationwide Bank', 
      balance: '$12,850.00', 
      lastUpdated: 'Today' 
    },
    { 
      name: 'Emergency Fund', 
      type: 'Savings', 
      institution: 'Capital One', 
      balance: '$5,500.00', 
      lastUpdated: 'Yesterday' 
    },
    { 
      name: 'Credit Card', 
      type: 'Credit', 
      institution: 'Chase', 
      balance: '-$745.29', 
      lastUpdated: '3 days ago' 
    },
    { 
      name: 'Investment Portfolio', 
      type: 'Investment', 
      institution: 'Vanguard', 
      balance: '$28,750.12', 
      lastUpdated: 'Yesterday' 
    }
  ];
  
  return (
    <Layout>
      <PageContainer 
        title="Account Balances" 
        subtitle="Overview of all your financial accounts"
        icon={<FaWallet size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Checking Accounts" 
            value="$4,250.33" 
            icon={<FaUniversity size={16} />} 
            trend="up" 
            trendValue="2.1%"
          />
          <StatCard 
            title="Savings Accounts" 
            value="$18,350.00" 
            icon={<FaWallet size={16} />} 
            trend="up" 
            trendValue="5.3%"
          />
          <StatCard 
            title="Credit Accounts" 
            value="-$745.29" 
            icon={<FaCreditCard size={16} />} 
            trend="down" 
            trendValue="12.5%"
          />
          <StatCard 
            title="Investments" 
            value="$28,750.12" 
            icon={<FaCoins size={16} />} 
            trend="up" 
            trendValue="3.8%"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Account Balance History"
              subtitle="6-Month Trend"
              height="h-80"
            />
          </div>
          <div>
            <ChartCard 
              title="Asset Distribution"
              subtitle="By Account Type"
              height="h-80"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="All Accounts"
            subtitle="Your complete financial portfolio"
            columns={accountColumns}
            data={accountData}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <ChartCard 
            title="Net Worth Trend"
            subtitle="Track your overall financial progress"
            height="h-72"
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 