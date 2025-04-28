'use client';

import React from 'react';
import SafeHydration from '@/utils/SafeHydration';

export default function ChartCard({ title, subtitle, children, height = "h-64" }) {
  return (
    <div className="bg-[#131313] rounded-2xl border border-[#222]/40 overflow-hidden">
      <div className="p-6">
        <h3 className="text-white font-medium">{title}</h3>
        {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
      </div>
      
      <div className={`${height} px-6 pb-6`}>
        <SafeHydration
          fallback={
            <div className="w-full h-full bg-[#0c0c0c] rounded-xl flex items-center justify-center animate-pulse">
              <div className="text-center">
                <div className="inline-block w-12 h-12 bg-[#181818] rounded-full mb-3 flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-[#50E3C2] opacity-50" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" 
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Loading chart data...</p>
              </div>
            </div>
          }
        >
          {children ? (
            children
          ) : (
            <div className="w-full h-full bg-[#0c0c0c] rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block w-12 h-12 bg-[#181818] rounded-full mb-3 flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-[#50E3C2]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" 
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Chart visualization will appear here</p>
              </div>
            </div>
          )}
        </SafeHydration>
      </div>
    </div>
  );
} 