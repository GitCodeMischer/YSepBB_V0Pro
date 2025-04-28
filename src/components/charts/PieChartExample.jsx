'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from '@/components/charts/PatchedRecharts';

const data = [
  { name: 'Housing', value: 1200 },
  { name: 'Food', value: 600 },
  { name: 'Transportation', value: 400 },
  { name: 'Entertainment', value: 300 },
  { name: 'Utilities', value: 250 },
  { name: 'Healthcare', value: 200 },
];

const COLORS = ['#50E3C2', '#8884d8', '#FFBB28', '#FF8042', '#0088FE', '#00C49F'];

export default function PieChartExample() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`$${value}`, 'Amount']}
          contentStyle={{
            backgroundColor: '#121212',
            borderColor: '#333',
            color: '#fff',
          }}
        />
        <Legend 
          layout="vertical" 
          verticalAlign="middle" 
          align="right"
          wrapperStyle={{
            paddingLeft: 20,
            color: '#ccc' 
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
} 