'use client';

import React from 'react';
import { FaCalendarAlt, FaPlus, FaFilter } from 'react-icons/fa';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import DataTable from '@/components/dashboard/DataTable';
import StatCard from '@/components/dashboard/StatCard';

export default function PlannedPaymentsPage() {
  // Mock data for planned payments
  const paymentColumns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Due Date', accessor: 'dueDate' },
    { header: 'Frequency', accessor: 'frequency' },
    { header: 'Category', accessor: 'category' },
    { header: 'Status', accessor: 'status' }
  ];
  
  const paymentData = [
    { 
      name: 'Mortgage Payment', 
      amount: '$1,200.00', 
      dueDate: '1st of month', 
      frequency: 'Monthly', 
      category: 'Housing',
      status: 'Active' 
    },
    { 
      name: 'Car Loan', 
      amount: '$350.00', 
      dueDate: '15th of month', 
      frequency: 'Monthly', 
      category: 'Transportation',
      status: 'Active' 
    },
    { 
      name: 'Health Insurance', 
      amount: '$175.00', 
      dueDate: '5th of month', 
      frequency: 'Monthly', 
      category: 'Insurance',
      status: 'Active' 
    },
    { 
      name: 'Property Tax', 
      amount: '$850.00', 
      dueDate: 'Jun 15, 2025', 
      frequency: 'Semi-Annual', 
      category: 'Taxes',
      status: 'Upcoming' 
    },
    { 
      name: 'Annual Fee', 
      amount: '$99.00', 
      dueDate: 'Aug 10, 2025', 
      frequency: 'Annual', 
      category: 'Membership',
      status: 'Upcoming' 
    }
  ];

  return (
    <Layout>
      <PageContainer 
        title="Planned Payments" 
        subtitle="Manage your recurring bills and scheduled payments"
        icon={<FaCalendarAlt size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Monthly Payments" 
            value="$1,725.00" 
            icon={<FaCalendarAlt size={16} />} 
            trend="neutral"
          />
          <StatCard 
            title="Next Payment" 
            value="$1,200.00" 
            trend="up" 
            trendValue="May 1"
          />
          <StatCard 
            title="Annual Total" 
            value="$23,749.00" 
            trend="up" 
            trendValue="4.2%"
          />
          <StatCard 
            title="Active Payments" 
            value="5" 
            trend="neutral"
          />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-white">Your Planned Payments</h2>
            <div className="flex space-x-2">
              <button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-lg text-sm flex items-center">
                <FaPlus className="mr-2" size={14} />
                Add Payment
              </button>
              <button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-lg text-sm flex items-center">
                <FaFilter className="mr-2" size={14} />
                Filter
              </button>
            </div>
          </div>
          
          <DataTable
            title="Planned Payments"
            subtitle="Your upcoming and recurring payments"
            columns={paymentColumns}
            data={paymentData}
            showActionButtons={true}
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 