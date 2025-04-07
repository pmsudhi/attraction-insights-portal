
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/dashboard/StatCard';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import SmallDataTable from '@/components/dashboard/SmallDataTable';
import { TabView, TabItem } from '@/components/ui/tab-view';
import { 
  DollarSign, 
  TrendingUp,
  ShoppingCart, 
  Coffee,
  CreditCard
} from 'lucide-react';

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 18500000, lastYear: 17200000 },
  { month: 'Feb', revenue: 17800000, lastYear: 16500000 },
  { month: 'Mar', revenue: 19500000, lastYear: 18000000 },
  { month: 'Apr', revenue: 22400000, lastYear: 20100000 },
  { month: 'May', revenue: 25800000, lastYear: 23500000 },
  { month: 'Jun', revenue: 32100000, lastYear: 28700000 },
];

const revenueByCategory = [
  { name: 'Ticket Sales', value: 65, color: '#00B0DF' },
  { name: 'Food & Beverage', value: 20, color: '#33C0E5' },
  { name: 'Merchandise', value: 10, color: '#66D0EC' },
  { name: 'Hotels', value: 5, color: '#99E0F2' }
];

const ticketRevenueData = [
  { day: 'Mon', standardTickets: 520000, premiumTickets: 180000, fastPass: 120000 },
  { day: 'Tue', standardTickets: 480000, premiumTickets: 150000, fastPass: 110000 },
  { day: 'Wed', standardTickets: 510000, premiumTickets: 165000, fastPass: 115000 },
  { day: 'Thu', standardTickets: 550000, premiumTickets: 190000, fastPass: 125000 },
  { day: 'Fri', standardTickets: 720000, premiumTickets: 250000, fastPass: 160000 },
  { day: 'Sat', standardTickets: 980000, premiumTickets: 380000, fastPass: 220000 },
  { day: 'Sun', standardTickets: 890000, premiumTickets: 340000, fastPass: 200000 },
];

const topRevenueItems = [
  { 
    item: 'Premier Park Hopper Pass', 
    category: 'Tickets', 
    unitsSold: '32,450', 
    revenue: '$3.24M',
    growth: '+8.2%' 
  },
  { 
    item: 'Magic World Resort Suite', 
    category: 'Hotels', 
    unitsSold: '5,280', 
    revenue: '$2.85M',
    growth: '+12.5%' 
  },
  { 
    item: 'Signature Restaurant Experience', 
    category: 'F&B', 
    unitsSold: '28,620', 
    revenue: '$1.72M',
    growth: '+5.8%' 
  },
  { 
    item: 'Character Plush Collection', 
    category: 'Merchandise', 
    unitsSold: '84,500', 
    revenue: '$1.68M',
    growth: '+2.3%' 
  },
  { 
    item: 'Fast Pass Premium', 
    category: 'Add-ons', 
    unitsSold: '42,300', 
    revenue: '$1.27M',
    growth: '+18.5%' 
  },
];

const Revenue = () => {
  const revenueTabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Revenue YTD"
              value="$245.8M"
              change={12.5}
              icon={<DollarSign className="h-5 w-5" />}
            />
            <StatCard
              title="Avg. Revenue Per Visit"
              value="$102.40"
              change={5.8}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <StatCard
              title="F&B Revenue"
              value="$49.2M"
              change={8.4}
              icon={<Coffee className="h-5 w-5" />}
            />
            <StatCard
              title="Merchandise Revenue"
              value="$24.6M"
              change={3.2}
              icon={<ShoppingCart className="h-5 w-5" />}
            />
          </div>
          
          <LineChart
            title="Monthly Revenue Comparison"
            data={revenueData}
            dataKeys={[
              { key: 'revenue', color: '#00B0DF' },
              { key: 'lastYear', color: '#99E0F2' }
            ]}
            xAxisDataKey="month"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PieChart
              title="Revenue by Category"
              data={revenueByCategory}
            />
            
            <SmallDataTable
              title="Top Revenue Generators"
              columns={[
                { key: 'item', title: 'Item' },
                { key: 'category', title: 'Category' },
                { 
                  key: 'revenue', 
                  title: 'Revenue',
                  className: 'text-right',
                  render: (value) => (
                    <div className="font-medium text-right">{value}</div>
                  )
                },
                { 
                  key: 'growth', 
                  title: 'Growth',
                  className: 'text-right',
                  render: (value) => {
                    const isPositive = value.startsWith('+');
                    return (
                      <div className={`font-medium text-right ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {value}
                      </div>
                    );
                  }
                }
              ]}
              data={topRevenueItems.slice(0, 4)}
            />
          </div>
        </div>
      )
    },
    {
      id: 'tickets',
      label: 'Ticket Sales',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Standard Tickets"
              value="$158.2M"
              change={7.2}
              icon={<CreditCard className="h-5 w-5" />}
            />
            <StatCard
              title="Premium Tickets"
              value="$52.4M"
              change={14.8}
              icon={<CreditCard className="h-5 w-5" />}
            />
            <StatCard
              title="Fast Pass Revenue"
              value="$32.8M"
              change={18.5}
              icon={<TrendingUp className="h-5 w-5" />}
            />
          </div>
          
          <BarChart
            title="Daily Ticket Revenue Breakdown"
            data={ticketRevenueData}
            dataKeys={[
              { key: 'standardTickets', color: '#00B0DF' },
              { key: 'premiumTickets', color: '#33C0E5' },
              { key: 'fastPass', color: '#66D0EC' }
            ]}
            xAxisDataKey="day"
          />
          
          <SmallDataTable
            title="Top Revenue Products"
            columns={[
              { key: 'item', title: 'Item' },
              { key: 'category', title: 'Category' },
              { key: 'unitsSold', title: 'Units Sold', className: 'text-right' },
              { 
                key: 'revenue', 
                title: 'Revenue',
                className: 'text-right',
                render: (value) => (
                  <div className="font-medium text-right">{value}</div>
                )
              },
              { 
                key: 'growth', 
                title: 'Growth',
                className: 'text-right',
                render: (value) => {
                  const isPositive = value.startsWith('+');
                  return (
                    <div className={`font-medium text-right ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {value}
                    </div>
                  );
                }
              }
            ]}
            data={topRevenueItems}
          />
        </div>
      )
    }
  ];
  
  return (
    <DashboardLayout>
      <PageHeader 
        title="Revenue Analytics" 
        description="Financial performance and revenue streams analysis"
      />
      
      <div className="space-y-8">
        <TabView tabs={revenueTabs} />
      </div>
    </DashboardLayout>
  );
};

export default Revenue;
