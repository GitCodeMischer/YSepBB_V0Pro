import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const ProgressCard = ({ 
  title, 
  description, 
  category, 
  currentAmount, 
  targetAmount, 
  deadline, 
  progress, 
  color = 'blue', 
  actions = [] 
}) => {
  // Map color prop to tailwind color classes
  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    pink: 'bg-pink-500',
    teal: 'bg-teal-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
  };

  const bgColor = colorMap[color] || 'bg-blue-500';
  
  return (
    <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl overflow-hidden shadow-lg relative">
      {/* Category label */}
      <div className={`absolute top-4 right-4 ${bgColor} px-2 py-1 rounded-md text-xs font-medium text-white`}>
        {category}
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        
        {/* Progress bar */}
        <div className="w-full h-3 bg-[#2A2A2A] rounded-full mb-4 overflow-hidden">
          <div 
            className={`h-full ${bgColor} rounded-full`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-400">Progress: <span className="text-white font-medium">{progress}%</span></span>
          <span className="text-sm text-gray-400">Deadline: <span className="text-white font-medium">{deadline}</span></span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-400">Saved</p>
            <p className="text-lg font-medium text-white">${currentAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 text-right">Target</p>
            <p className="text-lg font-medium text-white">${targetAmount.toLocaleString()}</p>
          </div>
        </div>
        
        {/* Actions dropdown */}
        {actions.length > 0 && (
          <div className="relative group">
            <button className="w-full bg-[#2A2A2A] hover:bg-[#333333] text-white text-sm px-4 py-2 rounded-lg flex items-center justify-center">
              Actions <FaChevronDown className="ml-2" size={12} />
            </button>
            <div className="absolute right-0 mt-2 w-full bg-[#2A2A2A] border border-[#333333] rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
              {actions.map((action, index) => (
                <button 
                  key={index}
                  className="w-full px-4 py-2 text-left text-sm text-white hover:bg-[#333333] flex items-center"
                >
                  <span className="mr-2">{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressCard; 