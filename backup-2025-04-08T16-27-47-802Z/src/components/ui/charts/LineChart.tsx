import React from 'react';
import { Card, CardContent } from '../Card';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

interface LineChartProps {
  data: SimpleDataFormat | ComplexDataFormat | LegacyDataFormat;
  title?: string;
  xField: string;
  yField?: string;
  yFields: string[];
}

// Type guard to check if data is in ComplexDataFormat
const isComplexDataFormat = (data: unknown): data is ComplexDataFormat => {
  const typedData = data as ComplexDataFormat;
  return Boolean(!Array.isArray(data) && 'labels' in typedData && 'datasets' in typedData);
};

export const LineChart: React.FC<LineChartProps> = ({ data, title, xField, yField, yFields }): JSX.Element => {
  // Handle legacy format with single y-field
  if (xField && yField && Array.isArray(data)) {
    return (
      <Card>
        <CardContent>
          {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xField} />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone"
                  dataKey={yField}
                  stroke={`hsl(200, 70%, 50%)`}
                  dot={false}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle legacy format with multiple y-fields
  if (xField && yFields && Array.isArray(data)) {
    return (
      <Card>
        <CardContent>
          {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xField} />
                <YAxis />
                <Tooltip />
                <Legend />
                {yFields.map((field, index) => (
                  <Line
                    key={field}
                    type="monotone" 
                    dataKey={field}
                    stroke={`hsl(${index * (360 / yFields.length)}, 70%, 50%)`}
                    dot={false}
                  />
                ))}
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Transform data if needed
  const transformedData = Array.isArray(data)
    ? data // Simple format, already in correct shape
    : data.labels.map((label, index) => ({
        label,
        ...data.datasets.reduce((acc, dataset) => ({
          ...acc,
          [dataset.label]: dataset.data[index]
        }), {})
      }));

  // Get data keys for complex format
  const dataKeys = Array.isArray(data)
    ? ['value']
    : data.datasets.map(ds => ds.label);

  return (
    <Card>
      <CardContent>
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              {dataKeys.length > 1 && <Legend />}
              {dataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone" 
                  dataKey={key}
                  stroke={`hsl(${index * (360 / dataKeys.length)}, 70%, 50%)`}
                  dot={false}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}; 