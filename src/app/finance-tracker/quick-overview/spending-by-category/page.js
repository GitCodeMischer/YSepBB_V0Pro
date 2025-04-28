'use client';

import React from 'react';
import { FaChartPie, FaUtensils, FaHouse, FaCarSide, FaFilm, FaLightbulb } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';

export default function SpendingByCategoryPage() {
  // Mock data for spending categories
  const categoryColumns = [
    { header: 'Category', accessor: 'category' },
    { header: 'This Month', accessor: 'thisMonth' },
    { header: 'Last Month', accessor: 'lastMonth' },
    { header: 'Change', accessor: 'change' },
    { header: 'Average', accessor: 'average' }
  ];
  
  const categoryData = [
    { 
      category: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center mr-3">
            <FaHouse className="text-[#F97316]" />
          </div>
          <span>Housing</span>
        </div>
      ), 
      thisMonth: '$1,200.00', 
      lastMonth: '$1,200.00', 
      change: '0%',
      average: '$1,200.00'
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
      thisMonth: '$485.33', 
      lastMonth: '$520.42', 
      change: '-6.7%',
      average: '$503.18'
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
      thisMonth: '$245.75', 
      lastMonth: '$310.25', 
      change: '-20.8%',
      average: '$278.33'
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
      thisMonth: '$124.99', 
      lastMonth: '$89.99', 
      change: '+38.9%',
      average: '$105.66'
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
      thisMonth: '$164.24', 
      lastMonth: '$171.55', 
      change: '-4.3%',
      average: '$168.92'
    }
  ];
  
  // Mock category spending data
  const categoryPercentages = [
    { category: 'Housing', percentage: 54, color: '#F97316' },
    { category: 'Food', percentage: 22, color: '#3B82F6' },
    { category: 'Transport', percentage: 11, color: '#10B981' },
    { category: 'Entertainment', percentage: 6, color: '#8B5CF6' },
    { category: 'Utilities', percentage: 7, color: '#EC4899' }
  ];
  
  return (
    <Layout>
      <PageContainer 
        title="Spending by Category" 
        subtitle="Analyze your spending patterns by category"
        icon={<FaChartPie size={20} />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Monthly Spending by Category"
              subtitle="Last 6 months trend"
              height="h-96"
            />
          </div>
          
          <div className="bg-[#131313] rounded-2xl border border-[#222]/40 p-6 flex flex-col">
            <h3 className="text-white font-medium mb-2">Distribution</h3>
            <p className="text-gray-400 text-sm mb-6">Current month spending by category</p>
            
            <div className="flex-grow flex items-center justify-center mb-4">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#222" strokeWidth="15" />
                  
                  {/* This would be replaced with actual chart segments in a real app */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#F97316" strokeWidth="15" strokeDasharray={`${54 * 2.51} ${100 * 2.51}`} strokeDashoffset="0" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="15" strokeDasharray={`${22 * 2.51} ${100 * 2.51}`} strokeDashoffset={`${(100 - 54) * 2.51}`} transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="15" strokeDasharray={`${11 * 2.51} ${100 * 2.51}`} strokeDashoffset={`${(100 - 54 - 22) * 2.51}`} transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8B5CF6" strokeWidth="15" strokeDasharray={`${6 * 2.51} ${100 * 2.51}`} strokeDashoffset={`${(100 - 54 - 22 - 11) * 2.51}`} transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#EC4899" strokeWidth="15" strokeDasharray={`${7 * 2.51} ${100 * 2.51}`} strokeDashoffset={`${(100 - 54 - 22 - 11 - 6) * 2.51}`} transform="rotate(-90 50 50)" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">$2,220</span>
                  <span className="text-sm text-gray-400">Total</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              {categoryPercentages.map((cat) => (
                <div key={cat.category} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-sm text-gray-300">{cat.category}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{cat.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Spending by Category"
            subtitle="Compare current spending with historical data"
            columns={categoryColumns}
            data={categoryData}
            showActionButtons={false}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard 
            title="Top Merchants"
            subtitle="Where you spend the most"
          />
          <ChartCard 
            title="Spending Opportunities"
            subtitle="Potential savings by category"
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 