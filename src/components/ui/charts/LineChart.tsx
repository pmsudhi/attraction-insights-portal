import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CartesianChartProps } from './types';
import { BaseChartWrapper, NoDataDisplay } from './BaseChart';
import { transformChartData, getDataFields } from './utils';

type ChartColors = {
  [key: string]: string;
  attendance: string;
  revenue: string;
  breakEvenThreshold: string;
  default: string;
};

export const LineChart: React.FC<CartesianChartProps> = ({
  data,
  title,
  xField = 'label',
  yFields = ['value'],
  className,
  height = '64',
  width = 'full',
  showLegend = true,
  showGrid = true,
  showTooltip = true,
}): JSX.Element => {
  // Transform data and get fields
  const transformedData = React.useMemo(
    () => transformChartData(data, xField, yFields),
    [data, xField, yFields]
  );

  const dataFields = React.useMemo(
    () => getDataFields(data, yFields),
    [data, yFields]
  );

  // Early return if no data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <BaseChartWrapper title={title} className={className} height={height} width={width}>
        <NoDataDisplay />
      </BaseChartWrapper>
    );
  }

  // Define chart colors and styles
  const colors: ChartColors = {
    attendance: "#3B82F6", // Blue for attendance
    revenue: "#10B981", // Green for revenue
    breakEvenThreshold: "#DC2626", // Red for break-even threshold
    default: "#6366F1" // Default color
  };

  const getLineStyle = (field: string) => ({
    stroke: colors[field] || colors.default,
    strokeWidth: 2,
    strokeDasharray: field === 'breakEvenThreshold' ? '5 5' : undefined,
  });

  const formatYAxisTick = (value: number, field: string) => {
    if (field === 'revenue') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 1
      }).format(value);
    }
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  const formatTooltip = (value: number, name: string) => {
    if (name === 'revenue') {
      return [
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value),
        'Revenue'
      ];
    }
    if (name === 'breakEvenThreshold') {
      return [
        new Intl.NumberFormat('en-US').format(value),
        'Break-Even Point'
      ];
    }
    return [
      new Intl.NumberFormat('en-US').format(value),
      'Attendance'
    ];
  };

  // Safely check if fields exist in yFields array
  const hasRevenue = Array.isArray(yFields) && yFields.includes('revenue');
  const hasBreakEven = Array.isArray(yFields) && yFields.includes('breakEvenThreshold');

  return (
    <BaseChartWrapper title={title} className={className} height={height} width={width}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart 
          data={transformedData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
          <XAxis
            dataKey={xField}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <YAxis
            yAxisId="left"
            tickFormatter={(value) => formatYAxisTick(value, 'attendance')}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            label={{ value: "Attendance", angle: -90, position: 'insideLeft' }}
          />
          {hasRevenue && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => formatYAxisTick(value, 'revenue')}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              label={{ value: "Revenue", angle: 90, position: 'insideRight' }}
            />
          )}
          {showTooltip && (
            <Tooltip
              formatter={formatTooltip}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                padding: '8px'
              }}
            />
          )}
          {showLegend && dataFields.length > 1 && (
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => {
                if (value === 'breakEvenThreshold') return 'Break-Even Point';
                return value.charAt(0).toUpperCase() + value.slice(1);
              }}
            />
          )}
          {dataFields.map((field) => (
            <Line
              key={field}
              type="monotone"
              dataKey={field}
              name={field}
              yAxisId={field === 'revenue' ? 'right' : 'left'}
              dot={false}
              activeDot={{ r: 6, fill: colors[field] || colors.default }}
              {...getLineStyle(field)}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </BaseChartWrapper>
  );
}; 