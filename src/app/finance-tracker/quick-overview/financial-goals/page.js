'use client';

import React from 'react';
import { FaBullseye, FaPlus, FaChartLine, FaRegEdit, FaTrash, FaFilter } from 'react-icons/fa';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ProgressCard from '@/components/dashboard/ProgressCard';
import ChartCard from '@/components/dashboard/ChartCard';
import StatCard from '@/components/dashboard/StatCard';

export default function FinancialGoalsPage() {
  // Mock data for goals
  const goals = [
    {
      id: 1,
      title: "Emergency Fund",
      description: "3 months of living expenses",
      category: "Savings",
      currentAmount: 5000,
      targetAmount: 10000,
      deadline: "Dec 2023",
      progress: 50,
      color: "blue"
    },
    {
      id: 2,
      title: "New Car",
      description: "Down payment for a new car",
      category: "Asset",
      currentAmount: 3500,
      targetAmount: 5000,
      deadline: "Mar 2024",
      progress: 70,
      color: "green"
    },
    {
      id: 3,
      title: "Vacation to Japan",
      description: "Trip planned for next summer",
      category: "Travel",
      currentAmount: 1200,
      targetAmount: 4000,
      deadline: "Jul 2024",
      progress: 30,
      color: "purple"
    },
    {
      id: 4,
      title: "Pay off Student Loan",
      description: "Federal student loan",
      category: "Debt",
      currentAmount: 8000,
      targetAmount: 25000,
      deadline: "Jan 2025",
      progress: 32,
      color: "orange"
    },
    {
      id: 5,
      title: "Home Down Payment",
      description: "20% down for a condo",
      category: "Housing",
      currentAmount: 15000,
      targetAmount: 60000,
      deadline: "Dec 2025",
      progress: 25,
      color: "pink"
    }
  ];

  // Calculate statistics
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const avgProgress = Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / totalGoals);
  
  return (
    <Layout>
      <PageContainer 
        title="Financial Goals" 
        subtitle="Track progress towards your financial dreams"
        icon={<FaBullseye size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Goals"
            value={totalGoals.toString()}
            trend="+1"
            trendDirection="up"
            icon={<FaBullseye />}
            color="blue"
          />
          <StatCard
            title="Amount Saved"
            value={`$${totalSaved.toLocaleString()}`}
            trend="+$2,500"
            trendDirection="up"
            icon={<FaChartLine />}
            color="green"
          />
          <StatCard
            title="Total Target"
            value={`$${totalTarget.toLocaleString()}`}
            trend=""
            trendDirection="neutral"
            icon={<FaBullseye />}
            color="purple"
          />
          <StatCard
            title="Avg. Progress"
            value={`${avgProgress}%`}
            trend="+5%"
            trendDirection="up"
            icon={<FaChartLine />}
            color="orange"
          />
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-white">Your Financial Goals</h2>
            <div className="flex space-x-2">
              <button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-lg text-sm flex items-center">
                <FaPlus className="mr-2" size={14} />
                Add Goal
              </button>
              <button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-lg text-sm flex items-center">
                <FaFilter className="mr-2" size={14} />
                Filter
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {goals.map(goal => (
              <ProgressCard
                key={goal.id}
                title={goal.title}
                description={goal.description}
                category={goal.category}
                currentAmount={goal.currentAmount}
                targetAmount={goal.targetAmount}
                deadline={goal.deadline}
                progress={goal.progress}
                color={goal.color}
                actions={[
                  { icon: <FaRegEdit size={14} />, label: 'Edit' },
                  { icon: <FaPlus size={14} />, label: 'Add Funds' },
                  { icon: <FaTrash size={14} />, label: 'Delete' }
                ]}
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard 
            title="Monthly Contributions"
            subtitle="Last 6 months"
            height="h-80"
          />
          <ChartCard 
            title="Goal Completion Timeline"
            subtitle="Projected completion dates"
            height="h-80"
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 