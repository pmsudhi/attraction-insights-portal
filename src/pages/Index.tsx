
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/dashboard/StatCard';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import SmallDataTable from '@/components/dashboard/SmallDataTable';
import { TabView, TabItem } from '@/components/ui/tab-view';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  Star, 
  Ticket,
  CalendarDays,
  Download,
  Calendar,
  TrendingUp 
} from 'lucide-react';

// Mock data
const attendanceData = [
  { month: 'Jan', visitors: 45000, forecast: 40000 },
  { month: 'Feb', visitors: 42000, forecast: 38000 },
  { month: 'Mar', visitors: 50000, forecast: 45000 },
  { month: 'Apr', visitors: 65000, forecast: 60000 },
  { month: 'May', visitors: 78000, forecast: 75000 },
  { month: 'Jun', visitors: 95000, forecast: 90000 },
  { month: 'Jul', visitors: 120000, forecast: 110000 },
];

const revenueByCategory = [
  { name: 'Tickets', value: 65, color: '#00B0DF' },
  { name: 'Food & Beverage', value: 20, color: '#33C0E5' },
  { name: 'Merchandise', value: 10, color: '#66D0EC' },
  { name: 'Hotels', value: 5, color: '#99E0F2' }
];

const parkPerformance = [
  { 
    park: 'Fantasy Kingdom', 
    attendance: '12,450', 
    change: '+5.2%',
    revenue: '$1.24M', 
    satisfaction: 4.8
  },
  { 
    park: 'Adventure Land', 
    attendance: '10,280', 
    change: '+3.1%',
    revenue: '$980K', 
    satisfaction: 4.6
  },
  { 
    park: 'Space Odyssey', 
    attendance: '8,720', 
    change: '-2.3%',
    revenue: '$840K', 
    satisfaction: 4.2
  },
  { 
    park: 'Water World', 
    attendance: '15,630', 
    change: '+8.7%',
    revenue: '$1.52M', 
    satisfaction: 4.9
  }
];

const operationsData = [
  { month: 'Jan', rides: 98.2, dining: 95.6, hotels: 99.1 },
  { month: 'Feb', rides: 97.8, dining: 96.3, hotels: 98.9 },
  { month: 'Mar', rides: 96.5, dining: 97.2, hotels: 99.0 },
  { month: 'Apr', rides: 95.8, dining: 98.1, hotels: 98.7 },
  { month: 'May', rides: 97.3, dining: 97.8, hotels: 98.5 },
  { month: 'Jun', rides: 93.5, dining: 96.5, hotels: 98.8 },
];

const Index = () => {
  const [dateRange, setDateRange] = useState('monthly');
  
  // Tab content for the main dashboard
  const overviewTabs: TabItem[] = [
    {
      id: 'performance',
      label: 'Performance',
      icon: <TrendingUp className="h-4 w-4" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Attendance"
            value="2.4M"
            change={8.2}
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Revenue"
            value="$245.8M"
            change={12.5}
            icon={<DollarSign className="h-5 w-5" />}
          />
          <StatCard
            title="Guest Satisfaction"
            value="4.8/5.0"
            change={3.2}
            icon={<Star className="h-5 w-5" />}
          />
          <StatCard
            title="Advance Bookings"
            value="185K"
            change={-2.1}
            icon={<Ticket className="h-5 w-5" />}
          />
          
          <LineChart
            title="Visitor Attendance Trends"
            data={attendanceData}
            dataKeys={[
              { key: 'visitors', color: '#00B0DF' },
              { key: 'forecast', color: '#99E0F2' }
            ]}
            xAxisDataKey="month"
            className="col-span-1 md:col-span-2"
          />
          
          <PieChart
            title="Revenue by Category"
            data={revenueByCategory}
            className="col-span-1 md:col-span-2"
          />
          
          <SmallDataTable
            title="Park Performance"
            columns={[
              { key: 'park', title: 'Park' },
              { key: 'attendance', title: 'Visitors', className: 'text-right' },
              { key: 'revenue', title: 'Revenue', className: 'text-right' },
              { 
                key: 'satisfaction', 
                title: 'Rating',
                className: 'text-right',
                render: (value) => (
                  <div className="flex justify-end items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{value}</span>
                  </div>
                )
              }
            ]}
            data={parkPerformance}
            className="col-span-1 md:col-span-4"
          />
        </div>
      )
    },
    {
      id: 'operations',
      label: 'Operations',
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Ride Uptime"
            value="96.8%"
            change={2.1}
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <StatCard
            title="Staff Present"
            value="1,245"
            change={-1.2}
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Wait Time Avg"
            value="24 min"
            change={-8.5}
            icon={<CalendarDays className="h-5 w-5" />}
          />
          <StatCard
            title="Show Attendance"
            value="87.2%"
            change={5.4}
            icon={<Ticket className="h-5 w-5" />}
          />
          
          <BarChart
            title="Operational Efficiency by Department (%)"
            data={operationsData}
            dataKeys={[
              { key: 'rides', color: '#00B0DF' },
              { key: 'dining', color: '#33C0E5' },
              { key: 'hotels', color: '#66D0EC' }
            ]}
            xAxisDataKey="month"
            className="col-span-1 md:col-span-4"
          />
        </div>
      )
    }
  ];

  return (
    <DashboardLayout>
      <PageHeader 
        title="Executive Dashboard" 
        description="Key metrics and insights for Magic World Parks"
        actions={
          <>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <div className="bg-secondary rounded-md p-0.5 flex">
              <Button 
                variant={dateRange === 'weekly' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setDateRange('weekly')}
                className="text-xs"
              >
                Week
              </Button>
              <Button 
                variant={dateRange === 'monthly' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setDateRange('monthly')}
                className="text-xs"
              >
                Month
              </Button>
              <Button 
                variant={dateRange === 'yearly' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setDateRange('yearly')}
                className="text-xs"
              >
                Year
              </Button>
            </div>
          </>
        }
      />
      
      <div className="space-y-8">
        <TabView tabs={overviewTabs} />
      </div>
    </DashboardLayout>
  );
};

export default Index;
