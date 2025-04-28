import React from 'react';
import { FiArrowUp, FiArrowDown, FiShoppingBag, FiHome, FiCoffee, FiDollarSign, FiGrid } from 'react-icons/fi';

// Helper function to get icon based on category
const getCategoryIcon = (category) => {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower === 'shopping') return <FiShoppingBag />;
  if (categoryLower === 'food') return <FiCoffee />;
  if (categoryLower === 'utilities') return <FiHome />;
  if (categoryLower === 'income') return <FiDollarSign />;
  
  // Default icon
  return <FiGrid />;
};

// Format date to be more readable
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const TransactionItem = ({ transaction }) => {
  const { type, amount, description, category, date, status } = transaction;
  
  // Determine color and icon based on transaction type
  const isIncome = type === 'income';
  const amountColor = isIncome ? 'text-green-500' : 'text-red-500';
  const amountPrefix = isIncome ? '+' : '-';
  const TypeIcon = isIncome ? FiArrowUp : FiArrowDown;
  const categoryIcon = getCategoryIcon(category);
  
  return (
    <div className="flex items-center justify-between p-4 hover:bg-[#1A1A1A] rounded-lg transition-all cursor-pointer">
      {/* Left side - Icon and description */}
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isIncome ? 'bg-green-500/10' : 'bg-red-500/10'
        }`}>
          {categoryIcon}
        </div>
        <div className="ml-4">
          <h3 className="font-medium text-white">{description}</h3>
          <div className="flex items-center text-sm text-gray-400">
            <span>{category}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(date)}</span>
          </div>
        </div>
      </div>
      
      {/* Right side - Amount and status */}
      <div className="flex flex-col items-end">
        <div className={`font-semibold ${amountColor}`}>
          {amountPrefix}${amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
        <div className="flex items-center text-xs mt-1">
          <span className={`px-2 py-1 rounded-full ${
            status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem; 