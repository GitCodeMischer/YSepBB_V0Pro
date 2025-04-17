import React from 'react';
import TransactionList from './TransactionList';
import { FiArrowUp, FiArrowDown, FiDollarSign, FiPieChart } from 'react-icons/fi';

// Mock transactions data
const mockTransactions = [
  {
    id: 1,
    type: 'income',
    amount: 2500.00,
    description: 'Salary Payment',
    category: 'Income',
    date: new Date('2023-11-01'),
    status: 'completed'
  },
  {
    id: 2,
    type: 'expense',
    amount: 45.99,
    description: 'Grocery Shopping',
    category: 'Food',
    date: new Date('2023-11-03'),
    status: 'completed'
  },
  {
    id: 3,
    type: 'expense',
    amount: 125.00,
    description: 'Electricity Bill',
    category: 'Utilities',
    date: new Date('2023-11-05'),
    status: 'pending'
  },
  {
    id: 4,
    type: 'income',
    amount: 500.00,
    description: 'Freelance Project',
    category: 'Income',
    date: new Date('2023-11-07'),
    status: 'completed'
  },
  {
    id: 5,
    type: 'expense',
    amount: 899.99,
    description: 'New Laptop',
    category: 'Shopping',
    date: new Date('2023-11-10'),
    status: 'completed'
  }
];

// Card component for financial summary
const SummaryCard = ({ title, amount, icon: Icon, color }) => (
  <div className="bg-[#1F1F1F] rounded-xl p-4 flex items-center">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div className="ml-4">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-white text-xl font-bold">${amount.toLocaleString()}</p>
    </div>
  </div>
);

const Dashboard = () => {
  // Calculate summary statistics
  const totalIncome = mockTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpenses;

  return (
    <div className="p-6 bg-[#141414] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Financial Dashboard</h1>
        
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <SummaryCard 
            title="Total Balance" 
            amount={balance} 
            icon={FiDollarSign} 
            color="bg-blue-500"
          />
          <SummaryCard 
            title="Total Income" 
            amount={totalIncome} 
            icon={FiArrowUp} 
            color="bg-green-500"
          />
          <SummaryCard 
            title="Total Expenses" 
            amount={totalExpenses} 
            icon={FiArrowDown} 
            color="bg-red-500"
          />
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions list - takes 2/3 of the width on large screens */}
          <div className="lg:col-span-2">
            <TransactionList transactions={mockTransactions} />
          </div>
          
          {/* Additional content could go here - 1/3 of width */}
          <div className="bg-[#1F1F1F] rounded-xl p-4">
            <div className="flex items-center mb-6">
              <FiPieChart className="text-blue-500 mr-2" size={20} />
              <h2 className="text-xl font-bold text-white">Spending Breakdown</h2>
            </div>
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p>Spending chart will go here</p>
              <p className="text-sm mt-2">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 