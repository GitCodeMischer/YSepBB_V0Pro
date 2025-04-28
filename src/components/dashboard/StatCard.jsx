import React from 'react';

export default function StatCard({ title, value, icon, trend, trendValue, bgClass = "bg-[#131313]" }) {
  return (
    <div className={`p-6 rounded-2xl ${bgClass} border border-[#222]/40`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className="text-[#50E3C2] bg-[#50E3C2]/10 w-9 h-9 rounded-xl flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="mb-1">
        <h2 className="text-2xl font-bold text-white">{value}</h2>
      </div>
      {trend && (
        <div className={`flex items-center text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          <span className="mr-1">
            {trend === 'up' ? '↑' : '↓'}
          </span>
          <span>{trendValue}</span>
          <span className="ml-1 text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
} 