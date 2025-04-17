import React from 'react';

const StatCard = ({ title, value, icon, change, bgColor = 'bg-blue-500/10', textColor = 'text-blue-500', iconColor = 'text-blue-500' }) => {
  return (
    <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl overflow-hidden shadow-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-semibold text-white">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-2">
              <span className={change.type === 'increase' ? 'text-green-500' : 'text-red-500'}>
                {change.type === 'increase' ? '+' : ''}{change.value}%
              </span>
              <span className="text-xs text-gray-400 ml-2">vs. last period</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <span className={`text-xl ${iconColor}`}>{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard; 