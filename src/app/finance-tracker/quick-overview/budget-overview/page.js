'use client';

import React from 'react';
import { FaChartLine, FaArrowUp, FaArrowDown, FaWallet, FaRegNoteSticky } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';

export default function BudgetOverviewPage() {
  // Mock data for budget overview
  const budgetColumns = [
    { header: 'Category', accessor: 'category' },
    { header: 'Budget', accessor: 'budget' },
    { header: 'Spent', accessor: 'spent' },
    { header: 'Remaining', accessor: 'remaining' },
    { header: 'Status', accessor: 'status' }
  ];
  
  const budgetData = [
    { 
      category: 'Housing', 
      budget: '$1,200.00', 
      spent: '$1,200.00', 
      remaining: '$0.00',
      status: 'On Budget'
    },
    { 
      category: 'Food & Dining', 
      budget: '$500.00', 
      spent: '$385.33', 
      remaining: '$114.67',
      status: 'Under Budget'
    },
    { 
      category: 'Transportation', 
      budget: '$250.00', 
      spent: '$175.75', 
      remaining: '$74.25',
      status: 'Under Budget'
    },
    { 
      category: 'Entertainment', 
      budget: '$150.00', 
      spent: '$184.99', 
      remaining: '-$34.99',
      status: 'Over Budget'
    },
    { 
      category: 'Utilities', 
      budget: '$350.00', 
      spent: '$328.24', 
      remaining: '$21.76',
      status: 'On Budget'
    }
  ];
  
  return (
    <Layout>
      <PageContainer 
        title="Budget Overview" 
        subtitle="Track your budget performance across categories"
        icon={<FaChartLine size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Budget" 
            value="$3,450.00" 
            icon={<FaWallet size={16} />} 
          />
          <StatCard 
            title="Total Spent" 
            value="$2,274.31" 
            icon={<FaRegNoteSticky size={16} />} 
            trend="up" 
            trendValue="8.4%"
          />
          <StatCard 
            title="Remaining" 
            value="$1,175.69" 
            icon={<FaArrowDown size={16} />} 
          />
          <StatCard 
            title="Budget Health" 
            value="Good" 
            icon={<FaChartLine size={16} />} 
            trend="up" 
            trendValue="2 points"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Monthly Budget vs. Actual"
              subtitle="Performance by category"
              height="h-80"
            />
          </div>
          <div>
            <ChartCard 
              title="Budget Distribution"
              subtitle="By expense category"
              height="h-80"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Budget Categories"
            subtitle="Performance by category"
            columns={budgetColumns}
            data={budgetData}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard 
            title="Budget Trends"
            subtitle="Last 6 months"
          />
          <ChartCard 
            title="Budget vs. Actual"
            subtitle="Historical comparison"
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 