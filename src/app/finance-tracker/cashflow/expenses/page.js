'use client';

import React from 'react';
import { FaArrowDown, FaChartPie, FaUtensils, FaHouse, FaCarSide, FaFilm, FaLightbulb, FaCartShopping, FaHeart, FaGraduationCap, FaChartBar } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import StatCard from '@/components/dashboard/StatCard';

export default function ExpensesPage() {
  // Mock data for expenses
  const expenseColumns = [
    { header: 'Category', accessor: 'category' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Budget', accessor: 'budget' },
    { header: 'Status', accessor: 'status' },
    { header: 'Trend', accessor: 'trend' }
  ];
  
  const expenseData = [
    { 
      category: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center mr-3">
            <FaHouse className="text-[#F97316]" />
          </div>
          <span>Housing</span>
        </div>
      ), 
      amount: '$1,200.00', 
      budget: '$1,200.00',
      status: <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">On Budget</span>,
      trend: <span className="text-gray-400">0%</span>
    },
    { 
      category: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mr-3">
            <FaUtensils className="text-[#3B82F6]" />
          </div>
          <span>Food & Dining</span>
        </div>
      ), 
      amount: '$485.33', 
      budget: '$550.00',
      status: <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">Under Budget</span>,
      trend: <span className="text-green-500">-11.8%</span>
    },
    { 
      category: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center mr-3">
            <FaCarSide className="text-[#10B981]" />
          </div>
          <span>Transportation</span>
        </div>
      ), 
      amount: '$245.75', 
      budget: '$300.00',
      status: <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">Under Budget</span>,
      trend: <span className="text-green-500">-18.1%</span>
    },
    { 
      category: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mr-3">
            <FaFilm className="text-[#8B5CF6]" />
          </div>
          <span>Entertainment</span>
        </div>
      ), 
      amount: '$124.99', 
      budget: '$100.00',
      status: <span className="px-2 py-1 text-xs rounded-full bg-red-500/10 text-red-500">Over Budget</span>,
      trend: <span className="text-red-500">+25.0%</span>
    },
    { 
      category: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#EC4899]/10 flex items-center justify-center mr-3">
            <FaLightbulb className="text-[#EC4899]" />
          </div>
          <span>Utilities</span>
        </div>
      ), 
      amount: '$164.24', 
      budget: '$180.00',
      status: <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">Under Budget</span>,
      trend: <span className="text-green-500">-8.8%</span>
    },
    { 
      category: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center mr-3">
            <FaCartShopping className="text-[#0EA5E9]" />
          </div>
          <span>Shopping</span>
        </div>
      ), 
      amount: '$237.85', 
      budget: '$200.00',
      status: <span className="px-2 py-1 text-xs rounded-full bg-red-500/10 text-red-500">Over Budget</span>,
      trend: <span className="text-red-500">+18.9%</span>
    },
    { 
      category: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#F43F5E]/10 flex items-center justify-center mr-3">
            <FaHeart className="text-[#F43F5E]" />
          </div>
          <span>Health</span>
        </div>
      ), 
      amount: '$98.50', 
      budget: '$120.00',
      status: <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">Under Budget</span>,
      trend: <span className="text-green-500">-17.9%</span>
    },
    { 
      category: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#14B8A6]/10 flex items-center justify-center mr-3">
            <FaGraduationCap className="text-[#14B8A6]" />
          </div>
          <span>Education</span>
        </div>
      ), 
      amount: '$75.00', 
      budget: '$150.00',
      status: <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">Under Budget</span>,
      trend: <span className="text-green-500">-50.0%</span>
    }
  ];
  
  // Calculate total expenses
  const totalExpenses = expenseData.reduce((sum, item) => {
    const amount = parseFloat(item.amount.replace(/[$,]/g, ''));
    return sum + amount;
  }, 0);
  
  // Calculate total budget
  const totalBudget = expenseData.reduce((sum, item) => {
    const budget = parseFloat(item.budget.replace(/[$,]/g, ''));
    return sum + budget;
  }, 0);
  
  // Calculate budget variance
  const budgetVariance = ((totalBudget - totalExpenses) / totalBudget) * 100;
  
  return (
    <Layout>
      <PageContainer 
        title="Expenses" 
        subtitle="Track and manage your spending by category"
        icon={<FaArrowDown size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Expenses"
            value={`$${totalExpenses.toLocaleString()}`}
            icon={<FaArrowDown size={16} />}
            trend={budgetVariance >= 0 ? "down" : "up"}
            trendValue={`${Math.abs(budgetVariance).toFixed(1)}%`}
          />
          <StatCard
            title="Monthly Budget"
            value={`$${totalBudget.toLocaleString()}`}
            icon={<FaChartBar size={16} />}
            trend="up"
            trendValue="2.5%"
          />
          <StatCard
            title="Largest Category"
            value="Housing"
            icon={<FaHouse size={16} />}
            trend="up"
            trendValue="45.2%"
          />
          <StatCard
            title="Categories"
            value="8"
            icon={<FaChartPie size={16} />}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Monthly Expenses by Category"
              subtitle="Last 6 months"
              height="h-96"
            />
          </div>
          
          <div className="bg-[#131313] rounded-2xl border border-[#222]/40 p-6 flex flex-col">
            <h3 className="text-white font-medium mb-2">Budget Overview</h3>
            <p className="text-gray-400 text-sm mb-6">Expense performance against budget</p>
            
            <div className="flex-grow flex flex-col justify-center space-y-2 mb-4">
              <div className="mb-6 text-center">
                <div className="mb-2">
                  <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-[6px] border-[#3B82F6] relative">
                    <div className="text-2xl font-bold text-white">
                      {budgetVariance >= 0 ? 
                        `${budgetVariance.toFixed(1)}%` : 
                        `${Math.abs(budgetVariance).toFixed(1)}%`
                      }
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  {budgetVariance >= 0 ? 
                    "Under budget for this month" : 
                    "Over budget for this month"
                  }
                </p>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Total Expenses</span>
                  <span className="text-sm font-medium text-white">${totalExpenses.toLocaleString()} / ${totalBudget.toLocaleString()}</span>
                </div>
                <div className="w-full bg-[#222] rounded-full h-2.5">
                  <div 
                    className={`${budgetVariance >= 0 ? 'bg-[#10B981]' : 'bg-[#F43F5E]'} h-2.5 rounded-full`} 
                    style={{width: `${Math.min(100, (totalExpenses/totalBudget) * 100)}%`}}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    {(totalExpenses/totalBudget * 100).toFixed(1)}% of monthly budget
                  </span>
                  {budgetVariance >= 0 && (
                    <span className="text-xs text-green-500">${(totalBudget - totalExpenses).toFixed(2)} remaining</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Expenses by Category"
            subtitle="This month's spending breakdown"
            columns={expenseColumns}
            data={expenseData}
            showActionButtons={true}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard 
            title="Expense Trends"
            subtitle="Month-over-month changes"
          />
          <ChartCard 
            title="Budget vs. Actuals"
            subtitle="6-month comparison"
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 