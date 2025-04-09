import React from 'react';
import { Card, CardContent } from '../Card';
import { cn } from '@/lib/utils';

interface BaseChartWrapperProps {
  title?: string;
  className?: string;
  height?: number | string;
  width?: number | string;
  children: React.ReactNode;
}

export const BaseChartWrapper = ({
  title,
  className,
  height = '64',
  width = 'full',
  children
}: BaseChartWrapperProps): JSX.Element => {
  return (
    <Card className={className}>
      <CardContent>
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <div className={cn(`w-${width} h-${height}`)}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export const NoDataDisplay = ({ message = 'No data available' }: { message?: string }): JSX.Element => {
  return (
    <div className="w-full h-full flex items-center justify-center text-gray-500">
      {message}
    </div>
  );
}; 