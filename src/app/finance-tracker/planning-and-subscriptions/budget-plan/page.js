'use client';

import React from 'react';
import { FaRegNoteSticky, FaChartPie, FaPlus, FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';

export default function BudgetPlanPage() {
  // Mock data for budget categories
  const budgetColumns = [
    { header: 'Category', accessor: 'category' },
    { header: 'Budgeted', accessor: 'budgeted' },
    { header: 'Spent', accessor: 'spent' },
    { header: 'Remaining', accessor: 'remaining' },
    { header: 'Progress', accessor: 'progress' }
  ];
  
  const budgetData = [
    { 
      category: 'Housing', 
      budgeted: '$1,200.00', 
      spent: '$1,200.00', 
      remaining: '$0.00',
      progress: (
        <div className="w-full bg-[#222] rounded-full h-2.5">
          <div className="bg-[#50E3C2] h-2.5 rounded-full" style={{ width: '100%' }}></div>
        </div>
      )
    },
    { 
      category: 'Food & Dining', 
      budgeted: '$500.00', 
      spent: '$385.33', 
      remaining: '$114.67',
      progress: (
        <div className="w-full bg-[#222] rounded-full h-2.5">
          <div className="bg-[#50E3C2] h-2.5 rounded-full" style={{ width: '77%' }}></div>
        </div>
      )
    },
    { 
      category: 'Transportation', 
      budgeted: '$250.00', 
      spent: '$145.75', 
      remaining: '$104.25',
      progress: (
        <div className="w-full bg-[#222] rounded-full h-2.5">
          <div className="bg-[#50E3C2] h-2.5 rounded-full" style={{ width: '58%' }}></div>
        </div>
      )
    },
    { 
      category: 'Entertainment', 
      budgeted: '$150.00', 
      spent: '$124.99', 
      remaining: '$25.01',
      progress: (
        <div className="w-full bg-[#222] rounded-full h-2.5">
          <div className="bg-[#50E3C2] h-2.5 rounded-full" style={{ width: '83%' }}></div>
        </div>
      )
    },
    { 
      category: 'Utilities', 
      budgeted: '$350.00', 
      spent: '$164.24', 
      remaining: '$185.76',
      progress: (
        <div className="w-full bg-[#222] rounded-full h-2.5">
          <div className="bg-[#50E3C2] h-2.5 rounded-full" style={{ width: '47%' }}></div>
        </div>
      )
    },
    { 
      category: 'Shopping', 
      budgeted: '$300.00', 
      spent: '$325.30', 
      remaining: '-$25.30',
      progress: (
        <div className="w-full bg-[#222] rounded-full h-2.5">
          <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '108%' }}></div>
        </div>
      )
    },
    { 
      category: 'Healthcare', 
      budgeted: '$200.00', 
      spent: '$45.00', 
      remaining: '$155.00',
      progress: (
        <div className="w-full bg-[#222] rounded-full h-2.5">
          <div className="bg-[#50E3C2] h-2.5 rounded-full" style={{ width: '23%' }}></div>
        </div>
      )
    },
    { 
      category: 'Savings', 
      budgeted: '$500.00', 
      spent: '$500.00', 
      remaining: '$0.00',
      progress: (
        <div className="w-full bg-[#222] rounded-full h-2.5">
          <div className="bg-[#50E3C2] h-2.5 rounded-full" style={{ width: '100%' }}></div>
        </div>
      )
    }
  ];
  
  // Mock data for budget summary
  const totalBudgeted = '$3,450.00';
  const totalSpent = '$2,890.61';
  const totalRemaining = '$559.39';
  const percentageSpent = '84%';
  
  return (
    <Layout>
      <PageContainer 
        title="Budget Plan" 
        subtitle="Plan and track your monthly budget"
        icon={<FaRegNoteSticky size={20} />}
      >
        <div className="flex justify-end mb-6">
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] rounded-xl text-black font-medium text-sm">
            <FaPlus size={14} className="mr-2" />
            <span>New Budget Category</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#131313] rounded-2xl p-6 border border-[#222]/40">
            <h3 className="text-gray-400 text-sm mb-2">Total Budgeted</h3>
            <p className="text-2xl font-bold text-white">{totalBudgeted}</p>
            <div className="flex items-center mt-2 text-xs text-[#50E3C2]">
              <FaArrowUp size={10} className="mr-1" />
              <span>5% vs last month</span>
            </div>
          </div>
          
          <div className="bg-[#131313] rounded-2xl p-6 border border-[#222]/40">
            <h3 className="text-gray-400 text-sm mb-2">Total Spent</h3>
            <p className="text-2xl font-bold text-white">{totalSpent}</p>
            <div className="flex items-center mt-2 text-xs text-red-500">
              <FaArrowUp size={10} className="mr-1" />
              <span>8% vs last month</span>
            </div>
          </div>
          
          <div className="bg-[#131313] rounded-2xl p-6 border border-[#222]/40">
            <h3 className="text-gray-400 text-sm mb-2">Remaining</h3>
            <p className="text-2xl font-bold text-white">{totalRemaining}</p>
            <div className="flex items-center mt-2 text-xs text-red-500">
              <FaArrowDown size={10} className="mr-1" />
              <span>12% vs last month</span>
            </div>
          </div>
          
          <div className="bg-[#131313] rounded-2xl p-6 border border-[#222]/40">
            <h3 className="text-gray-400 text-sm mb-2">% of Budget Used</h3>
            <p className="text-2xl font-bold text-white">{percentageSpent}</p>
            <div className="w-full bg-[#222] rounded-full h-2.5 mt-3">
              <div className="bg-[#50E3C2] h-2.5 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Monthly Budget Overview"
              subtitle="Budgeted vs. Actual Spending"
              height="h-80"
            />
          </div>
          <div>
            <ChartCard 
              title="Budget Distribution"
              subtitle="By Category"
              height="h-80"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Budget Categories"
            subtitle="Track spending by category"
            columns={budgetColumns}
            data={budgetData}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard 
            title="Budget Trends"
            subtitle="6-month historical view"
          />
          <ChartCard 
            title="Spending Analysis"
            subtitle="Areas for potential savings"
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 