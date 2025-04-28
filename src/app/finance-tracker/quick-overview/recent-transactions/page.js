'use client';

import React from 'react';
import { FaRegNoteSticky, FaFilter, FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import StatCard from '@/components/dashboard/StatCard';

export default function RecentTransactionsPage() {
  // Mock data for transactions
  const transactionColumns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Description', accessor: 'description' },
    { header: 'Category', accessor: 'category' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Account', accessor: 'account' }
  ];
  
  const transactionData = [
    { 
      date: 'Apr 15, 2025', 
      description: 'Grocery Shopping', 
      category: 'Food', 
      amount: '-$85.33',
      account: 'Main Checking'
    },
    { 
      date: 'Apr 13, 2025', 
      description: 'Netflix Subscription', 
      category: 'Entertainment', 
      amount: '-$14.99',
      account: 'Credit Card'
    },
    { 
      date: 'Apr 10, 2025', 
      description: 'Salary Deposit', 
      category: 'Income', 
      amount: '+$3,500.00',
      account: 'Main Checking'
    },
    { 
      date: 'Apr 08, 2025', 
      description: 'Electricity Bill', 
      category: 'Utilities', 
      amount: '-$78.25',
      account: 'Main Checking'
    },
    { 
      date: 'Apr 05, 2025', 
      description: 'Restaurant', 
      category: 'Food', 
      amount: '-$65.40',
      account: 'Credit Card'
    },
    { 
      date: 'Apr 03, 2025', 
      description: 'Gas Station', 
      category: 'Transportation', 
      amount: '-$45.75',
      account: 'Credit Card'
    },
    { 
      date: 'Apr 01, 2025', 
      description: 'Monthly Transfer to Savings', 
      category: 'Transfer', 
      amount: '-$500.00',
      account: 'Main Checking'
    }
  ];
  
  return (
    <Layout>
      <PageContainer 
        title="Recent Transactions" 
        subtitle="View your latest financial activities"
        icon={<FaRegNoteSticky size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Income" 
            value="$3,500.00" 
            icon={<FaArrowUp size={16} />} 
            trend="up" 
            trendValue="5.2%"
          />
          <StatCard 
            title="Total Expenses" 
            value="$789.72" 
            icon={<FaArrowDown size={16} />} 
            trend="down" 
            trendValue="2.8%"
          />
          <StatCard 
            title="Net Cash Flow" 
            value="$2,710.28" 
            icon={<FaWallet size={16} />} 
            trend="up" 
            trendValue="8.1%"
          />
          <StatCard 
            title="Transactions" 
            value="7" 
            icon={<FaRegNoteSticky size={16} />} 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard 
            title="Income vs. Expenses"
            subtitle="Last 30 days"
          />
          <ChartCard 
            title="Transaction Categories"
            subtitle="Distribution by type"
          />
        </div>
        
        <div className="mb-8">
          <div className="bg-[#131313] rounded-2xl border border-[#222]/40 p-5 mb-6 flex flex-wrap gap-4 items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Transaction Quick Filter</h3>
              <p className="text-gray-400 text-sm mt-1">Filter your recent transactions</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 bg-[#50E3C2]/10 text-[#50E3C2] rounded-lg text-sm">All</button>
              <button className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#222] text-gray-300 rounded-lg text-sm">Income</button>
              <button className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#222] text-gray-300 rounded-lg text-sm">Expenses</button>
              <button className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#222] text-gray-300 rounded-lg text-sm">Transfers</button>
            </div>
          </div>
        
          <DataTable
            title="Recent Transactions"
            subtitle="Your last 7 transactions"
            columns={transactionColumns}
            data={transactionData}
            showActionButtons={false}
          />
        </div>
        
        <div className="text-center">
          <button className="px-4 py-2 bg-[#1a1a1a] text-[#50E3C2] rounded-xl hover:bg-[#222] transition-colors text-sm font-medium">
            View All Transactions
          </button>
        </div>
      </PageContainer>
    </Layout>
  );
} 