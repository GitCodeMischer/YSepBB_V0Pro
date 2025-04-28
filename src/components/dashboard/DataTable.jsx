import React from 'react';

export default function DataTable({ title, subtitle, columns, data, showActionButtons = true }) {
  // If no data is provided, use empty array
  const tableData = data || [];
  
  return (
    <div className="bg-[#131313] rounded-2xl border border-[#222]/40 overflow-hidden w-full">
      <div className="p-6">
        <h3 className="text-white font-medium">{title}</h3>
        {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#222]/60">
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {showActionButtons && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222]/40">
            {tableData.length > 0 ? (
              tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-[#1a1a1a] transition-colors">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {row[column.accessor]}
                    </td>
                  ))}
                  {showActionButtons && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-[#50E3C2] hover:text-[#3CCEA7] font-medium mx-2">
                        Edit
                      </button>
                      <button className="text-red-400 hover:text-red-500 font-medium mx-2">
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={showActionButtons ? columns.length + 1 : columns.length} 
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 