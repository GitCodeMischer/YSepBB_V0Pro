import React from 'react';

export default function PageContainer({ title, subtitle, icon, children }) {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center mb-6">
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-[#131313] flex items-center justify-center mr-4 text-[#50E3C2]">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
} 