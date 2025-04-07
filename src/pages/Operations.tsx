
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/dashboard/StatCard';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import SmallDataTable from '@/components/dashboard/SmallDataTable';
import { TabView, TabItem } from '@/components/ui/tab-view';
import { Clock, Activity, AlertTriangle, Users, Percent } from 'lucide-react';

// Mock data
const waitTimeData = [
  { time: '9AM', thrill: 10, family: 15, water: 8 },
  { time: '10AM', thrill: 15, family: 25, water: 12 },
  { time: '11AM', thrill: 25, family: 35, water: 18 },
  { time: '12PM', thrill: 40, family: 45, water: 25 },
  { time: '1PM', thrill: 45, family: 40, water: 30 },
  { time: '2PM', thrill: 35, family: 30, water: 28 },
  { time: '3PM', thrill: 30, family: 25, water: 22 },
  { time: '4PM', thrill: 28, family: 20, water: 18 },
  { time: '5PM', thrill: 25, family: 15, water: 15 },
  { time: '6PM', thrill: 20, family: 10, water: 12 },
  { time: '7PM', thrill: 15, family: 8, water: 10 },
  { time: '8PM', thrill: 10, family: 5, water: 5 },
];

const efficiencyData = [
  { month: 'Jan', rides: 94.2, staff: 95.6, maintenance: 98.1 },
  { month: 'Feb', rides: 93.8, staff: 96.3, maintenance: 97.9 },
  { month: 'Mar', rides: 96.5, staff: 97.2, maintenance: 99.0 },
  { month: 'Apr', rides: 95.8, staff: 98.1, maintenance: 98.7 },
  { month: 'May', rides: 97.3, staff: 97.8, maintenance: 98.5 },
  { month: 'Jun', rides: 95.5, staff: 98.5, maintenance: 99.2 },
];

const incidentData = [
  { 
    id: 'INC-2854',
    ride: 'Dragon Coaster', 
    type: 'Technical',
    duration: '45 min',
    impact: 'Moderate',
    date: '2 days ago'
  },
  { 
    id: 'INC-2853',
    ride: 'Water Rapids', 
    type: 'Weather',
    duration: '120 min',
    impact: 'High',
    date: '3 days ago'
  },
  { 
    id: 'INC-2852',
    ride: 'Fantasy Carousel', 
    type: 'Maintenance',
    duration: '30 min',
    impact: 'Low',
    date: '4 days ago'
  },
  { 
    id: 'INC-2851',
    ride: 'Space Station', 
    type: 'Technical',
    duration: '60 min',
    impact: 'Moderate',
    date: '5 days ago'
  },
  { 
    id: 'INC-2850',
    ride: 'Main Street Parade', 
    type: 'Weather',
    duration: '90 min',
    impact: 'High',
    date: '6 days ago'
  },
];

const staffingData = [
  { 
    department: 'Ride Operations', 
    scheduled: 245,
    present: 238,
    utilization: '97.1%',
    status: 'Optimal'
  },
  { 
    department: 'Food & Beverage', 
    scheduled: 180,
    present: 172,
    utilization: '95.6%',
    status: 'Optimal'
  },
  { 
    department: 'Retail & Merchandise', 
    scheduled: 120,
    present: 112,
    utilization: '93.3%',
    status: 'Adequate'
  },
  { 
    department: 'Entertainment', 
    scheduled: 85,
    present: 82,
    utilization: '96.5%',
    status: 'Optimal'
  },
  { 
    department: 'Guest Services', 
    scheduled: 65,
    present: 60,
    utilization: '92.3%',
    status: 'Adequate'
  },
];

