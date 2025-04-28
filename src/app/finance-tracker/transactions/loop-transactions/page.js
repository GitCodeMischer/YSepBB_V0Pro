'use client';

import React from 'react';
import { FaShuffle, FaArrowsRotate, FaCalendarDays, FaClockRotateLeft, FaCreditCard, FaBolt, FaVideo, FaMusic, FaCloud, FaCartShopping, FaBookOpen, FaChartBar } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import StatCard from '@/components/dashboard/StatCard';

export default function LoopTransactionsPage() {
  // Mock data for loop transactions (subscriptions/recurring payments)
  const loopColumns = [
    { header: 'Service', accessor: 'service' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Frequency', accessor: 'frequency' },
    { header: 'Next Date', accessor: 'nextDate' },
    { header: 'Status', accessor: 'status' }
  ];
  
  const loopData = [
    { 
      service: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#F43F5E]/10 flex items-center justify-center mr-3">
            <FaVideo className="text-[#F43F5E]" />
          </div>
          <span>Netflix</span>
        </div>
      ), 
      amount: '$14.99', 
      frequency: 'Monthly',
      nextDate: 'Mar 15, 2024',
      status: <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">Active</span>
    },
    { 
      service: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center mr-3">
            <FaMusic className="text-[#10B981]" />
          </div>
          <span>Spotify</span>
        </div>
      ), 
      amount: '$9.99', 
      frequency: 'Monthly',
      nextDate: 'Mar 20, 2024',
      status: <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">Active</span>
    },
    { 
      service: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mr-3">
            <FaCloud className="text-[#3B82F6]" />
          </div>
          <span>iCloud Storage</span>
        </div>
      ), 
      amount: '$2.99', 
      frequency: 'Monthly',
      nextDate: 'Mar 05, 2024',
      status: <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">Active</span>
    },
    { 
      service: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mr-3">
            <FaCartShopping className="text-[#8B5CF6]" />
          </div>
          <span>Amazon Prime</span>
        </div>
      ), 
      amount: '$12.99', 
      frequency: 'Monthly',
      nextDate: 'Mar 12, 2024',
      status: <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">Active</span>
    },
    { 
      service: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#EC4899]/10 flex items-center justify-center mr-3">
            <FaBookOpen className="text-[#EC4899]" />
          </div>
          <span>Medium</span>
        </div>
      ), 
      amount: '$5.00', 
      frequency: 'Monthly',
      nextDate: 'Mar 18, 2024',
      status: <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-500">Trial</span>
    },
    { 
      service: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center mr-3">
            <FaBolt className="text-[#F97316]" />
          </div>
          <span>Electric Bill</span>
        </div>
      ), 
      amount: '$78.25', 
      frequency: 'Monthly',
      nextDate: 'Mar 25, 2024',
      status: <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500">Scheduled</span>
    },
    { 
      service: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center mr-3">
            <FaCreditCard className="text-[#0EA5E9]" />
          </div>
          <span>Credit Card Payment</span>
        </div>
      ), 
      amount: '$150.00', 
      frequency: 'Monthly',
      nextDate: 'Mar 10, 2024',
      status: <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500">Scheduled</span>
    }
  ];
  
  // Calculate totals
  const totalMonthly = loopData.reduce((sum, item) => {
    const amount = parseFloat(item.amount.replace(/[$,]/g, ''));
    return sum + amount;
  }, 0);
  
  const activeSubscriptions = loopData.filter(item => 
    item.status.props.children === 'Active' || 
    item.status.props.children === 'Trial'
  ).length;
  
  const upcomingPaymentsCount = loopData.filter(item => {
    const nextDate = new Date(item.nextDate);
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);
    return nextDate >= today && nextDate <= sevenDaysFromNow;
  }).length;
  
  return (
    <Layout>
      <PageContainer 
        title="Loop Transactions" 
        subtitle="Manage your recurring payments and subscriptions"
        icon={<FaShuffle size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Monthly Total"
            value={`$${totalMonthly.toFixed(2)}`}
            icon={<FaArrowsRotate size={16} />}
            trend="up"
            trendValue="3.2%"
          />
          <StatCard
            title="Active Subscriptions"
            value={activeSubscriptions}
            icon={<FaBolt size={16} />}
            trend="up"
            trendValue="1"
          />
          <StatCard
            title="Due Next 7 Days"
            value={upcomingPaymentsCount}
            icon={<FaCalendarDays size={16} />}
          />
          <StatCard
            title="Annual Cost"
            value={`$${(totalMonthly * 12).toFixed(2)}`}
            icon={<FaChartBar size={16} />}
            trend="up"
            trendValue="2.5%"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Loop Transaction History"
              subtitle="Last 6 months spending on recurring payments"
              height="h-96"
            />
          </div>
          
          <div className="bg-[#131313] rounded-2xl border border-[#222]/40 p-6 flex flex-col">
            <h3 className="text-white font-medium mb-2">Monthly Distribution</h3>
            <p className="text-gray-400 text-sm mb-6">Recurring payments by category</p>
            
            <div className="flex-grow flex items-center justify-center mb-4">
              <div className="w-full max-w-[280px]">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#F43F5E] mr-2"></div>
                      <span className="text-sm text-gray-300">Entertainment</span>
                    </div>
                    <span className="text-sm font-medium text-white">32%</span>
                  </div>
                  <div className="w-full bg-[#222] rounded-full h-2">
                    <div className="bg-[#F43F5E] h-2 rounded-full" style={{width: '32%'}}></div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#3B82F6] mr-2"></div>
                      <span className="text-sm text-gray-300">Utilities</span>
                    </div>
                    <span className="text-sm font-medium text-white">28%</span>
                  </div>
                  <div className="w-full bg-[#222] rounded-full h-2">
                    <div className="bg-[#3B82F6] h-2 rounded-full" style={{width: '28%'}}></div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></div>
                      <span className="text-sm text-gray-300">Software</span>
                    </div>
                    <span className="text-sm font-medium text-white">18%</span>
                  </div>
                  <div className="w-full bg-[#222] rounded-full h-2">
                    <div className="bg-[#10B981] h-2 rounded-full" style={{width: '18%'}}></div>
                  </div>
                </div>
                
                <div className="mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#F97316] mr-2"></div>
                      <span className="text-sm text-gray-300">Other</span>
                    </div>
                    <span className="text-sm font-medium text-white">22%</span>
                  </div>
                  <div className="w-full bg-[#222] rounded-full h-2">
                    <div className="bg-[#F97316] h-2 rounded-full" style={{width: '22%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Active Loop Transactions"
            subtitle="Your recurring payments and subscriptions"
            columns={loopColumns}
            data={loopData}
            showActionButtons={true}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard 
            title="Payment Timeline"
            subtitle="Upcoming payment schedule"
          />
          <ChartCard 
            title="Spending Analysis"
            subtitle="Potential savings opportunities"
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 