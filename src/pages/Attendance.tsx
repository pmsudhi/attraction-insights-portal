
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/dashboard/StatCard';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import { TabView, TabItem } from '@/components/ui/tab-view';
import { Users, ArrowUpRight, CalendarDays, Ticket, UserCheck } from 'lucide-react';

// Mock data
const dailyAttendanceData = [
  { day: 'Mon', adults: 12400, children: 8200, seniors: 1800 },
  { day: 'Tue', adults: 10200, children: 6800, seniors: 1500 },
  { day: 'Wed', adults: 11500, children: 7900, seniors: 1700 },
  { day: 'Thu', adults: 13800, children: 9300, seniors: 2100 },
  { day: 'Fri', adults: 18500, children: 12400, seniors: 2800 },
  { day: 'Sat', adults: 25600, children: 18200, seniors: 3900 },
  { day: 'Sun', adults: 23400, children: 16800, seniors: 3500 },
];

const monthlyAttendanceData = [
  { month: 'Jan', total: 520000, lastYear: 480000 },
  { month: 'Feb', total: 480000, lastYear: 450000 },
  { month: 'Mar', total: 580000, lastYear: 520000 },
  { month: 'Apr', total: 680000, lastYear: 600000 },
  { month: 'May', total: 780000, lastYear: 720000 },
  { month: 'Jun', total: 950000, lastYear: 880000 },
];

const visitorTypeData = [
  { name: 'Regular Tickets', value: 45, color: '#00B0DF' },
  { name: 'Annual Pass', value: 25, color: '#33C0E5' },
  { name: 'Promotional', value: 20, color: '#66D0EC' },
  { name: 'Special Events', value: 10, color: '#99E0F2' },
];

const nationalityData = [
  { name: 'Domestic', value: 65, color: '#00B0DF' },
  { name: 'International', value: 35, color: '#33C0E5' },
];

const hourlyTraffic = [
  { time: '9AM', visitors: 1200 },
  { time: '10AM', visitors: 2800 },
  { time: '11AM', visitors: 3900 },
  { time: '12PM', visitors: 4100 },
  { time: '1PM', visitors: 3800 },
  { time: '2PM', visitors: 4200 },
  { time: '3PM', visitors: 3600 },
  { time: '4PM', visitors: 3100 },
  { time: '5PM', visitors: 2500 },
  { time: '6PM', visitors: 2000 },
  { time: '7PM', visitors: 3500 },
  { time: '8PM', visitors: 5200 },
  { time: '9PM', visitors: 3800 },
];

const Attendance = () => {
  const attendanceTabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Daily Attendance"
              value="28,450"
              change={5.2}
              icon={<Users className="h-5 w-5" />}
            />
            <StatCard
              title="Weekly Total"
              value="195,620"
              change={3.8}
              icon={<ArrowUpRight className="h-5 w-5" />}
            />
            <StatCard
              title="Monthly YTD"
              value="2.4M"
              change={7.5}
              icon={<CalendarDays className="h-5 w-5" />}
            />
            <StatCard
              title="Peak Capacity"
              value="82%"
              change={4.1}
              icon={<UserCheck className="h-5 w-5" />}
            />
          </div>
          
          <LineChart
            title="Monthly Attendance Comparison"
            data={monthlyAttendanceData}
            dataKeys={[
              { key: 'total', color: '#00B0DF' },
              { key: 'lastYear', color: '#99E0F2' }
            ]}
            xAxisDataKey="month"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PieChart
              title="Visitor Type Distribution"
              data={visitorTypeData}
            />
            <PieChart
              title="Visitor Origin"
              data={nationalityData}
            />
          </div>
        </div>
      )
    },
    {
      id: 'daily',
      label: 'Daily Analysis',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Today's Gate Entries"
              value="28,450"
              change={5.2}
              icon={<Ticket className="h-5 w-5" />}
            />
            <StatCard
              title="Avg. Visit Duration"
              value="6.2 hrs"
              change={0.4}
              icon={<CalendarDays className="h-5 w-5" />}
            />
            <StatCard
              title="Re-Entry Rate"
              value="18%"
              change={-2.5}
              icon={<ArrowUpRight className="h-5 w-5" />}
            />
          </div>
          
          <BarChart
            title="Daily Attendance by Visitor Type"
            data={dailyAttendanceData}
            dataKeys={[
              { key: 'adults', color: '#00B0DF' },
              { key: 'children', color: '#33C0E5' },
              { key: 'seniors', color: '#66D0EC' }
            ]}
            xAxisDataKey="day"
          />
          
          <LineChart
            title="Hourly Visitor Traffic"
            data={hourlyTraffic}
            dataKeys={[
              { key: 'visitors', color: '#00B0DF' }
            ]}
            xAxisDataKey="time"
          />
        </div>
      )
    }
  ];
  
  return (
    <DashboardLayout>
      <PageHeader 
        title="Attendance Analytics" 
        description="Detailed analysis of visitor attendance patterns"
      />
      
      <div className="space-y-8">
        <TabView tabs={attendanceTabs} />
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
