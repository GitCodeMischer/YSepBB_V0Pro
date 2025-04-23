'use client';

import dynamic from 'next/dynamic';

/**
 * Dynamic imports for Recharts components to avoid SSR issues with useLayoutEffect
 * This ensures the components are only loaded on the client side
 */

// Core components
export const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
export const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
export const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
export const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
export const RadarChart = dynamic(() => import('recharts').then(mod => mod.RadarChart), { ssr: false });
export const ScatterChart = dynamic(() => import('recharts').then(mod => mod.ScatterChart), { ssr: false });
export const ComposedChart = dynamic(() => import('recharts').then(mod => mod.ComposedChart), { ssr: false });

// Chart elements
export const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
export const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
export const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
export const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
export const Radar = dynamic(() => import('recharts').then(mod => mod.Radar), { ssr: false });
export const Scatter = dynamic(() => import('recharts').then(mod => mod.Scatter), { ssr: false });

// Customization components
export const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
export const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
export const ZAxis = dynamic(() => import('recharts').then(mod => mod.ZAxis), { ssr: false });
export const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
export const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
export const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });
export const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
export const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });
export const PolarGrid = dynamic(() => import('recharts').then(mod => mod.PolarGrid), { ssr: false });
export const PolarAngleAxis = dynamic(() => import('recharts').then(mod => mod.PolarAngleAxis), { ssr: false });
export const PolarRadiusAxis = dynamic(() => import('recharts').then(mod => mod.PolarRadiusAxis), { ssr: false }); 