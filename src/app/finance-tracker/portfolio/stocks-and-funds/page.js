'use client';

import React from 'react';
import { FaChartLine, FaPlus, FaArrowUp, FaArrowDown, FaHistory, FaExchangeAlt } from 'react-icons/fa';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';

export default function StocksAndFundsPage() {
  // Mock data for stocks and funds
  const stockColumns = [
    { 
      header: 'Symbol', 
      accessor: 'symbol',
      cell: (row) => (
        <div className="font-mono font-medium">{row.symbol}</div>
      )
    },
    { 
      header: 'Name', 
      accessor: 'name',
      cell: (row) => (
        <div>
          <div className="font-medium">{row.name}</div>
          <div className="text-xs text-gray-500">{row.type}</div>
        </div>
      )
    },
    { header: 'Shares', accessor: 'shares' },
    { header: 'Price', accessor: 'price' },
    { header: 'Value', accessor: 'value' },
    { 
      header: 'Return', 
      accessor: 'return',
      cell: (row) => (
        <div className={row.returnType === 'up' ? 'text-green-500' : 'text-red-500'}>
          <div className="flex items-center">
            {row.returnType === 'up' ? <FaArrowUp size={10} className="mr-1" /> : <FaArrowDown size={10} className="mr-1" />}
            {row.return}
          </div>
        </div>
      )
    },
    { header: 'Cost Basis', accessor: 'costBasis' }
  ];
  
  const stockData = [
    { 
      symbol: 'AAPL', 
      name: 'Apple Inc.', 
      type: 'Stock',
      shares: '15.00', 
      price: '$173.45',
      value: '$2,601.75',
      return: '21.5%',
      returnType: 'up',
      costBasis: '$142.80'
    },
    { 
      symbol: 'MSFT', 
      name: 'Microsoft Corporation', 
      type: 'Stock',
      shares: '10.00', 
      price: '$325.12',
      value: '$3,251.20',
      return: '15.3%',
      returnType: 'up',
      costBasis: '$282.00'
    },
    { 
      symbol: 'GOOG', 
      name: 'Alphabet Inc.', 
      type: 'Stock',
      shares: '5.00', 
      price: '$132.88',
      value: '$664.40',
      return: '4.5%',
      returnType: 'up',
      costBasis: '$127.20'
    },
    { 
      symbol: 'AMZN', 
      name: 'Amazon.com, Inc.', 
      type: 'Stock',
      shares: '8.00', 
      price: '$129.96',
      value: '$1,039.68',
      return: '12.8%',
      returnType: 'up',
      costBasis: '$115.25'
    },
    { 
      symbol: 'TSLA', 
      name: 'Tesla, Inc.', 
      type: 'Stock',
      shares: '12.00', 
      price: '$254.65',
      value: '$3,055.80',
      return: '-8.3%',
      returnType: 'down',
      costBasis: '$277.60'
    },
    { 
      symbol: 'VTI', 
      name: 'Vanguard Total Stock Market ETF', 
      type: 'ETF',
      shares: '20.00', 
      price: '$219.84',
      value: '$4,396.80',
      return: '9.1%',
      returnType: 'up',
      costBasis: '$201.45'
    },
    { 
      symbol: 'VXUS', 
      name: 'Vanguard Total International Stock ETF', 
      type: 'ETF',
      shares: '25.00', 
      price: '$56.12',
      value: '$1,403.00',
      return: '3.2%',
      returnType: 'up',
      costBasis: '$54.35'
    },
    { 
      symbol: 'BND', 
      name: 'Vanguard Total Bond Market ETF', 
      type: 'ETF',
      shares: '30.00', 
      price: '$72.45',
      value: '$2,173.50',
      return: '-1.7%',
      returnType: 'down',
      costBasis: '$73.70'
    }
  ];
  
  // Calculate totals
  const totalValue = stockData.reduce((sum, stock) => {
    const value = parseFloat(stock.value.replace(/[^0-9.-]+/g, ""));
    return sum + value;
  }, 0);
  
  const totalReturn = stockData.reduce((sum, stock) => {
    const value = parseFloat(stock.value.replace(/[^0-9.-]+/g, ""));
    const costBasis = parseFloat(stock.costBasis.replace(/[^0-9.-]+/g, "")) * parseFloat(stock.shares);
    return sum + (value - costBasis);
  }, 0);
  
  const totalReturnPercent = (totalReturn / (totalValue - totalReturn) * 100).toFixed(2);
  
  return (
    <Layout>
      <PageContainer 
        title="Stocks & Funds" 
        subtitle="Manage your stock and fund investments"
        icon={<FaChartLine size={20} />}
      >
        <div className="flex justify-end mb-6">
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-xl text-white font-medium text-sm">
              <FaHistory size={14} className="mr-2" />
              <span>Transaction History</span>
            </button>
            <button className="flex items-center px-4 py-2 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-xl text-white font-medium text-sm">
              <FaExchangeAlt size={14} className="mr-2" />
              <span>Trade</span>
            </button>
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] rounded-xl text-black font-medium text-sm">
              <FaPlus size={14} className="mr-2" />
              <span>Add Position</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Portfolio Value" 
            value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            icon={<FaChartLine size={16} />} 
            trend={totalReturnPercent > 0 ? "up" : "down"} 
            trendValue={`${totalReturnPercent}%`}
            bgClass="bg-gradient-to-r from-[#131313] to-[#1a1a1a]"
          />
          <StatCard 
            title="Total Return" 
            value={`$${totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            icon={totalReturnPercent > 0 ? <FaArrowUp size={16} /> : <FaArrowDown size={16} />} 
            trend={totalReturnPercent > 0 ? "up" : "down"} 
            trendValue={`${totalReturnPercent}%`}
          />
          <StatCard 
            title="Equity" 
            value="70%" 
            icon={<FaChartLine size={16} />} 
          />
          <StatCard 
            title="Positions" 
            value={stockData.length} 
            icon={<FaExchangeAlt size={16} />} 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Portfolio Performance"
              subtitle="YTD performance"
              height="h-80"
            />
          </div>
          <div>
            <ChartCard 
              title="Asset Allocation"
              subtitle="By investment type"
              height="h-80"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Your Investments"
            subtitle="Stocks, ETFs, and mutual funds"
            columns={stockColumns}
            data={stockData.map(item => ({
              ...item,
              return: (
                <div className={item.returnType === 'up' ? 'text-green-500' : 'text-red-500'}>
                  <div className="flex items-center">
                    {item.returnType === 'up' ? <FaArrowUp size={10} className="mr-1" /> : <FaArrowDown size={10} className="mr-1" />}
                    {item.return}
                  </div>
                </div>
              ),
              symbol: (
                <div className="font-mono font-medium">{item.symbol}</div>
              ),
              name: (
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.type}</div>
                </div>
              )
            }))}
            showActionButtons={true}
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 