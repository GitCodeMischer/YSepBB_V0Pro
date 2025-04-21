'use client';

import React, { useState } from 'react';
import { FaRegNoteSticky, FaArrowDown, FaArrowUp, FaFilter, FaUtensils, FaHouse, FaCarSide, FaFilm, FaLightbulb, FaCartShopping, FaHeart, FaGraduationCap, FaCalendarDays } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import StatCard from '@/components/dashboard/StatCard';

export default function AllTransactionsPage() {
  const [filter, setFilter] = useState('all'); // all, income, expense
  
  // Mock data for transactions
  const transactionColumns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Description', accessor: 'description' },
    { header: 'Category', accessor: 'category' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Account', accessor: 'account' }
  ];
  
  const allTransactions = [
    { 
      date: 'Mar 01, 2024', 
      description: 'Salary Deposit', 
      category: (
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center mr-2">
            <FaArrowDown className="text-green-500 rotate-180" size={10} />
          </div>
          <span>Income</span>
        </div>
      ),
      amount: <span className="text-green-500">+$3,800.00</span>,
      account: 'Main Checking'
    },
    { 
      date: 'Mar 01, 2024', 
      description: 'Rent Payment', 
      category: (
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-[#F97316]/10 flex items-center justify-center mr-2">
            <FaHouse className="text-[#F97316]" size={10} />
          </div>
          <span>Housing</span>
        </div>
      ),
      amount: <span className="text-red-500">-$1,200.00</span>,
      account: 'Main Checking'
    },
    { 
      date: 'Mar 02, 2024', 
      description: 'Grocery Store', 
      category: (
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mr-2">
            <FaUtensils className="text-[#3B82F6]" size={10} />
          </div>
          <span>Food</span>
        </div>
      ),
      amount: <span className="text-red-500">-$85.74</span>,
      account: 'Joint Account'
    },
    { 
      date: 'Mar 03, 2024', 
      description: 'Gas Station', 
      category: (
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-[#10B981]/10 flex items-center justify-center mr-2">
            <FaCarSide className="text-[#10B981]" size={10} />
          </div>
          <span>Transportation</span>
        </div>
      ),
      amount: <span className="text-red-500">-$45.33</span>,
      account: 'Credit Card'
    },
    { 
      date: 'Mar 04, 2024', 
      description: 'Movie Tickets', 
      category: (
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mr-2">
            <FaFilm className="text-[#8B5CF6]" size={10} />
          </div>
          <span>Entertainment</span>
        </div>
      ),
      amount: <span className="text-red-500">-$24.99</span>,
      account: 'Credit Card'
    },
    { 
      date: 'Mar 05, 2024', 
      description: 'Electric Bill', 
      category: (
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-[#EC4899]/10 flex items-center justify-center mr-2">
            <FaLightbulb className="text-[#EC4899]" size={10} />
          </div>
          <span>Utilities</span>
        </div>
      ),
      amount: <span className="text-red-500">-$78.25</span>,
      account: 'Main Checking'
    },
    { 
      date: 'Mar 05, 2024', 
      description: 'Clothing Store', 
      category: (
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center mr-2">
            <FaCartShopping className="text-[#0EA5E9]" size={10} />
          </div>
          <span>Shopping</span>
        </div>
      ),
      amount: <span className="text-red-500">-$67.85</span>,
      account: 'Credit Card'
    },
    { 
      date: 'Mar 06, 2024', 
      description: 'Pharmacy', 
      category: (
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-[#F43F5E]/10 flex items-center justify-center mr-2">
            <FaHeart className="text-[#F43F5E]" size={10} />
          </div>
          <span>Health</span>
        </div>
      ),
      amount: <span className="text-red-500">-$32.50</span>,
      account: 'Health Savings'
    },
    { 
      date: 'Mar 07, 2024', 
      description: 'Online Course', 
      category: (
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-[#14B8A6]/10 flex items-center justify-center mr-2">
            <FaGraduationCap className="text-[#14B8A6]" size={10} />
          </div>
          <span>Education</span>
        </div>
      ),
      amount: <span className="text-red-500">-$75.00</span>,
      account: 'Main Checking'
    },
    { 
      date: 'Mar 10, 2024', 
      description: 'Freelance Payment', 
      category: (
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center mr-2">
            <FaArrowDown className="text-green-500 rotate-180" size={10} />
          </div>
          <span>Income</span>
        </div>
      ),
      amount: <span className="text-green-500">+$350.00</span>,
      account: 'Main Checking'
    },
    { 
      date: 'Mar 12, 2024', 
      description: 'Investment Dividend', 
      category: (
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center mr-2">
            <FaArrowDown className="text-green-500 rotate-180" size={10} />
          </div>
          <span>Income</span>
        </div>
      ),
      amount: <span className="text-green-500">+$125.32</span>,
      account: 'Investment Account'
    }
  ];
  
  // Filter transactions based on selected filter
  const filteredTransactions = allTransactions.filter(transaction => {
    if (filter === 'all') return true;
    const amount = transaction.amount.props.children;
    return filter === 'income' ? amount.startsWith('+') : amount.startsWith('-');
  });
  
  // Calculate totals
  const totalIncome = allTransactions
    .filter(t => t.amount.props.children.startsWith('+'))
    .reduce((sum, t) => {
      const amount = parseFloat(t.amount.props.children.slice(1).replace(/[$,]/g, ''));
      return sum + amount;
    }, 0);
    
  const totalExpenses = allTransactions
    .filter(t => t.amount.props.children.startsWith('-'))
    .reduce((sum, t) => {
      const amount = parseFloat(t.amount.props.children.slice(1).replace(/[$,]/g, ''));
      return sum + amount;
    }, 0);
    
  const netCashFlow = totalIncome - totalExpenses;
  
  return (
    <Layout>
      <PageContainer 
        title="All Transactions" 
        subtitle="View and manage all your financial transactions"
        icon={<FaRegNoteSticky size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Income"
            value={`$${totalIncome.toLocaleString()}`}
            icon={<FaArrowUp size={16} />}
            trend="up"
            trendValue="5.2%"
          />
          <StatCard
            title="Total Expenses"
            value={`$${totalExpenses.toLocaleString()}`}
            icon={<FaArrowDown size={16} />}
            trend="down"
            trendValue="2.8%"
          />
          <StatCard
            title="Net Cash Flow"
            value={`$${netCashFlow.toLocaleString()}`}
            icon={<FaRegNoteSticky size={16} />}
            trend={netCashFlow > 0 ? "up" : "down"}
            trendValue="8.1%"
          />
          <StatCard
            title="Transactions"
            value={allTransactions.length}
            icon={<FaCalendarDays size={16} />}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard 
            title="Income vs. Expenses"
            subtitle="Monthly comparison"
            height="h-80"
          />
          <ChartCard 
            title="Transaction Categories"
            subtitle="Breakdown by type"
            height="h-80"
          />
        </div>
        
        <div className="mb-4 bg-[#131313] rounded-2xl border border-[#222]/40 p-4 flex items-center justify-between">
          <h3 className="text-white font-medium">Transaction Filters</h3>
          <div className="flex space-x-3">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl flex items-center text-sm
                ${filter === 'all' 
                  ? 'bg-[#50E3C2]/10 text-[#50E3C2]' 
                  : 'bg-[#222]/60 text-gray-300 hover:bg-[#222]/80'
                }`}
            >
              <FaFilter size={12} className="mr-2" /> All
            </button>
            <button 
              onClick={() => setFilter('income')}
              className={`px-4 py-2 rounded-xl flex items-center text-sm
                ${filter === 'income' 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-[#222]/60 text-gray-300 hover:bg-[#222]/80'
                }`}
            >
              <FaArrowUp size={12} className="mr-2" /> Income
            </button>
            <button 
              onClick={() => setFilter('expense')}
              className={`px-4 py-2 rounded-xl flex items-center text-sm
                ${filter === 'expense' 
                  ? 'bg-red-500/10 text-red-500' 
                  : 'bg-[#222]/60 text-gray-300 hover:bg-[#222]/80'
                }`}
            >
              <FaArrowDown size={12} className="mr-2" /> Expenses
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Transaction History"
            subtitle={`Showing ${filteredTransactions.length} ${filter !== 'all' ? filter : ''} transactions`}
            columns={transactionColumns}
            data={filteredTransactions}
            showActionButtons={true}
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 