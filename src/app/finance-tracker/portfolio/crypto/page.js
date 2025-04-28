'use client';

import React from 'react';
import { FaCoins, FaBitcoin, FaEthereum, FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';

// Custom icon component for crypto logos
const CryptoLogo = ({ symbol }) => {
  // You could replace these with actual crypto logos in a real app
  switch(symbol.toLowerCase()) {
    case 'btc':
      return <FaBitcoin className="text-[#F7931A]" />;
    case 'eth':
      return <FaEthereum className="text-[#627EEA]" />;
    default:
      return <FaCoins className="text-gray-400" />;
  }
};

export default function CryptoPortfolioPage() {
  // Mock data for crypto assets
  const cryptoColumns = [
    { 
      header: 'Asset', 
      accessor: 'asset',
      // Custom cell renderer for asset column
      cell: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#181818] flex items-center justify-center mr-3">
            <CryptoLogo symbol={row.symbol} />
          </div>
          <div>
            <div className="font-medium">{row.asset}</div>
            <div className="text-xs text-gray-500">{row.symbol}</div>
          </div>
        </div>
      )
    },
    { header: 'Holdings', accessor: 'holdings' },
    { header: 'Price', accessor: 'price' },
    { header: 'Value', accessor: 'value' },
    { 
      header: '24h Change', 
      accessor: 'change',
      // Custom cell renderer for change column
      cell: (row) => (
        <div className={row.changeType === 'up' ? 'text-green-500' : 'text-red-500'}>
          <div className="flex items-center">
            {row.changeType === 'up' ? <FaArrowUp size={10} className="mr-1" /> : <FaArrowDown size={10} className="mr-1" />}
            {row.change}
          </div>
        </div>
      )
    },
    { header: 'Avg. Buy Price', accessor: 'avgBuyPrice' }
  ];
  
  const cryptoData = [
    { 
      asset: 'Bitcoin', 
      symbol: 'BTC', 
      holdings: '0.45 BTC', 
      price: '$35,420.00',
      value: '$15,939.00',
      change: '2.4%',
      changeType: 'up',
      avgBuyPrice: '$32,100.00'
    },
    { 
      asset: 'Ethereum', 
      symbol: 'ETH', 
      holdings: '3.2 ETH', 
      price: '$2,312.50',
      value: '$7,400.00',
      change: '1.8%',
      changeType: 'up',
      avgBuyPrice: '$2,050.25'
    },
    { 
      asset: 'Cardano', 
      symbol: 'ADA', 
      holdings: '2,500 ADA', 
      price: '$0.54',
      value: '$1,350.00',
      change: '0.5%',
      changeType: 'down',
      avgBuyPrice: '$0.60'
    },
    { 
      asset: 'Solana', 
      symbol: 'SOL', 
      holdings: '20 SOL', 
      price: '$105.30',
      value: '$2,106.00',
      change: '5.2%',
      changeType: 'up',
      avgBuyPrice: '$87.45'
    },
    { 
      asset: 'Polkadot', 
      symbol: 'DOT', 
      holdings: '150 DOT', 
      price: '$7.80',
      value: '$1,170.00',
      change: '1.2%',
      changeType: 'down',
      avgBuyPrice: '$8.25'
    }
  ];
  
  // Mock data for portfolio summary
  const totalValue = '$27,965.00';
  const totalProfitLoss = '+$3,245.80';
  const percentageProfitLoss = '+13.1%';
  const totalAssets = '5';
  
  return (
    <Layout>
      <PageContainer 
        title="Crypto Portfolio" 
        subtitle="Manage your cryptocurrency investments"
        icon={<FaCoins size={20} />}
      >
        <div className="flex justify-end mb-6">
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] rounded-xl text-black font-medium text-sm">
            <FaPlus size={14} className="mr-2" />
            <span>Add Crypto</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Portfolio Value" 
            value={totalValue} 
            icon={<FaCoins size={16} />} 
            trend="up" 
            trendValue="5.3%"
            bgClass="bg-gradient-to-r from-[#131313] to-[#1a1a1a]"
          />
          <StatCard 
            title="Total Profit/Loss" 
            value={totalProfitLoss} 
            icon={<FaArrowUp size={16} />} 
            trend="up" 
            trendValue={percentageProfitLoss}
          />
          <StatCard 
            title="Bitcoin Dominance" 
            value="57%" 
            icon={<FaBitcoin size={16} />} 
            trend="up" 
            trendValue="2.1%"
          />
          <StatCard 
            title="Assets" 
            value={totalAssets} 
            icon={<FaCoins size={16} />} 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Portfolio Performance"
              subtitle="30-day value change"
              height="h-80"
            />
          </div>
          <div>
            <ChartCard 
              title="Asset Allocation"
              subtitle="By cryptocurrency"
              height="h-80"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <DataTable
            title="Crypto Assets"
            subtitle="Your complete crypto portfolio"
            columns={cryptoColumns}
            data={cryptoData.map(item => ({
              ...item,
              // Add cell renderers
              asset: (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#181818] flex items-center justify-center mr-3">
                    <CryptoLogo symbol={item.symbol} />
                  </div>
                  <div>
                    <div className="font-medium">{item.asset}</div>
                    <div className="text-xs text-gray-500">{item.symbol}</div>
                  </div>
                </div>
              ),
              change: (
                <div className={item.changeType === 'up' ? 'text-green-500' : 'text-red-500'}>
                  <div className="flex items-center">
                    {item.changeType === 'up' ? <FaArrowUp size={10} className="mr-1" /> : <FaArrowDown size={10} className="mr-1" />}
                    {item.change}
                  </div>
                </div>
              )
            }))}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard 
            title="Price Alerts"
            subtitle="Set and monitor price targets"
          />
          <ChartCard 
            title="Transaction History"
            subtitle="Recent buys and sells"
          />
        </div>
      </PageContainer>
    </Layout>
  );
} 