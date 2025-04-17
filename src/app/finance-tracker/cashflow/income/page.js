'use client';

import React from 'react';
import { FaArrowUp, FaChartLine, FaRegNoteSticky, FaCalendarAlt, FaBuilding, FaMoneyBillWave, FaBriefcase, FaChartBar, FaHandHoldingUsd } from 'react-icons/fa';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import StatCard from '@/components/dashboard/StatCard';

export default function IncomePage() {
  // Mock data for income sources
  const incomeColumns = [
    { header: 'Source', accessor: 'source' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Frequency', accessor: 'frequency' },
    { header: 'Date', accessor: 'date' },
    { header: 'Category', accessor: 'category' }
  ];
  
  const incomeData = [
    { 
      source: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mr-3">
            <FaBriefcase className="text-[#3B82F6]" />
          </div>
          <span>Salary</span>
        </div>
      ), 
      amount: '$3,800.00', 
      frequency: 'Monthly',
      date: 'Feb 28, 2024',
      category: 'Employment'
    },
    { 
      source: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center mr-3">
            <FaBuilding className="text-[#10B981]" />
          </div>
          <span>Apartment Rental</span>
        </div>
      ), 
      amount: '$650.00', 
      frequency: 'Monthly',
      date: 'Feb 05, 2024',
      category: 'Passive Income'
    },
    { 
      source: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center mr-3">
            <FaHandHoldingUsd className="text-[#F97316]" />
          </div>
          <span>Freelance Project</span>
        </div>
      ), 
      amount: '$350.00', 
      frequency: 'One-time',
      date: 'Feb 15, 2024',
      category: 'Side Hustle'
    },
    { 
      source: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mr-3">
            <FaMoneyBillWave className="text-[#8B5CF6]" />
          </div>
          <span>Dividend Payment</span>
        </div>
      ), 
      amount: '$125.32', 
      frequency: 'Quarterly',
      date: 'Feb 10, 2024',
      category: 'Investments'
    },
    { 
      source: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#EC4899]/10 flex items-center justify-center mr-3">
            <FaChartLine className="text-[#EC4899]" />
          </div>
          <span>Stock Sale</span>
        </div>
      ), 
      amount: '$570.89', 
      frequency: 'One-time',
      date: 'Feb 22, 2024',
      category: 'Investments'
    }
  ];
  
  // Calculate total income
  const totalIncome = incomeData.reduce((sum, item) => {
    const amount = parseFloat(item.amount.replace(/[$,]/g, ''));
    return sum + amount;
  }, 0);
  
  return (
    <Layout>
      <PageContainer 
        title="Income" 
        subtitle="Track and analyze all your income sources"
        icon={<FaArrowUp size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Monthly Income"
            value={`$${totalIncome.toLocaleString()}`}
            icon={<FaMoneyBillWave size={16} />}
            trend="up"
            trendValue="5.3%"
          />
          <StatCard
            title="Annual Projection"
            value="$62,000.00"
            icon={<FaChartBar size={16} />}
            trend="up"
            trendValue="7.8%"
          />
          <StatCard
            title="Income Sources"
            value="5"
            icon={<FaChartLine size={16} />}
            trend="up"
            trendValue="1"
          />
          <StatCard
            title="Main Source"
            value="76%"
            icon={<FaBriefcase size={16} />}
            trend="down"
            trendValue="2.1%"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Income Trend"
              subtitle="Last 12 months"
              height="h-96"
            />
          </div>
          
          <div className="bg-[#131313] rounded-2xl border border-[#222]/40 p-6 flex flex-col">
            <h3 className="text-white font-medium mb-2">Income Distribution</h3>
            <p className="text-gray-400 text-sm mb-6">By source category</p>
            
            <div className="flex-grow flex items-center justify-center">
              <div className="w-full max-w-[280px]">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#3B82F6] mr-2"></div>
                      <span className="text-sm text-gray-300">Employment</span>
                    </div>
                    <span className="text-sm font-medium text-white">76%</span>
                  </div>
                  <div className="w-full bg-[#222] rounded-full h-2">
                    <div className="bg-[#3B82F6] h-2 rounded-full" style={{width: '76%'}}></div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></div>
                      <span className="text-sm text-gray-300">Passive Income</span>
                    </div>
                    <span className="text-sm font-medium text-white">13%</span>
                  </div>
                  <div className="w-full bg-[#222] rounded-full h-2">
                    <div className="bg-[#10B981] h-2 rounded-full" style={{width: '13%'}}></div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#F97316] mr-2"></div>
                      <span className="text-sm text-gray-300">Side Hustle</span>
                    </div>
                    <span className="text-sm font-medium text-white">7%</span>
                  </div>
                  <div className="w-full bg-[#222] rounded-full h-2">
                    <div className="bg-[#F97316] h-2 rounded-full" style={{width: '7%'}}></div>
                  </div>
                </div>
                
                <div className="mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#8B5CF6] mr-2"></div>
                      <span className="text-sm text-gray-300">Investments</span>
                    </div>
                    <span className="text-sm font-medium text-white">4%</span>
                  </div>
                  <div className="w-full bg-[#222] rounded-full h-2">
                    <div className="bg-[#8B5CF6] h-2 rounded-full" style={{width: '4%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Income Sources"
            subtitle="Your recent income entries"
            columns={incomeColumns}
            data={incomeData}
            showActionButtons={true}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard 
            title="Income vs Expenses"
            subtitle="Monthly comparison"
          />
          <ChartCard 
            title="Income Growth"
            subtitle="Year over year analysis"
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 