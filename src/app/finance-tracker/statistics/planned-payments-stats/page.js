'use client';

import React from 'react';
import { FaCalendar, FaWallet, FaRegNoteSticky, FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import StatCard from '@/components/dashboard/StatCard';
import DataTable from '@/components/dashboard/DataTable';

export default function PlannedPaymentsStatsPage() {
  // Mock data for planned payments
  const paymentColumns = [
    { header: 'Payment', accessor: 'payment' },
    { header: 'Category', accessor: 'category' },
    { header: 'Frequency', accessor: 'frequency' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Annual Cost', accessor: 'annualCost' },
    { 
      header: 'Trend', 
      accessor: 'trend',
      cell: (row) => (
        <div className={`flex items-center ${row.trendType === 'up' ? 'text-red-500' : row.trendType === 'down' ? 'text-green-500' : 'text-gray-400'}`}>
          {row.trendType === 'up' ? <FaArrowUp size={12} className="mr-1" /> : 
           row.trendType === 'down' ? <FaArrowDown size={12} className="mr-1" /> : 
           <span className="w-3 h-0.5 bg-gray-400 mr-1"></span>}
          {row.trend}
        </div>
      )
    }
  ];
  
  const paymentData = [
    { 
      payment: 'Mortgage', 
      category: 'Housing', 
      frequency: 'Monthly', 
      amount: '$1,200.00',
      annualCost: '$14,400.00',
      trend: '0%',
      trendType: 'neutral'
    },
    { 
      payment: 'Car Loan', 
      category: 'Transportation', 
      frequency: 'Monthly', 
      amount: '$350.00',
      annualCost: '$4,200.00',
      trend: '0%',
      trendType: 'neutral'
    },
    { 
      payment: 'Health Insurance', 
      category: 'Insurance', 
      frequency: 'Monthly', 
      amount: '$175.00',
      annualCost: '$2,100.00',
      trend: '+5.2%',
      trendType: 'up'
    },
    { 
      payment: 'Property Tax', 
      category: 'Taxes', 
      frequency: 'Semi-Annual', 
      amount: '$850.00',
      annualCost: '$1,700.00',
      trend: '+3.1%',
      trendType: 'up'
    },
    { 
      payment: 'Internet Service', 
      category: 'Utilities', 
      frequency: 'Monthly', 
      amount: '$65.00',
      annualCost: '$780.00',
      trend: '-5.8%',
      trendType: 'down'
    },
    { 
      payment: 'Cell Phone Plan', 
      category: 'Utilities', 
      frequency: 'Monthly', 
      amount: '$85.00',
      annualCost: '$1,020.00',
      trend: '0%',
      trendType: 'neutral'
    },
    { 
      payment: 'Gym Membership', 
      category: 'Health', 
      frequency: 'Monthly', 
      amount: '$45.00',
      annualCost: '$540.00',
      trend: '+11.1%',
      trendType: 'up'
    }
  ];

  // Calculate totals and stats
  const monthlyTotal = paymentData.reduce((sum, item) => {
    // Only include monthly payments
    if (item.frequency === 'Monthly') {
      return sum + parseFloat(item.amount.replace(/[^0-9.-]+/g, ""));
    }
    return sum;
  }, 0);
  
  const annualTotal = paymentData.reduce((sum, item) => {
    return sum + parseFloat(item.annualCost.replace(/[^0-9.-]+/g, ""));
  }, 0);
  
  const categoryCounts = paymentData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
  
  const largestCategory = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])[0][0];
  
  return (
    <Layout>
      <PageContainer 
        title="Planned Payments Statistics" 
        subtitle="Analysis of your recurring payments and bills"
        icon={<FaCalendar size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Monthly Payments" 
            value={`$${monthlyTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            icon={<FaCalendar size={16} />} 
          />
          <StatCard 
            title="Annual Cost" 
            value={`$${annualTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            icon={<FaWallet size={16} />} 
            trend="up" 
            trendValue="4.2%"
          />
          <StatCard 
            title="Total Payments" 
            value={paymentData.length} 
            icon={<FaRegNoteSticky size={16} />} 
          />
          <StatCard 
            title="Largest Category" 
            value={largestCategory} 
            icon={<FaChartLine size={16} />} 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Monthly Payment Trend"
              subtitle="Last 12 months"
              height="h-80"
            />
          </div>
          <div>
            <ChartCard 
              title="Payment Categories"
              subtitle="Distribution by category"
              height="h-80"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Planned Payments Analytics"
            subtitle="Performance and trend analysis of your recurring payments"
            columns={paymentColumns}
            data={paymentData.map(item => ({
              ...item,
              trend: (
                <div className={`flex items-center ${item.trendType === 'up' ? 'text-red-500' : item.trendType === 'down' ? 'text-green-500' : 'text-gray-400'}`}>
                  {item.trendType === 'up' ? <FaArrowUp size={12} className="mr-1" /> : 
                  item.trendType === 'down' ? <FaArrowDown size={12} className="mr-1" /> : 
                  <span className="w-3 h-0.5 bg-gray-400 mr-1"></span>}
                  {item.trend}
                </div>
              )
            }))}
            showActionButtons={false}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#131313] p-6 rounded-2xl border border-[#222]/40">
            <h3 className="text-white font-medium mb-4">Payment Schedule</h3>
            <div className="text-sm text-gray-400">
              <p className="mb-6">Distribution of your planned payments throughout the month</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Beginning of Month (1st-10th)</span>
                    <span className="text-[#50E3C2]">3 payments</span>
                  </div>
                  <div className="w-full bg-[#222] rounded-full h-2">
                    <div className="bg-[#50E3C2] h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Mid-Month (11th-20th)</span>
                    <span className="text-[#50E3C2]">2 payments</span>
                  </div>
                  <div className="w-full bg-[#222] rounded-full h-2">
                    <div className="bg-[#50E3C2] h-2 rounded-full" style={{ width: '34%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>End of Month (21st-31st)</span>
                    <span className="text-[#50E3C2]">1 payment</span>
                  </div>
                  <div className="w-full bg-[#222] rounded-full h-2">
                    <div className="bg-[#50E3C2] h-2 rounded-full" style={{ width: '16%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#131313] p-6 rounded-2xl border border-[#222]/40">
            <h3 className="text-white font-medium mb-4">Cost Optimization</h3>
            <div className="text-sm text-gray-400 mb-4">
              <p>Potential savings opportunities in your planned payments</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center mr-3">
                    <FaArrowDown size={14} className="text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">Internet Service</h4>
                    <p className="text-xs text-gray-400 mt-1">Competitor offers same speed for $10 less per month</p>
                    <p className="text-xs text-green-500 mt-1">Potential annual savings: $120</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center mr-3">
                    <FaArrowDown size={14} className="text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">Cell Phone Plan</h4>
                    <p className="text-xs text-gray-400 mt-1">Unused data could qualify you for a cheaper plan</p>
                    <p className="text-xs text-green-500 mt-1">Potential annual savings: $180</p>
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