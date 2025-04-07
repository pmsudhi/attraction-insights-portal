
import { 
  ResponsiveContainer, 
  LineChart as RechartLineChart,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LineChartProps {
  title: string;
  data: any[];
  dataKeys: { key: string, color: string }[];
  xAxisDataKey: string;
  className?: string;
}

const LineChart = ({ title, data, dataKeys, xAxisDataKey, className }: LineChartProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartLineChart
              data={data}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis 
                dataKey={xAxisDataKey} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }} 
                width={40}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  border: 'none',
                }} 
              />
              <Legend />
              {dataKeys.map((item) => (
                <Line 
                  key={item.key}
                  type="monotone" 
                  dataKey={item.key} 
                  stroke={item.color} 
                  strokeWidth={2}
                  dot={{ stroke: item.color, fill: 'white', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: item.color, strokeWidth: 2, fill: 'white' }}
                />
              ))}
            </RechartLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChart;