const Operations = () => {
  const operationsTabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Average Wait Time"
              value="24 min"
              change={-8.5}
              icon={<Clock className="h-5 w-5" />}
            />
            <StatCard
              title="Ride Uptime"
              value="96.8%"
              change={2.1}
              icon={<Activity className="h-5 w-5" />}
            />
            <StatCard
              title="Incidents Today"
              value="3"
              change={-25}
              icon={<AlertTriangle className="h-5 w-5" />}
            />
            <StatCard
              title="Staff Present"
              value="1,245"
              change={-1.2}
              icon={<Users className="h-5 w-5" />}
            />
          </div>
          
          <LineChart
            title="Operational Efficiency by Department"
            data={efficiencyData}
            dataKeys={[
              { key: 'rides', color: '#00B0DF' },
              { key: 'staff', color: '#33C0E5' },
              { key: 'maintenance', color: '#66D0EC' }
            ]}
            xAxisDataKey="month"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SmallDataTable
              title="Recent Incidents"
              columns={[
                { key: 'id', title: 'ID' },
                { key: 'ride', title: 'Attraction' },
                { key: 'type', title: 'Type' },
                { 
                  key: 'impact', 
                  title: 'Impact',
                  render: (value) => {
                    const color = value === 'High' 
                      ? 'bg-red-100 text-red-700' 
                      : value === 'Moderate' 
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700';
                    
                    return (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                        {value}
                      </span>
                    );
                  }
                },
                { key: 'date', title: 'Date' }
              ]}
              data={incidentData.slice(0, 4)}
            />
            
            <SmallDataTable
              title="Staffing Today"
              columns={[
                { key: 'department', title: 'Department' },
                { key: 'present', title: 'Present', className: 'text-right' },
                { key: 'scheduled', title: 'Scheduled', className: 'text-right' },
                { 
                  key: 'status', 
                  title: 'Status',
                  render: (value) => {
                    const color = value === 'Optimal' 
                      ? 'bg-green-100 text-green-700' 
                      : value === 'Adequate' 
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700';
                    
                    return (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                        {value}
                      </span>
                    );
                  }
                }
              ]}
              data={staffingData.slice(0, 4)}
            />
          </div>
        </div>
      )
    },
    {
      id: 'wait-times',
      label: 'Wait Times',
      icon: <Clock className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Thrill Rides Avg"
              value="28 min"
              change={-5.2}
              icon={<Clock className="h-5 w-5" />}
            />
            <StatCard
              title="Family Rides Avg"
              value="22 min"
              change={-3.8}
              icon={<Clock className="h-5 w-5" />}
            />
            <StatCard
              title="Water Rides Avg"
              value="18 min"
              change={-10.5}
              icon={<Clock className="h-5 w-5" />}
            />
          </div>
          
          <LineChart
            title="Wait Times Throughout the Day (Minutes)"
            data={waitTimeData}
            dataKeys={[
              { key: 'thrill', color: '#00B0DF' },
              { key: 'family', color: '#33C0E5' },
              { key: 'water', color: '#66D0EC' }
            ]}
            xAxisDataKey="time"
          />
          
          <div className="grid grid-cols-1 gap-6">
            <SmallDataTable
              title="Staffing By Department"
              columns={[
                { key: 'department', title: 'Department' },
                { key: 'scheduled', title: 'Scheduled', className: 'text-right' },
                { key: 'present', title: 'Present', className: 'text-right' },
                { 
                  key: 'utilization', 
                  title: 'Utilization',
                  className: 'text-right',
                  render: (value) => (
                    <div className="flex items-center justify-end">
                      <Percent className="h-3 w-3 mr-1" />
                      <span>{value}</span>
                    </div>
                  )
                },
                { 
                  key: 'status', 
                  title: 'Status',
                  render: (value) => {
                    const color = value === 'Optimal' 
                      ? 'bg-green-100 text-green-700' 
                      : value === 'Adequate' 
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700';
                    
                    return (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                        {value}
                      </span>
                    );
                  }
                }
              ]}
              data={staffingData}
            />
          </div>
        </div>
      )
    },
    {
      id: 'incidents',
      label: 'Incidents',
      icon: <AlertTriangle className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Incidents MTD"
              value="28"
              change={-15.2}
              icon={<AlertTriangle className="h-5 w-5" />}
            />
            <StatCard
              title="Avg Resolution Time"
              value="42 min"
              change={-12.5}
              icon={<Clock className="h-5 w-5" />}
            />
            <StatCard
              title="Current Closures"
              value="1"
              change={0}
              changeLabel="same as yesterday"
              icon={<Activity className="h-5 w-5" />}
            />
          </div>
          
          <SmallDataTable
            title="Incident Log"
            columns={[
              { key: 'id', title: 'ID' },
              { key: 'ride', title: 'Attraction' },
              { key: 'type', title: 'Type' },
              { key: 'duration', title: 'Duration' },
              { 
                key: 'impact', 
                title: 'Impact',
                render: (value) => {
                  const color = value === 'High' 
                    ? 'bg-red-100 text-red-700' 
                    : value === 'Moderate' 
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700';
                  
                  return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                      {value}
                    </span>
                  );
                }
              },
              { key: 'date', title: 'Date' }
            ]}
            data={incidentData}
          />
          
          <BarChart
            title="Monthly Incidents by Category"
            data={[
              { month: 'Jan', technical: 8, weather: 4, maintenance: 6 },
              { month: 'Feb', technical: 6, weather: 3, maintenance: 5 },
              { month: 'Mar', technical: 10, weather: 2, maintenance: 4 },
              { month: 'Apr', technical: 7, weather: 5, maintenance: 3 },
              { month: 'May', technical: 5, weather: 8, maintenance: 4 },
              { month: 'Jun', technical: 4, weather: 10, maintenance: 3 },
            ]}
            dataKeys={[
              { key: 'technical', color: '#00B0DF' },
              { key: 'weather', color: '#33C0E5' },
              { key: 'maintenance', color: '#66D0EC' }
            ]}
            xAxisDataKey="month"
          />
        </div>
      )
    }
  ];
  
  return (
    <DashboardLayout>
      <PageHeader 
        title="Operations Management" 
        description="Real-time park operations monitoring and analytics"
      />
      
      <div className="space-y-8">
        <TabView tabs={operationsTabs} />
      </div>
    </DashboardLayout>
  );
};

export default Operations;
