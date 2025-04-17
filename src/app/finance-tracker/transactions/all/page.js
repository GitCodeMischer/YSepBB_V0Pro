'use client';

import React, { useState } from 'react';
import { FaRegNoteSticky, FaFilter, FaDownload, FaPlus } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';

export default function AllTransactionsPage() {
  const [filterVisible, setFilterVisible] = useState(false);
  
  // Mock data for transactions
  const transactionColumns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Description', accessor: 'description' },
    { header: 'Category', accessor: 'category' },
    { header: 'Account', accessor: 'account' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Status', accessor: 'status' }
  ];
  
  const transactionData = [
    { 
      date: 'Apr 15, 2025', 
      description: 'Grocery Shopping', 
      category: 'Food', 
      account: 'Main Checking', 
      amount: '-$85.33',
      status: 'Completed'
    },
    { 
      date: 'Apr 13, 2025', 
      description: 'Netflix Subscription', 
      category: 'Entertainment', 
      account: 'Credit Card', 
      amount: '-$14.99',
      status: 'Completed'
    },
    { 
      date: 'Apr 10, 2025', 
      description: 'Salary Deposit', 
      category: 'Income', 
      account: 'Main Checking', 
      amount: '+$3,500.00',
      status: 'Completed'
    },
    { 
      date: 'Apr 08, 2025', 
      description: 'Electricity Bill', 
      category: 'Utilities', 
      account: 'Main Checking', 
      amount: '-$78.25',
      status: 'Completed'
    },
    { 
      date: 'Apr 05, 2025', 
      description: 'Restaurant', 
      category: 'Food', 
      account: 'Credit Card', 
      amount: '-$65.40',
      status: 'Completed'
    },
    { 
      date: 'Apr 03, 2025', 
      description: 'Gas Station', 
      category: 'Transportation', 
      account: 'Credit Card', 
      amount: '-$45.75',
      status: 'Completed'
    },
    { 
      date: 'Apr 01, 2025', 
      description: 'Monthly Transfer to Savings', 
      category: 'Transfer', 
      account: 'Main Checking', 
      amount: '-$500.00',
      status: 'Completed'
    },
    { 
      date: 'Apr 01, 2025', 
      description: 'Monthly Transfer from Checking', 
      category: 'Transfer', 
      account: 'Savings Account', 
      amount: '+$500.00',
      status: 'Completed'
    },
    { 
      date: 'Mar 29, 2025', 
      description: 'Phone Bill', 
      category: 'Utilities', 
      account: 'Main Checking', 
      amount: '-$85.99',
      status: 'Completed'
    },
    { 
      date: 'Mar 25, 2025', 
      description: 'Online Shopping', 
      category: 'Shopping', 
      account: 'Credit Card', 
      amount: '-$125.30',
      status: 'Completed'
    }
  ];
  
  return (
    <Layout>
      <PageContainer 
        title="All Transactions" 
        subtitle="Comprehensive view of your financial activity"
        icon={<FaRegNoteSticky size={20} />}
      >
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex space-x-2">
            <button 
              className="flex items-center px-4 py-2 bg-[#131313] rounded-xl hover:bg-[#1a1a1a] transition-colors text-white"
              onClick={() => setFilterVisible(!filterVisible)}
            >
              <FaFilter size={14} className="mr-2 text-[#50E3C2]" />
              <span>Filter</span>
            </button>
            
            <button className="flex items-center px-4 py-2 bg-[#131313] rounded-xl hover:bg-[#1a1a1a] transition-colors text-white">
              <FaDownload size={14} className="mr-2 text-[#50E3C2]" />
              <span>Export</span>
            </button>
          </div>
          
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] rounded-xl text-black font-medium text-sm">
            <FaPlus size={14} className="mr-2" />
            <span>Add Transaction</span>
          </button>
        </div>
        
        {filterVisible && (
          <div className="bg-[#131313] p-6 rounded-2xl mb-6 border border-[#222]/40">
            <h3 className="text-white mb-4 font-medium">Filter Transactions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Date Range</label>
                <select className="w-full bg-[#1a1a1a] text-white rounded-xl border border-[#333] px-4 py-2.5">
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                  <option>Custom range</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Category</label>
                <select className="w-full bg-[#1a1a1a] text-white rounded-xl border border-[#333] px-4 py-2.5">
                  <option>All Categories</option>
                  <option>Food</option>
                  <option>Entertainment</option>
                  <option>Utilities</option>
                  <option>Transportation</option>
                  <option>Shopping</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Account</label>
                <select className="w-full bg-[#1a1a1a] text-white rounded-xl border border-[#333] px-4 py-2.5">
                  <option>All Accounts</option>
                  <option>Main Checking</option>
                  <option>Savings Account</option>
                  <option>Credit Card</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                Reset
              </button>
              <button className="px-4 py-2 bg-[#50E3C2] text-black rounded-xl font-medium">
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard 
            title="Transaction Volume"
            subtitle="Number of transactions by day"
          />
          <ChartCard 
            title="Cash Flow"
            subtitle="Income vs. Expenses"
          />
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Transaction History"
            subtitle="Your complete transaction history"
            columns={transactionColumns}
            data={transactionData}
          />
        </div>
        
        <div className="flex justify-center">
          <div className="inline-flex rounded-xl overflow-hidden">
            <button className="px-4 py-2 bg-[#131313] text-gray-400 hover:bg-[#1a1a1a] hover:text-white transition-colors border-r border-[#222]">Previous</button>
            <button className="px-4 py-2 bg-[#50E3C2]/20 text-[#50E3C2] font-medium">1</button>
            <button className="px-4 py-2 bg-[#131313] text-gray-400 hover:bg-[#1a1a1a] hover:text-white transition-colors">2</button>
            <button className="px-4 py-2 bg-[#131313] text-gray-400 hover:bg-[#1a1a1a] hover:text-white transition-colors">3</button>
            <button className="px-4 py-2 bg-[#131313] text-gray-400 hover:bg-[#1a1a1a] hover:text-white transition-colors border-l border-[#222]">Next</button>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
} 