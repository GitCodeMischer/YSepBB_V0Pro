import React, { useState } from 'react';
import TransactionItem from './TransactionItem';
import { FiSearch, FiFilter } from 'react-icons/fi';

const TransactionList = ({ transactions }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  // Filter transactions based on search query and type filter
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || transaction.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-[#1F1F1F] rounded-xl p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
        <div className="flex gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#2A2A2A] text-gray-200 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="bg-[#2A2A2A] text-gray-200 px-4 py-2 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[400px]">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            No transactions found
          </div>
        )}
      </div>
      
      {transactions.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">
            View All Transactions
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionList; 