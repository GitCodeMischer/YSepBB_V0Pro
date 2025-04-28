'use client';

import dynamic from 'next/dynamic';

// Don't initialize recharts on the server side since it relies on window
const NoSSR = ({ children }) => <>{children}</>;
export const NoSSRWrapper = dynamic(() => Promise.resolve(NoSSR), { ssr: false });

/**
 * Patched dynamic imports for Recharts components
 * This approach ensures they only load on the client side
 * and avoids SSR issues with useLayoutEffect
 */

// Properly import with correct options to avoid SSR issues
const createDynamicComponent = (componentName) => {
  return dynamic(
    () => import('recharts').then((recharts) => {
      return {
        default: (props) => {
          const Component = recharts[componentName];
          return (
            <NoSSRWrapper>
              <Component {...props} />
            </NoSSRWrapper>
          );
        }
      };
    }),
    { ssr: false }
  );
};

// Core components with proper client-side only loading
export const LineChart = createDynamicComponent('LineChart');
export const BarChart = createDynamicComponent('BarChart');
export const AreaChart = createDynamicComponent('AreaChart');
export const PieChart = createDynamicComponent('PieChart');
export const RadarChart = createDynamicComponent('RadarChart');
export const ScatterChart = createDynamicComponent('ScatterChart');
export const ComposedChart = createDynamicComponent('ComposedChart');

// Chart elements
export const Line = createDynamicComponent('Line');
export const Bar = createDynamicComponent('Bar');
export const Area = createDynamicComponent('Area');
export const Pie = createDynamicComponent('Pie');
export const Radar = createDynamicComponent('Radar');
export const Scatter = createDynamicComponent('Scatter');

// Customization components
export const XAxis = createDynamicComponent('XAxis');
export const YAxis = createDynamicComponent('YAxis');
export const ZAxis = createDynamicComponent('ZAxis');
export const CartesianGrid = createDynamicComponent('CartesianGrid');
export const Tooltip = createDynamicComponent('Tooltip');
export const Legend = createDynamicComponent('Legend');
export const ResponsiveContainer = createDynamicComponent('ResponsiveContainer');
export const Cell = createDynamicComponent('Cell');
export const PolarGrid = createDynamicComponent('PolarGrid');
export const PolarAngleAxis = createDynamicComponent('PolarAngleAxis');
export const PolarRadiusAxis = createDynamicComponent('PolarRadiusAxis'); 