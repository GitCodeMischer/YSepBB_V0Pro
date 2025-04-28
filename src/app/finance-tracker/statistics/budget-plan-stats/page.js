'use client';

import React from 'react';
import { FaChartPie, FaRegNoteSticky, FaBullseye, FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import StatCard from '@/components/dashboard/StatCard';
import DataTable from '@/components/dashboard/DataTable';

export default function BudgetPlanStatsPage() {
  // Mock data for budget categories
  const budgetColumns = [
    { header: 'Category', accessor: 'category' },
    { header: 'Budgeted', accessor: 'budgeted' },
    { header: 'Actual', accessor: 'actual' },
    { header: 'Difference', accessor: 'difference' },
    { 
      header: 'Progress', 
      accessor: 'progress',
      cell: (row) => (
        <div className="w-full bg-[#222] rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              row.status === 'good' ? 'bg-green-500' : 
              row.status === 'warning' ? 'bg-yellow-500' : 
              'bg-red-500'
            }`} 
            style={{ width: `${row.progress}%` }}
          ></div>
        </div>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (row) => (
        <div className={`px-2 py-1 rounded-full text-xs text-center w-24 ${
          row.status === 'good' ? 'bg-green-900/30 text-green-400' : 
          row.status === 'warning' ? 'bg-yellow-900/30 text-yellow-400' : 
          'bg-red-900/30 text-red-400'
        }`}>
          {row.status === 'good' ? 'Good' : row.status === 'warning' ? 'Warning' : 'Over Budget'}
        </div>
      )
    }
  ];
  
  const budgetData = [
    { 
      category: 'Housing', 
      budgeted: '$1,500.00', 
      actual: '$1,485.00', 
      difference: '$15.00', 
      progress: 99,
      status: 'good'
    },
    { 
      category: 'Food & Dining', 
      budgeted: '$600.00', 
      actual: '$720.50', 
      difference: '-$120.50', 
      progress: 120,
      status: 'over'
    },
    { 
      category: 'Transportation', 
      budgeted: '$400.00', 
      actual: '$385.75', 
      difference: '$14.25', 
      progress: 96,
      status: 'good'
    },
    { 
      category: 'Entertainment', 
      budgeted: '$250.00', 
      actual: '$318.25', 
      difference: '-$68.25', 
      progress: 127,
      status: 'over'
    },
    { 
      category: 'Utilities', 
      budgeted: '$350.00', 
      actual: '$328.90', 
      difference: '$21.10', 
      progress: 94,
      status: 'good'
    },
    { 
      category: 'Shopping', 
      budgeted: '$200.00', 
      actual: '$187.45', 
      difference: '$12.55', 
      progress: 94,
      status: 'good'
    },
    { 
      category: 'Healthcare', 
      budgeted: '$300.00', 
      actual: '$245.75', 
      difference: '$54.25', 
      progress: 82,
      status: 'good'
    },
    { 
      category: 'Personal Care', 
      budgeted: '$150.00', 
      actual: '$135.90', 
      difference: '$14.10', 
      progress: 91,
      status: 'good'
    }
  ];

  // Calculate totals and stats
  const totalBudgeted = budgetData.reduce((sum, item) => {
    return sum + parseFloat(item.budgeted.replace(/[^0-9.-]+/g, ""));
  }, 0);
  
  const totalActual = budgetData.reduce((sum, item) => {
    return sum + parseFloat(item.actual.replace(/[^0-9.-]+/g, ""));
  }, 0);
  
  const overBudgetCategories = budgetData.filter(item => item.status === 'over').length;
  
  const budgetUtilization = (totalActual / totalBudgeted * 100).toFixed(1);
  
  return (
    <Layout>
      <PageContainer 
        title="Budget Plan Statistics" 
        subtitle="Performance tracking for your budget plan"
        icon={<FaChartPie size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Budgeted" 
            value={`$${totalBudgeted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            icon={<FaBullseye size={16} />} 
          />
          <StatCard 
            title="Total Spent" 
            value={`$${totalActual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            icon={<FaRegNoteSticky size={16} />} 
            trend={totalActual <= totalBudgeted ? "down" : "up"} 
            trendValue={`${Math.abs(((totalActual / totalBudgeted) - 1) * 100).toFixed(1)}%`}
          />
          <StatCard 
            title="Budget Utilization" 
            value={`${budgetUtilization}%`} 
            icon={<FaChartPie size={16} />} 
          />
          <StatCard 
            title="Over Budget" 
            value={`${overBudgetCategories}/${budgetData.length}`} 
            icon={<FaArrowUp size={16} />} 
            trend="neutral"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Monthly Trend"
              subtitle="Budget vs Actual (Last 6 Months)"
              height="h-80"
            />
          </div>
          <div>
            <ChartCard 
              title="Category Breakdown"
              subtitle="Percentage of total budget"
              height="h-80"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Budget Categories"
            subtitle="Current month budget performance by category"
            columns={budgetColumns}
            data={budgetData.map(item => ({
              ...item,
              progress: (
                <div className="w-full bg-[#222] rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      item.status === 'good' ? 'bg-green-500' : 
                      item.status === 'warning' ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`} 
                    style={{ width: `${Math.min(item.progress, 100)}%` }}
                  ></div>
                </div>
              ),
              status: (
                <div className={`px-2 py-1 rounded-full text-xs text-center w-24 ${
                  item.status === 'good' ? 'bg-green-900/30 text-green-400' : 
                  item.status === 'warning' ? 'bg-yellow-900/30 text-yellow-400' : 
                  'bg-red-900/30 text-red-400'
                }`}>
                  {item.status === 'good' ? 'Good' : item.status === 'warning' ? 'Warning' : 'Over Budget'}
                </div>
              )
            }))}
            showActionButtons={false}
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 