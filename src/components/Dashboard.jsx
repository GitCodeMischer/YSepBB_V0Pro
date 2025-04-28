import React, { useState, useEffect } from 'react';
import Header from './Header';
import StakingCard from './StakingCard';
import StakeDetails from './StakeDetails';
import { 
  FaWallet, 
  FaChartPie, 
  FaArrowTrendUp, 
  FaArrowRightLong,
  FaCircleInfo,
  FaFire,
  FaPlus,
  FaLayerGroup,
  FaBolt,
  FaGem,
  FaChartLine,
  FaCircleChevronDown,
  FaFilter,
  FaAngleDown
} from 'react-icons/fa6';

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('7d');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Sample data for staking options
  const stakingOptions = [
    {
      id: 1,
      title: "Ethereum Staking",
      apy: "4.8%",
      description: "Earn passive income by delegating ETH to secure the network",
      stakedAmount: "$5,200",
      icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      performance: "+12.4%"
    },
    {
      id: 2,
      title: "BNB Chain",
      apy: "6.2%",
      description: "Stake BNB tokens and earn rewards from transaction fees",
      stakedAmount: "$3,450",
      icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
      performance: "+8.7%"
    },
    {
      id: 3,
      title: "Solana",
      apy: "7.5%",
      description: "Earn high yields through Solana's proof-of-stake mechanism",
      stakedAmount: "$2,100",
      icon: "https://cryptologos.cc/logos/solana-sol-logo.png",
      performance: "+15.2%"
    },
    {
      id: 4,
      title: "Cardano",
      apy: "5.4%",
      description: "Stake ADA and participate in network consensus",
      stakedAmount: "$1,850",
      icon: "https://cryptologos.cc/logos/cardano-ada-logo.png",
      performance: "+6.8%"
    }
  ];
  
  // Sample data for portfolio details
  const portfolioData = {
    totalValue: "$12,600",
    change: "+8.4%",
    totalRewards: "$842",
    rewardsChange: "+12.3%",
    monthlyYield: "$126",
    yieldChange: "+3.2%",
    yearlyProjection: "$1,512",
    projectionChange: "+5.9%"
  };
  
  // Sample chart data points
  const chartPoints = [
    { date: 'Jan', value: 3200 },
    { date: 'Feb', value: 3400 },
    { date: 'Mar', value: 3800 },
    { date: 'Apr', value: 3600 },
    { date: 'May', value: 4200 },
    { date: 'Jun', value: 4800 },
    { date: 'Jul', value: 5100 },
    { date: 'Aug', value: 4900 },
    { date: 'Sep', value: 5600 },
    { date: 'Oct', value: 6100 },
    { date: 'Nov', value: 6800 },
    { date: 'Dec', value: 7400 },
  ];
  
  // Simplified portfolio chart SVG path
  const chartPath = "M0,100 L20,80 L40,85 L60,70 L80,75 L100,60 L120,65 L140,50 L160,55 L180,45 L200,30 L220,35 L240,25 L260,15 L280,20 L300,10";
  
  return (
    <div className="w-full min-h-screen pt-16 pb-8 px-4 md:px-6">
      <main className="pb-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6">
          {/* Top Section with filters */}
          <section className="mb-4 sm:mb-6">
            <div className="flex flex-wrap justify-between items-center mb-4">
              <div>
                <h1 className="text-xl font-bold text-white mb-1">My Campaigns</h1>
                <p className="text-gray-500 text-sm">2 products and 10 promotional have access</p>
              </div>
              
              <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                <div className="flex items-center">
                  <button className="flex items-center px-3 py-1.5 bg-[#0A0A0A] rounded-md text-gray-300 hover:bg-[#0A0A0A]/80 transition-all">
                    <span className="font-medium text-sm">Finance</span>
                    <FaAngleDown className="ml-2 text-gray-500" size={12} />
                  </button>
                </div>
                
                <button className="flex items-center px-3 py-1.5 bg-[#0A0A0A] rounded-md text-gray-300 hover:bg-[#0A0A0A]/80 transition-all">
                  <span className="font-medium text-sm">Next</span>
                  <FaArrowRightLong className="ml-2" size={12} />
                </button>
              </div>
            </div>
            
            {/* Balance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="card md:col-span-3">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Total Balance</div>
                    <div className="flex items-baseline">
                      <div className="text-3xl font-bold text-white mr-2">$23,094.57</div>
                      <div className="text-[#50E3C2] text-sm font-medium">+3.7%</div>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>Today's change:</span>
                      <span className="text-[#50E3C2] ml-1 font-medium">+$480.10</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="px-3 py-1.5 bg-[#0A0A0A] rounded-md text-gray-300 text-sm">
                      <span>Just for today!</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4 mb-4 pb-2">
                  <button className={`text-xs font-medium px-2 py-1 rounded-md ${timeframe === '24h' ? 'bg-[#0A0A0A] text-white' : 'text-gray-500 hover:text-white'}`}
                    onClick={() => setTimeframe('24h')}>
                    24h
                  </button>
                  <button className={`text-xs font-medium px-2 py-1 rounded-md ${timeframe === 'Week' ? 'bg-[#0A0A0A] text-white' : 'text-gray-500 hover:text-white'}`}
                    onClick={() => setTimeframe('Week')}>
                    Week
                  </button>
                  <button className={`text-xs font-medium px-2 py-1 rounded-md ${timeframe === 'Month' ? 'bg-[#0A0A0A] text-white' : 'text-gray-500 hover:text-white'}`}
                    onClick={() => setTimeframe('Month')}>
                    Month
                  </button>
                </div>
                
                <div className="h-40 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <path d={chartPath} stroke="#50E3C2" strokeWidth="2" fill="none" />
                    <path d={chartPath + " L300,100 L0,100"} fill="url(#portfolioGradient)" opacity="0.1" />
                    <defs>
                      <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#50E3C2" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#50E3C2" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                <div className="pt-2 flex justify-between text-xs text-gray-500">
                  <div>Mar 8</div>
                  <div>Mar 15</div>
                  <div>Mar 22</div>
                  <div>Mar 29</div>
                  <div>Apr 5</div>
                </div>
              </div>
              
              <div className="card md:col-span-2 relative transition-all duration-300 ease-in-out transform hover:shadow-lg hover:translate-y-[-4px] hover:scale-[1.02] cursor-pointer">
                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#50E3C2] opacity-3 rounded-full blur-[100px] z-0 transition-all duration-500 ease-in-out group-hover:opacity-5"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-9 h-9 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 hover:scale-110 shadow-md shadow-blue-500/20">
                        <FaFire className="text-white" size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">AI Assistant</div>
                        <div className="text-xs text-gray-500">Is updating the balance amount now...</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center h-36 mb-2 transition-all duration-300">
                    <img 
                      src="https://tailwindui.com/img/component-images/project-app-screenshot.png" 
                      alt="AI visualization" 
                      className="h-full object-contain max-w-full transform transition-all duration-500 ease-in-out hover:scale-105" 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Popular Campaigns */}
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <h2 className="text-lg font-medium text-white">Popular Campaigns</h2>
                </div>
                
                <button className="flex items-center px-2 py-1 bg-[#0A0A0A] rounded-md text-gray-300 hover:bg-[#0A0A0A]/80 transition-all">
                  <span className="text-xs font-medium">25</span>
                  <span className="mx-1 text-gray-600">|</span>
                  <span className="text-xs">List</span>
                  <FaAngleDown className="ml-1 text-gray-500" size={10} />
                </button>
              </div>
              
              <div className="x-scrollable rounded-lg">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 border-b border-[#222]">
                      <th className="pb-3 font-medium">Rank</th>
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Admin</th>
                      <th className="pb-3 font-medium">Date Added</th>
                      <th className="pb-3 font-medium">Business</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Sample table rows */}
                    <tr className="border-b border-[#191919]">
                      <td className="py-3 font-medium text-white">01</td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-7 h-7 rounded-md bg-blue-500 flex items-center justify-center mr-2">
                            <FaChartLine size={12} className="text-white" />
                          </div>
                          <span className="text-white">Summer Campaign</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-400">Jamie Wilson</td>
                      <td className="py-3 text-gray-400">Apr 23, 2023</td>
                      <td className="py-3">
                        <span className="inline-block px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-md">Active</span>
                      </td>
                    </tr>
                    <tr className="border-b border-[#191919]">
                      <td className="py-3 font-medium text-white">02</td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-7 h-7 rounded-md bg-purple-500 flex items-center justify-center mr-2">
                            <FaGem size={12} className="text-white" />
                          </div>
                          <span className="text-white">Premium Launch</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-400">Sarah Johnson</td>
                      <td className="py-3 text-gray-400">Mar 15, 2023</td>
                      <td className="py-3">
                        <span className="inline-block px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-md">Planning</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 