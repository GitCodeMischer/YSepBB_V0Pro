'use client';

import React from 'react';
import { FaWallet, FaUniversity, FaCreditCard, FaPiggyBank, FaPlus, FaChartLine, FaLock } from 'react-icons/fa';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';

// Account type icon component
const AccountTypeIcon = ({ type }) => {
  switch(type.toLowerCase()) {
    case 'checking':
      return <FaWallet className="text-blue-500" />;
    case 'savings':
      return <FaPiggyBank className="text-green-500" />;
    case 'credit card':
      return <FaCreditCard className="text-red-500" />;
    case 'investment':
      return <FaChartLine className="text-purple-500" />;
    default:
      return <FaUniversity className="text-gray-400" />;
  }
};

export default function AccountsPage() {
  // Mock data for accounts
  const accountColumns = [
    { 
      header: 'Account', 
      accessor: 'account',
      cell: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#181818] flex items-center justify-center mr-3">
            <AccountTypeIcon type={row.type} />
          </div>
          <div>
            <div className="font-medium">{row.account}</div>
            <div className="text-xs text-gray-500">{row.type}</div>
          </div>
        </div>
      )
    },
    { header: 'Institution', accessor: 'institution' },
    { header: 'Balance', accessor: 'balance' },
    { header: 'Available', accessor: 'available' },
    { header: 'Last Updated', accessor: 'lastUpdated' },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (row) => (
        <div className={`px-2 py-1 rounded-full text-xs text-center w-24 ${
          row.status === 'Connected' ? 'bg-green-900/30 text-green-400' : 
          row.status === 'Pending' ? 'bg-yellow-900/30 text-yellow-400' : 
          'bg-red-900/30 text-red-400'
        }`}>
          {row.status}
        </div>
      )
    }
  ];
  
  const accountData = [
    { 
      account: 'Main Checking', 
      type: 'Checking', 
      institution: 'Bank of America', 
      balance: '$5,230.45',
      available: '$5,230.45',
      lastUpdated: 'Today, 2:30 PM',
      status: 'Connected'
    },
    { 
      account: 'Emergency Fund', 
      type: 'Savings', 
      institution: 'Ally Bank', 
      balance: '$12,450.00',
      available: '$12,450.00',
      lastUpdated: 'Today, 10:15 AM',
      status: 'Connected'
    },
    { 
      account: 'Joint Account', 
      type: 'Checking', 
      institution: 'Chase', 
      balance: '$3,782.33',
      available: '$3,782.33',
      lastUpdated: 'Yesterday, 8:45 PM',
      status: 'Connected'
    },
    { 
      account: 'Travel Savings', 
      type: 'Savings', 
      institution: 'Capital One', 
      balance: '$2,890.25',
      available: '$2,890.25',
      lastUpdated: 'Today, 3:10 PM',
      status: 'Connected'
    },
    { 
      account: 'Rewards Card', 
      type: 'Credit Card', 
      institution: 'American Express', 
      balance: '-$1,245.67',
      available: '$8,754.33',
      lastUpdated: 'Today, 1:45 PM',
      status: 'Connected'
    },
    { 
      account: 'Investment Portfolio', 
      type: 'Investment', 
      institution: 'Fidelity', 
      balance: '$45,320.18',
      available: '$45,320.18',
      lastUpdated: 'Yesterday, 5:30 PM',
      status: 'Connected'
    }
  ];
  
  // Calculate totals
  const totalBalance = accountData.reduce((sum, account) => {
    const balance = parseFloat(account.balance.replace(/[^0-9.-]+/g, ""));
    return sum + balance;
  }, 0);
  
  const totalAssets = accountData.filter(account => !account.balance.includes('-')).reduce((sum, account) => {
    const balance = parseFloat(account.balance.replace(/[^0-9.-]+/g, ""));
    return sum + balance;
  }, 0);
  
  const totalLiabilities = Math.abs(accountData.filter(account => account.balance.includes('-')).reduce((sum, account) => {
    const balance = parseFloat(account.balance.replace(/[^0-9.-]+/g, ""));
    return sum + balance;
  }, 0));
  
  return (
    <Layout>
      <PageContainer 
        title="Accounts" 
        subtitle="Manage your bank and investment accounts"
        icon={<FaUniversity size={20} />}
      >
        <div className="flex justify-end mb-6">
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] rounded-xl text-black font-medium text-sm">
            <FaPlus size={14} className="mr-2" />
            <span>Add Account</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Balance" 
            value={`$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            icon={<FaUniversity size={16} />} 
            trend="up" 
            trendValue="3.2%"
            bgClass="bg-gradient-to-r from-[#131313] to-[#1a1a1a]"
          />
          <StatCard 
            title="Total Assets" 
            value={`$${totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            icon={<FaWallet size={16} />} 
            trend="up" 
            trendValue="4.5%"
          />
          <StatCard 
            title="Total Liabilities" 
            value={`$${totalLiabilities.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            icon={<FaCreditCard size={16} />} 
            trend="down" 
            trendValue="2.1%"
          />
          <StatCard 
            title="Connected Accounts" 
            value={accountData.length} 
            icon={<FaLock size={16} />} 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Account Balances"
              subtitle="Last 6 months"
              height="h-80"
            />
          </div>
          <div>
            <ChartCard 
              title="Asset Allocation"
              subtitle="By account type"
              height="h-80"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Your Accounts"
            subtitle="Connected financial accounts"
            columns={accountColumns}
            data={accountData.map(item => ({
              ...item,
              account: (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#181818] flex items-center justify-center mr-3">
                    <AccountTypeIcon type={item.type} />
                  </div>
                  <div>
                    <div className="font-medium">{item.account}</div>
                    <div className="text-xs text-gray-500">{item.type}</div>
                  </div>
                </div>
              ),
              status: (
                <div className={`px-2 py-1 rounded-full text-xs text-center w-24 ${
                  item.status === 'Connected' ? 'bg-green-900/30 text-green-400' : 
                  item.status === 'Pending' ? 'bg-yellow-900/30 text-yellow-400' : 
                  'bg-red-900/30 text-red-400'
                }`}>
                  {item.status}
                </div>
              )
            }))}
            showActionButtons={true}
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 