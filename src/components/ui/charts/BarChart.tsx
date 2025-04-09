import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BaseChartWrapper, NoDataDisplay } from './BaseChart';

interface ChartData {
  [key: string]: string | number;
}

interface BarChartProps {
  data: ChartData[];
  xField: string;
  yFields: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  title?: string;
  className?: string;
  height?: number | string;
  width?: number | string;
}

export const BarChart = ({
  data,
  title,
  xField,
  yFields,
  className,
  height = '64',
  width = 'full',
  showLegend = true,
  showGrid = true,
  showTooltip = true,
}: BarChartProps): JSX.Element => {
  // Early return if no data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <BaseChartWrapper title={title} className={className} height={height} width={width}>
        <NoDataDisplay />
      </BaseChartWrapper>
    );
  }

  return (
    <BaseChartWrapper title={title} className={className} height={height} width={width}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis 
            dataKey={xField} 
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis />
          {showTooltip && <Tooltip />}
          {showLegend && yFields.length > 1 && <Legend />}
          {yFields.map((field, index) => (
            <Bar
              key={field}
              dataKey={field}
              fill="#DC2626" // Using red color to match the image
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </BaseChartWrapper>
  );
}; 