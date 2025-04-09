import React from 'react';
import { Card, CardContent } from '../Card';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

interface PieChartProps {
  data: SimpleDataFormat | ComplexDataFormat | LegacyDataFormat;
  title?: string;
  labelField?: string;
  valueField?: string;
}

// Type guard to check if data is in ComplexDataFormat
const isComplexDataFormat = (data: unknown): data is ComplexDataFormat => {
  const typedData = data as ComplexDataFormat;
  return Boolean(!Array.isArray(data) && 'labels' in typedData && 'datasets' in typedData);
};

export const PieChart: React.FC<PieChartProps> = ({ data, title, labelField, valueField }): JSX.Element => {
  // Handle legacy format
  if (labelField && valueField && Array.isArray(data)) {
    return (
      <Card>
        <CardContent>
          {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={data}
                  dataKey={valueField}
                  nameKey={labelField}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`${entry[labelField]}-${index}`}
                      fill={`hsl(${index * (360 / data.length)}, 70%, 50%)`} 
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
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
        value: data.datasets[0].data[index] // For pie chart, we only use the first dataset
      }));

  return (
    <Card>
      <CardContent>
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={transformedData}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {transformedData.map((entry, index) => (
                  <Cell 
                    key={`${entry.label}-${index}`}
                    fill={`hsl(${index * (360 / transformedData.length)}, 70%, 50%)`} 
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}; 