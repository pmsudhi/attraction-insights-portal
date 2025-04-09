import React from 'react';
import { Card, CardContent } from '../Card';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type SimpleDataFormat = Array<{
  label: string;
  value: number;
}>;

type ComplexDataFormat = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
  }>;
};

type LegacyDataFormat = Array<{
  [key: string]: string | number;
}>;

interface BarChartProps {
  data: SimpleDataFormat | ComplexDataFormat | LegacyDataFormat;
  title?: string;
  xField: string;
  yFields: string[];
}

// Type guard to check if data is in ComplexDataFormat
const isComplexDataFormat = (data: unknown): data is ComplexDataFormat => {
  try {
    const typedData = data as ComplexDataFormat;
    return Boolean(data && 
      typeof data === 'object' && 
      !Array.isArray(data) && 
      Array.isArray(typedData.labels) && 
      Array.isArray(typedData.datasets));
  } catch {
    return false;
  }
};

// Type guard to check if data is in SimpleDataFormat
const isSimpleDataFormat = (data: unknown): data is SimpleDataFormat => {
  try {
    return Array.isArray(data) && 
      data.length > 0 && 
      typeof data[0] === 'object' &&
      data[0] !== null &&
      'label' in data[0] && 
      'value' in data[0];
  } catch {
    return false;
  }
};

export const BarChart: React.FC<BarChartProps> = ({ data, title, xField, yFields }): JSX.Element => {
  // Transform data based on format
  const transformedData = React.useMemo(() => {
    try {
      if (!data || (Array.isArray(data) && data.length === 0)) {
        return [];
      }

      if (isSimpleDataFormat(data)) {
        return data;
      }

      if (isComplexDataFormat(data)) {
        return data.labels.map((label, index) => ({
          label,
          ...data.datasets.reduce((acc, dataset) => ({
            ...acc,
            [dataset.label]: dataset.data[index]
          }), {})
        }));
      }

      // Legacy format - use as is with xField/yFields
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }, [data]);

  // Determine which fields to use for bars
  const barFields = React.useMemo(() => {
    try {
      if (!data || (Array.isArray(data) && data.length === 0)) {
        return yFields;
      }

      if (isSimpleDataFormat(data)) {
        return ['value'];
      }

      if (isComplexDataFormat(data)) {
        return data.datasets.map(ds => ds.label);
      }

      return yFields;
    } catch {
      return yFields;
    }
  }, [data, yFields]);

  if (!data || transformedData.length === 0) {
    return (
      <Card>
        <CardContent>
          {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
          <div className="w-full h-64 flex items-center justify-center text-gray-500">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xField} />
              <YAxis />
              <Tooltip />
              {barFields.length > 1 && <Legend />}
              {barFields.map((field, index) => (
                <Bar
                  key={field}
                  dataKey={field}
                  fill={`hsl(${index * (360 / barFields.length)}, 70%, 50%)`}
                />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}; 