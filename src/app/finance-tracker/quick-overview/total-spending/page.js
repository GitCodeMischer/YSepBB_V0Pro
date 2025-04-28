'use client';

import React from 'react';
import { FaChartBar, FaCalendarAlt, FaArrowDown, FaArrowUp, FaShoppingBag, FaMoneyBillWave } from 'react-icons/fa';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import StatCard from '@/components/dashboard/StatCard';

export default function TotalSpendingPage() {
  // Mock data for monthly spending
  const spendingColumns = [
    { header: 'Period', accessor: 'period' },
    { header: 'Total Spending', accessor: 'totalSpending' },
    { header: 'Income', accessor: 'income' },
    { header: 'Savings', accessor: 'savings' },
    { header: 'Savings Rate', accessor: 'savingsRate' }
  ];
  
  const spendingData = [
    { 
      period: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mr-3">
            <FaCalendarAlt className="text-[#3B82F6]" />
          </div>
          <span>February 2024</span>
        </div>
      ), 
      totalSpending: '$2,220.31', 
      income: '$4,500.00',
      savings: '$2,279.69',
      savingsRate: '50.7%'
    },
    { 
      period: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mr-3">
            <FaCalendarAlt className="text-[#3B82F6]" />
          </div>
          <span>January 2024</span>
        </div>
      ), 
      totalSpending: '$2,344.55', 
      income: '$4,500.00',
      savings: '$2,155.45',
      savingsRate: '47.9%'
    },
    { 
      period: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mr-3">
            <FaCalendarAlt className="text-[#3B82F6]" />
          </div>
          <span>December 2023</span>
        </div>
      ), 
      totalSpending: '$2,755.98', 
      income: '$4,500.00',
      savings: '$1,744.02',
      savingsRate: '38.8%'
    },
    { 
      period: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mr-3">
            <FaCalendarAlt className="text-[#3B82F6]" />
          </div>
          <span>November 2023</span>
        </div>
      ), 
      totalSpending: '$2,321.44', 
      income: '$4,500.00',
      savings: '$2,178.56',
      savingsRate: '48.4%'
    },
    { 
      period: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mr-3">
            <FaCalendarAlt className="text-[#3B82F6]" />
          </div>
          <span>October 2023</span>
        </div>
      ), 
      totalSpending: '$2,404.87', 
      income: '$4,350.00',
      savings: '$1,945.13',
      savingsRate: '44.7%'
    }
  ];
  
  // Mock last 30 days spending statistics
  const last30DaysSpending = 2220.31;
  const previousPeriodSpending = 2344.55;
  const spendingChange = (last30DaysSpending - previousPeriodSpending) / previousPeriodSpending * 100;
  
  return (
    <Layout>
      <PageContainer 
        title="Total Spending" 
        subtitle="Track your overall spending and trends"
        icon={<FaChartBar size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Last 30 Days"
            value={`$${last30DaysSpending.toLocaleString()}`}
            icon={<FaMoneyBillWave size={16} />}
            trend={spendingChange < 0 ? "down" : "up"}
            trendValue={`${Math.abs(spendingChange).toFixed(1)}%`}
          />
          <StatCard
            title="Monthly Average"
            value="$2,409.43"
            icon={<FaChartBar size={16} />}
            trend="down"
            trendValue="3.1%"
          />
          <StatCard
            title="Annual Projection"
            value="$28,913.16"
            icon={<FaChartBar size={16} />}
            trend="down"
            trendValue="2.4%"
          />
          <StatCard
            title="Savings Rate"
            value="47.1%"
            icon={<FaShoppingBag size={16} />}
            trend="up"
            trendValue="2.8%"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Monthly Spending Trend"
              subtitle="Last 12 months"
              height="h-96"
            />
          </div>
          
          <div className="bg-[#131313] rounded-2xl border border-[#222]/40 p-6 flex flex-col">
            <h3 className="text-white font-medium mb-2">Monthly Budget Overview</h3>
            <p className="text-gray-400 text-sm mb-6">Current month spending vs budget</p>
            
            <div className="flex-grow flex flex-col justify-center space-y-6 mb-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Total Spending</span>
                  <span className="text-sm font-medium text-white">$2,220 / $2,800</span>
                </div>
                <div className="w-full bg-[#222] rounded-full h-2.5">
                  <div className="bg-[#3B82F6] h-2.5 rounded-full" style={{width: '79%'}}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">79% of monthly budget</span>
                  <span className="text-xs text-green-500">$580 remaining</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Income Received</span>
                  <span className="text-sm font-medium text-white">$4,500 / $4,500</span>
                </div>
                <div className="w-full bg-[#222] rounded-full h-2.5">
                  <div className="bg-[#10B981] h-2.5 rounded-full" style={{width: '100%'}}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">100% of expected income</span>
                  <span className="text-xs text-green-500">Complete</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Savings Progress</span>
                  <span className="text-sm font-medium text-white">$2,280 / $2,000</span>
                </div>
                <div className="w-full bg-[#222] rounded-full h-2.5">
                  <div className="bg-[#8B5CF6] h-2.5 rounded-full" style={{width: '100%'}}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">114% of savings goal</span>
                  <span className="text-xs text-green-500">Exceeding goal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Monthly Spending History"
            subtitle="Track your spending and savings over time"
            columns={spendingColumns}
            data={spendingData}
            showActionButtons={false}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard 
            title="Spending vs. Income"
            subtitle="Last 12 months comparison"
          />
          <ChartCard 
            title="Spending Forecast"
            subtitle="Projected spending for next 3 months"
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 