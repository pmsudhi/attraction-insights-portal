
import { 
  ResponsiveContainer, 
  BarChart as RechartBarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BarChartProps {
  title: string;
  data: any[];
  dataKeys: { key: string, color: string }[];
  xAxisDataKey: string;
  className?: string;
}

const BarChart = ({ title, data, dataKeys, xAxisDataKey, className }: BarChartProps) => {
  return (
    <Card className={cn("animate-fade-in overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] animate-scale-in animate-delay-200">
          <ResponsiveContainer width="100%" height="100%">
            <RechartBarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
              {dataKeys.map((item, index) => (
                <Bar 
                  key={item.key}
                  dataKey={item.key} 
                  fill={item.color} 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1500}
                  animationBegin={index * 150}
                />
              ))}
            </RechartBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChart;
