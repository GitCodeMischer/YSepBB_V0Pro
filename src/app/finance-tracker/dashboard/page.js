'use client';

import React from 'react';
import { FaHouse, FaChartPie, FaWallet, FaChartLine, FaRegNoteSticky } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';

export default function DashboardPage() {
  // Mock data for transactions
  const transactionColumns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Description', accessor: 'description' },
    { header: 'Category', accessor: 'category' },
    { header: 'Amount', accessor: 'amount' }
  ];
  
  const transactionData = [
    { date: 'Apr 15, 2025', description: 'Grocery Shopping', category: 'Food', amount: '$85.33' },
    { date: 'Apr 13, 2025', description: 'Netflix Subscription', category: 'Entertainment', amount: '$14.99' },
    { date: 'Apr 10, 2025', description: 'Salary Deposit', category: 'Income', amount: '$3,500.00' },
    { date: 'Apr 08, 2025', description: 'Electricity Bill', category: 'Utilities', amount: '$78.25' },
    { date: 'Apr 05, 2025', description: 'Restaurant', category: 'Food', amount: '$65.40' }
  ];
  
  return (
    <Layout>
      <PageContainer 
        title="Dashboard" 
        subtitle="Welcome back! Here's an overview of your financial status."
        icon={<FaHouse size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Balance" 
            value="$24,562.00" 
            icon={<FaWallet size={16} />} 
            trend="up" 
            trendValue="12.5%"
          />
          <StatCard 
            title="Monthly Income" 
            value="$7,230.00" 
            icon={<FaChartLine size={16} />} 
            trend="up" 
            trendValue="3.2%"
          />
          <StatCard 
            title="Monthly Expenses" 
            value="$4,120.00" 
            icon={<FaChartPie size={16} />} 
            trend="down" 
            trendValue="5.1%"
          />
          <StatCard 
            title="Savings Rate" 
            value="42.8%" 
            icon={<FaRegNoteSticky size={16} />} 
            trend="up" 
            trendValue="8.3%"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Cash Flow"
              subtitle="Income vs. Expenses (Last 6 Months)"
              height="h-80"
            />
          </div>
          <div>
            <ChartCard 
              title="Expense Breakdown"
              subtitle="By Category"
              height="h-80"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Recent Transactions"
            subtitle="Your latest financial activities"
            columns={transactionColumns}
            data={transactionData}
            showActionButtons={false}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard 
            title="Budget Status"
            subtitle="Progress toward your monthly targets"
          />
          <ChartCard 
            title="Savings Goals"
            subtitle="Track your progress on saving objectives"
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 