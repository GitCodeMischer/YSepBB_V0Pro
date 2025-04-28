'use client';

import React from 'react';
import { FaReceipt, FaPlus, FaFilter } from 'react-icons/fa';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import DataTable from '@/components/dashboard/DataTable';
import StatCard from '@/components/dashboard/StatCard';

export default function SubscriptionsPage() {
  // Mock data for subscriptions
  const subscriptionColumns = [
    { header: 'Service', accessor: 'service' },
    { header: 'Category', accessor: 'category' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Billing Cycle', accessor: 'cycle' },
    { header: 'Next Billing', accessor: 'nextBilling' },
    { header: 'Status', accessor: 'status' }
  ];
  
  const subscriptionData = [
    { 
      service: 'Netflix', 
      category: 'Entertainment', 
      amount: '$14.99', 
      cycle: 'Monthly', 
      nextBilling: 'May 3, 2025',
      status: 'Active' 
    },
    { 
      service: 'Spotify', 
      category: 'Entertainment', 
      amount: '$9.99', 
      cycle: 'Monthly', 
      nextBilling: 'May 7, 2025',
      status: 'Active' 
    },
    { 
      service: 'Amazon Prime', 
      category: 'Shopping', 
      amount: '$12.99', 
      cycle: 'Monthly', 
      nextBilling: 'May 15, 2025',
      status: 'Active' 
    },
    { 
      service: 'Fitness Gym', 
      category: 'Health', 
      amount: '$45.00', 
      cycle: 'Monthly', 
      nextBilling: 'May 1, 2025',
      status: 'Active' 
    },
    { 
      service: 'Cloud Storage', 
      category: 'Software', 
      amount: '$9.99', 
      cycle: 'Monthly', 
      nextBilling: 'May 12, 2025',
      status: 'Active' 
    }
  ];

  // Calculate statistics
  const monthlyTotal = subscriptionData.reduce((sum, sub) => {
    return sum + parseFloat(sub.amount.replace('$', ''));
  }, 0);

  const yearlyTotal = monthlyTotal * 12;

  return (
    <Layout>
      <PageContainer 
        title="Subscriptions" 
        subtitle="Manage your recurring subscription services"
        icon={<FaReceipt size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Active Subscriptions" 
            value={subscriptionData.length.toString()} 
            icon={<FaReceipt size={16} />} 
            trend="neutral"
          />
          <StatCard 
            title="Monthly Cost" 
            value={`$${monthlyTotal.toFixed(2)}`} 
            trend="up" 
            trendValue="2.5%"
          />
          <StatCard 
            title="Yearly Cost" 
            value={`$${yearlyTotal.toFixed(2)}`} 
            trend="up" 
            trendValue="2.5%"
          />
          <StatCard 
            title="Entertainment" 
            value="$24.98" 
            trend="neutral"
          />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-white">Your Subscriptions</h2>
            <div className="flex space-x-2">
              <button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-lg text-sm flex items-center">
                <FaPlus className="mr-2" size={14} />
                Add Subscription
              </button>
              <button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-lg text-sm flex items-center">
                <FaFilter className="mr-2" size={14} />
                Filter
              </button>
            </div>
          </div>
          
          <DataTable
            title="Subscriptions"
            subtitle="Your active subscription services"
            columns={subscriptionColumns}
            data={subscriptionData}
            showActionButtons={true}
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 